import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from './Model';

@Schema({
  collection: 'weather_data',
  versionKey: false,
  strict: false,
  timestamps: true,
  toObject: { virtuals: true, getters: true },
  toJSON: { virtuals: true, getters: true },
})
export class WeatherData extends Model {
  @Prop({ required: true })
  lat: number;

  @Prop({ required: true })
  lng: number;

  @Prop({ required: false })
  temperature: number;

  @Prop({ required: false })
  rainIntensity: number;

  @Prop({ required: false })
  precipitationProbability: number;

  @Prop({ required: false })
  humidity: number;

  @Prop({ required: false })
  windSpeed: number;

  @Prop({ required: false })
  timestamp: Date;
}

export const WeatherDataSchema = SchemaFactory.createForClass(WeatherData);
WeatherDataSchema.loadClass(WeatherData);
export type WeatherDataDocument = WeatherData & Document;
