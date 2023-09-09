import {
  Body,
  Controller,
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
  }
}
