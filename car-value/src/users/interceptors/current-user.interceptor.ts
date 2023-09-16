import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { Observable } from 'rxjs';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    //

    const req = context.switchToHttp().getRequest();
    if (req.session) {
      const { userId } = req.session;
      if (userId) {
        const user = await this.usersService.findById(userId);
        req.session.currentUser = user;
      }
    }

    return next.handle();
  }
}
