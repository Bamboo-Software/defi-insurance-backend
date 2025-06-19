import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Model } from './Model';
import { SocialTypeEnum } from '../../../common';
import { User } from './user.schema';

@Schema({
  collection: 'user_socials',
  versionKey: false,
  strict: false,
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
export class UserSocial extends Model {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: () => User.name,
    required: true,
    sparse: true,
    index: true,
  })
  userId: string;

  @Prop({ type: String, enum: Object.values(SocialTypeEnum), required: true })
  socialType: SocialTypeEnum;

  @Prop({ type: String, required: true, sparse: true, index: true })
  socialId: string;

  @Prop({ type: String, required: false })
  accessToken: string;

  @Prop({ type: String, required: false })
  refreshToken?: string;

  @Prop({ type: Date })
  accessTokenExpiredAt?: Date;

  @Prop({ type: Date })
  refreshTokenExpiredAt?: Date;

  user?: User;
}

export const UserSocialSchema = SchemaFactory.createForClass(UserSocial);
UserSocialSchema.loadClass(UserSocial);
UserSocialSchema.index({ socialType: 1, socialId: 1 }, { unique: true });

// Virtual fields for population
UserSocialSchema.virtual('user', {
  ref: User.name,
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

export type UserSocialDocument = UserSocial & Document;
