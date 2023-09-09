import {
  Body,
  Controller,
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
  }
}
