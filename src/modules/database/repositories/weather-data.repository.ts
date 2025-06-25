import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Repository } from './Repository';
import { WeatherData } from '../schemas';

@Injectable()
export class WeatherDataRepository extends Repository<WeatherData> {
  constructor(
    @InjectModel(WeatherData.name)
    private readonly model: Model<WeatherData>,
  ) {
    super(model);
  }
}
