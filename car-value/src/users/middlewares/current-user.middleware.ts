import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { UsersService } from './../users.service';
import { User } from '../user.entity';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.session) {
      const { userId } = req.session;
      if (userId) {
        const user = await this.usersService.findById(userId);
        req.currentUser = user;
      }
    }
    next();
  }
}
