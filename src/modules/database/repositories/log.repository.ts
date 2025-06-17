import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Repository } from './Repository';
import { Log } from '../schemas';

@Injectable()
export class LogRepository extends Repository<Log> {
  constructor(@InjectModel(Log.name) private readonly model: Model<Log>) {
    super(model);
  }
}
