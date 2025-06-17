import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Repository } from './Repository';
import { UserOtp } from '../schemas';

@Injectable()
export class UserOtpRepository extends Repository<UserOtp> {
  constructor(
    @InjectModel(UserOtp.name) private readonly model: Model<UserOtp>,
  ) {
    super(model);
  }
}
