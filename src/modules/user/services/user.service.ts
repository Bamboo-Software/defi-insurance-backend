/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../../database';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  
  constructor(private readonly userRepo: UserRepository) {}
}
