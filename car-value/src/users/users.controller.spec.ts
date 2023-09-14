import { UsersController } from './users.controller';
import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let authService: AuthService;
  let fakeUsersServiec: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    // create the fake services
    // mock implementation
    let users: User[] = [];
    fakeUsersServiec = {
      findAll: () => Promise.resolve(users),
      findById: (id: number) =>
        Promise.resolve(users.find((u) => u.id === id) as User),
      deleteById: (id: number) => {
        let deletedUser: User;
        users = users.filter((u) => {
          if (u.id === id) {
            deletedUser = u;
            return false;
          }
          return true;
        });
        // @ts-ignore
        return Promise.resolve(deletedUser as any);
      },
      update: (id: number, userData: Partial<User>) =>
        Promise.resolve({} as any),
    };
    fakeAuthService = {
      signup: (email: string, password: string) => {
        const user = { id: Math.random() * 999, email, password } as User;
        users.push(user);
        return Promise.resolve(user);
      },
      signin: (email: string, password: string) => {
        const user = users.find(
          (ele) => ele.email === email && ele.password === password,
        ) as User;
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersServiec,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    usersController = await module.get(UsersController);
    usersService = await module.get(UsersService);
    authService = await module.get(AuthService);
  });

  describe('Should be defined', () => {
    it('usersService', () => {
      expect(usersService).toBeDefined();
    });
    it('usersController', () => {
      expect(usersController).toBeDefined();
    });
  });

  it('findAllUsers return all users', async () => {
    const users1 = await usersController.findAll();
    expect(users1).toBeDefined();
    expect(users1).toHaveLength(0);

    await authService.signup('email@email.com', 'password');
    const users2 = await usersController.findAll();
    expect(users2).toBeDefined();
    expect(users2).toHaveLength(1);
    expect(users2[0]).toMatchObject({
      email: 'email@email.com',
      password: 'password',
    });
  });

  describe('findById return single user', () => {
    it('valid userId', async () => {
      const user = await authService.signup('email@email.com', 'password');
      const user1 = await usersController.findById(user.id);
      expect(user1).toBeDefined();
      expect(user1).toMatchObject({
        email: 'email@email.com',
        password: 'password',
      });
    });
    it('invalid id throws an error', (done) => {
      usersController.findById(1).catch(() => done());
    });
  });

  describe('signin return signedin user', () => {
    it('valid user', async () => {
      // setup
      const userSetup = await authService.signup('email@email.com', 'password');
      const session: { userId: string } = { userId: '' };

      const user1 = await usersController.signin(
        { email: 'email@email.com', password: 'password' },
        session,
      );
      expect(user1).toBeDefined();
      expect(user1).toMatchObject({
        email: 'email@email.com',
        password: 'password',
      });
      expect(user1.id).toBe(userSetup.id);
      expect(session.userId).toBe(userSetup.id);
    });
    it('invalid user throws an error', (done) => {
      usersController
        .signin({ email: '', password: '' }, {})
        .catch(() => done());
    });
  });
});
