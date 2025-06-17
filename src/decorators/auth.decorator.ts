import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "@/modules/database";
import { Request } from 'express';

export const AuthUser = createParamDecorator((key: keyof User, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  const user = request['user'] as User;
  return key ? user?.[key] : user;
});