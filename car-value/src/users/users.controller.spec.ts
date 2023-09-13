import { UsersController } from './users.controller';
import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let usersController: UsersController;
  let fakeUsersServiec: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    // create the fake services
    fakeAuthService = {
      signin: (email: string, password: string) => Promise.resolve({} as any),
      signup: (email: string, password: string) => Promise.resolve({} as any),
    };
    fakeUsersServiec = {
      findAll: () => Promise.resolve([]),
      findById: (id: number) => Promise.resolve({} as any),
      deleteById: (id: number) => Promise.resolve({} as any),
      update: (id: number, userData: Partial<User>) =>
        Promise.resolve({} as any),
    };

    const module = await Test.createTestingModule({
      providers: [
        UsersController,
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
  });

  it('create instace of controller', () => {
    expect(usersController).toBeDefined();
  });
});
