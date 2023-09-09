import { UsersService } from './users.service';

export class AuthService {
  constructor(private usersService: UsersService) {}

  signup(email: string, password: string) {}

  signin(email: string, password: string) {}
}
