import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { OTPActionTypeEnum, OTPSenderTypeEnum } from '../../../common';
import { randString } from '../../../utils';
import { User } from './user.schema';
import { Model } from './Model';

@Schema({
  collection: 'user_otps',
  versionKey: false,
  strict: false,
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
export class UserOtp extends Model {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: () => User.name,
    required: true,
    sparse: true,
    index: true,
  })
  userId: string;

  @Prop({
    type: String,
    enum: OTPSenderTypeEnum,
    default: OTPSenderTypeEnum.Email,
  })
  senderType: OTPSenderTypeEnum;

  @Prop({ type: String, enum: OTPActionTypeEnum, required: true })
  otpType: OTPActionTypeEnum;

  @Prop({ type: String, required: true })
  receiver: string; // email or phone

  @Prop({
    type: String,
    required: true,
    default: () => randString(32),
    sparse: true,
    index: true,
  })
  code: string;

  @Prop({ type: String, required: true })
  token: string;

  @Prop({ type: Date, required: true })
  expiredAt: Date;

  @Prop({ type: Boolean, default: false })
  isVerified: boolean;

  @Prop({ type: Number, default: 0 })
  failedVerifyAttempts: number;

  user?: User;

  isExpired(): boolean {
    return this.expiredAt.getTime() < Date.now();
  }
}

export const UserOtpSchema = SchemaFactory.createForClass(UserOtp);
UserOtpSchema.loadClass(UserOtp);

// Virtual fields for population
UserOtpSchema.virtual('user', {
  ref: User.name,
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

export type UserOtpDocument = UserOtp & Document;
