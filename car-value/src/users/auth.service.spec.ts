import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { Test } from '@nestjs/testing';
import { User } from './user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];
    fakeUsersService = {
      findByEmail: (email: string) => {
        const filteredUser = users.find((u) => u.email === email);
        return Promise.resolve(filteredUser || null);
      },

      create: (email: string, password: string) => {
        const newUser = {
          id: Math.floor(Math.random() * 99999),
          email,
          password,
        } as User;
        users.push(newUser);
        return Promise.resolve(newUser);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('Should be defiend', async () => {
    expect(service).toBeDefined();
  });

  describe('create user with salted and hashed password', () => {
    it('valid user', async () => {
      const user = await service.signup('email@email.com', 'password');

      expect(user).toBeDefined();
      expect(user.password).toBeDefined();
      expect(user.password).not.toBe('password');
      const [salt, hash] = user.password.split('.');
      expect(salt).toBeDefined();
      expect(hash).toBeDefined();
    });

    it('invalid user', (done) => {
      service.signup('email@email.com', 'password').then(async () => {
        return service
          .signup('email@email.com', 'password')
          .catch(() => done());
      });
    });
  });

  describe('login user with salted and hashed password', () => {
    it('invalid email', (done) => {
      service.signin('email@email.com', 'password').catch(() => done());
    });

    it('invalid password', (done) => {
      service.signup('email@email.com', 'password').then(async () => {
        return service
          .signin('email@email.com', 'nopassword')
          .catch(() => done());
      });
    });

    it('valid password', async () => {
      service
        .signup('email@email.com', 'password')
        .then(async () => {
          return await service.signin('email@email.com', 'password');
        })
        .then((user) => {
          expect(user).toBeDefined();
        });
    });
  });
});
