import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Repository } from './Repository';
import { File } from '../schemas';

@Injectable()
export class FileRepository extends Repository<File> {
  constructor(@InjectModel(File.name) private readonly model: Model<File>) {
    super(model);
  }
}
