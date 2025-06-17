import {
  applyDecorators,
  SetMetadata,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { AuthGuard } from '../guards/auth.guard';
import { AuthUserInterceptor } from '../interceptors/auth-user.interceptor';
import { RoleGuard } from '../guards/role.guard';
import { RoleTypeEnum } from '../common/enums';

export function UseGuardAuth(params?: {
  optional?: boolean;
  roles?: RoleTypeEnum[];
}) {
  return applyDecorators(
    SetMetadata('optional', params?.optional),
    SetMetadata('roles', params?.roles),
    UseGuards(AuthGuard, RoleGuard),
    ApiBearerAuth(),
    UseInterceptors(AuthUserInterceptor),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
