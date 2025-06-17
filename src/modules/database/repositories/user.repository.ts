import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Repository } from './Repository';
import { User } from '../schemas';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(@InjectModel(User.name) private readonly model: Model<User>) {
    super(model);
  }
}
