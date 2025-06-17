/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { UseGuardAuth } from '../../../decorators';

@Controller('user')
@ApiTags('user')
@UseGuardAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}
}
