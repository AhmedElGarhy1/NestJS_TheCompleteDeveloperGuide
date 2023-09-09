import { UsersService } from './users.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { promisify } from 'util';
import { scrypt as _scrypt, randomBytes } from 'crypto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // check if email is already exist
    const isExists = await this.usersService.findByEmail(email);
    if (isExists) throw new BadRequestException('Email in use');

    // hash password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = hash.toString('hex') + '.' + salt;

    // return user
    const user = this.usersService.create(email, result);
    return user;
  }
  async signin(email: string, password: string) {
    // check if it user exists
    const existingUser = await this.usersService.findByEmail(email);
    if (!existingUser) {
      throw new NotFoundException('this email dosnt exist');
    }

    // compare password with hash
    const [hash, salt] = existingUser.password.split('.');
    const newHash = (await scrypt(password, salt, 32)) as Buffer;

    if (hash !== newHash.toString('hex')) {
      throw new BadRequestException('password is wrong');
    }

    // return user
    return existingUser;
  }
}
