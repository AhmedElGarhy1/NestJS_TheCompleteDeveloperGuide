import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Session,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/Serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('whoami')
  whoami(@CurrentUser() user) {
    return user;
  }

  @Post('signout')
  async signout(@Session() session: any) {
    session.userId = null;
  }

  @Post('signin')
  async signin(@Body() userData: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(
      userData.email,
      userData.password,
    );
    session.userId = user.id;
    return user;
  }

  @Post('signup')
  async signup(@Body() userData: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(
      userData.email,
      userData.password,
    );
    session.userId = user.id;
    return user;
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    const user = await this.usersService.findById(id);
    if (!user) throw new NotFoundException("Coulden't Find this User");
    return user;
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    const user = this.usersService.deleteById(id);
    if (!user) throw new NotFoundException("Coulden't Find this User");
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() userData: UpdateUserDto) {
    const user = this.usersService.update(id, userData);
    return user;
  }
}
