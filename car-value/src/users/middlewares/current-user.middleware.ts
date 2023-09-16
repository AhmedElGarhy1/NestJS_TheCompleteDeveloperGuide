import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { UsersService } from './../users.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.session) {
      const { userId } = req.session;
      if (userId) {
        const user = await this.usersService.findById(userId);
        console.log(user);
        // @ts-ignore
        req.session.currentUser = user;
      }
      console.log(userId);
    }
    next();
  }
}
