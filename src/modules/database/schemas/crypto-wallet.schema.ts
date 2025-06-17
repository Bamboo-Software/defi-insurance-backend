import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Model } from './Model';
import { PaymentProviderEnum } from '../../../common/enums';
import { User } from './user.schema';

@Schema({
  collection: 'crypto_wallets',
  versionKey: false,
  strict: false,
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
export class CryptoWallet extends Model {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: () => User.name,
  })
  userId: string;

  @Prop({ type: String, required: true })
  walletAddress: string;

  @Prop({ type: String, enum: PaymentProviderEnum, required: true })
  provider: PaymentProviderEnum;

  @Prop({ type: Boolean, default: false })
  verified: boolean;

  @Prop({ type: Object })
  metadata?: Record<string, any>;

  @Prop({ type: String })
  tag?: string;

  normalizedWalletAddress: string;
}

export const CryptoWalletSchema = SchemaFactory.createForClass(CryptoWallet);
CryptoWalletSchema.loadClass(CryptoWallet);

CryptoWalletSchema.virtual('normalizedWalletAddress').get(function () {
  return this.walletAddress.toLowerCase();
});

CryptoWalletSchema.virtual('user', {
  ref: User.name,
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

export type CryptoWalletDocument = CryptoWallet & Document;
