import {
  Body,
  Controller,
<<<<<<< HEAD
  Get,
  Post,
  Delete,
  Patch,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/Serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post('signin')
  signin(@Body() userData: CreateUserDto) {
    return this.authService.signin(userData.email, userData.password);
  }

  @Post('signup')
  signup(@Body() userData: CreateUserDto) {
    return this.authService.signup(userData.email, userData.password);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    console.log(id);
    return this.userService.findById(id);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    const user = this.userService.deleteById(id);
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() userData: UpdateUserDto) {
    const user = this.userService.update(id, userData);
    return user;
=======
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('singup')
  createUser(@Body() userData: CreateUserDto) {
    this.userService.create(userData.email, userData.password);
    return userData;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Get(':id')
  findOneUser(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() userData: UpdateUserDto) {
    return this.userService.update(parseInt(id), userData);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
>>>>>>> 5accf3c4cdd00d9c3ab7f694f397a23d99a68f2f
  }
}
