import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
<<<<<<< HEAD
import { AuthService } from './auth.service';
=======
>>>>>>> 5accf3c4cdd00d9c3ab7f694f397a23d99a68f2f

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
<<<<<<< HEAD
  providers: [UsersService, AuthService],
=======
  providers: [UsersService],
>>>>>>> 5accf3c4cdd00d9c3ab7f694f397a23d99a68f2f
})
export class UsersModule {}
