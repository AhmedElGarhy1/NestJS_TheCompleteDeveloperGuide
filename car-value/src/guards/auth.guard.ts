import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthGaurd implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const { userId } = req.session;

    return userId;
  }
}
