import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PayloadAuth } from '../models/token.model';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as PayloadAuth;
  },
);
