import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Model } from './Model';

@Schema({
  collection: 'logs',
  versionKey: false,
  strict: false,
})
export class Log extends Model {
  @Prop({ type: String, sparse: true, index: true })
  type: string;

  @Prop({ type: String })
  action?: string;

  @Prop({ type: SchemaTypes.Mixed })
  metadata?: Record<string, any>;

  @Prop({ type: SchemaTypes.Mixed })
  data?: Record<string, any>;
}

export const LogSchema = SchemaFactory.createForClass(Log);
LogSchema.loadClass(Log);

export type LogDocument = Log & Document;
