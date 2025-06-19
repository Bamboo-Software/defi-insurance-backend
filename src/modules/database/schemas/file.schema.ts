import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Model } from './Model';
import { StorageTypeEnum } from '@/common/enums';

@Schema({
  collection: 'files',
  versionKey: false,
  strict: false,
})
export class File extends Model {
  @Prop({
    type: String,
    enum: Object.values(StorageTypeEnum),
    default: StorageTypeEnum.S3,
  })
  storageType: StorageTypeEnum;

  @Prop({ type: String })
  userId?: string;

  @Prop({ type: String })
  originalname: string;

  @Prop({ type: String })
  mimetype?: string;

  @Prop({ type: Number })
  size?: number;

  @Prop({ type: String })
  bucket?: string;

  @Prop({ type: String })
  key: string;

  @Prop({ type: String })
  acl?: string;

  @Prop({ type: String })
  url: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
FileSchema.loadClass(File);

export type FileDocument = File & Document;
