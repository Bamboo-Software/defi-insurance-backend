import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Repository } from './Repository';
import { UserSocial } from '../schemas';

@Injectable()
export class UserSocialRepository extends Repository<UserSocial> {
  constructor(
    @InjectModel(UserSocial.name) private readonly model: Model<UserSocial>,
  ) {
    super(model);
  }
}
