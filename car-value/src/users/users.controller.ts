import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Session,
<<<<<<< HEAD
=======
  UseGuards,
>>>>>>> 9a19908e27d436e674e5e863a6ed7348d8d5347c
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/Serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGaurd } from 'src/guards/auth.guard';

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

<<<<<<< HEAD
  @Post('signout')
  async signout(@Session() session: any) {
    session.userId = null;
    return 'signed out';
=======
  @UseGuards(AuthGaurd)
  @Get('whoami')
  whoami(@CurrentUser() user) {
    return user;
  }

  @Post('signout')
  async signout(@Session() session: any) {
    session.userId = null;
>>>>>>> 9a19908e27d436e674e5e863a6ed7348d8d5347c
  }

  @Post('signin')
  async signin(@Body() userData: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(
      userData.email,
      userData.password,
    );
<<<<<<< HEAD
=======

>>>>>>> 9a19908e27d436e674e5e863a6ed7348d8d5347c
    session.userId = user.id;
    return user;
  }

  @Post('signup')
  async signup(@Body() userData: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(
      userData.email,
      userData.password,
    );
<<<<<<< HEAD
=======

>>>>>>> 9a19908e27d436e674e5e863a6ed7348d8d5347c
    session.userId = user.id;
    return user;
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
