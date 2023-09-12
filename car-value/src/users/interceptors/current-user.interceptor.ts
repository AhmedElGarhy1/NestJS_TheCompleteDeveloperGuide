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
  constructor(private usersSerice: UsersService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    //

    const req = context.switchToHttp().getRequest();
    const { userId } = req.session;
    if (userId) {
      const user = await this.usersSerice.findById(userId);
      req.currentUser = user;
    }

    return next.handle();
  }
}
