import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Model } from './Model';
import {
  BlockchainNameEnum,
  CryptoCurrencyEnum,
  PaymentProviderEnum,
  PayoutStatusEnum,
  PurchaseStatusEnum,
  TransactionStatusEnum,
  TransactionTypeEnum,
} from '../../../common/enums';
import { User } from './user.schema';
import { InsurancePackage } from './insurance-packages.schema';

@Schema({
  collection: 'transactions',
  versionKey: false,
  strict: false,
  timestamps: true,
  toObject: { virtuals: true, getters: true },
  toJSON: { virtuals: true, getters: true },
})
export class Transaction extends Model {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    index: true,
    sparse: true,
    ref: () => User.name,
  })
  userId?: string;

  @Prop({
    type: String,
    enum: PaymentProviderEnum,
    index: true,
    sparse: true,
    required: false,
  })
  provider?: PaymentProviderEnum;

  @Prop({
    type: String,
    enum: TransactionTypeEnum,
    required: true,
    index: true,
    sparse: true,
  })
  type: TransactionTypeEnum;

  @Prop({
    type: String,
    enum: PurchaseStatusEnum,
    default: PurchaseStatusEnum.AWAITING_PAYMENT,
    required: false,
    index: true,
    sparse: true,
  })
  purchaseStatus: PurchaseStatusEnum;

  @Prop({
    type: String,
    enum: PayoutStatusEnum,
    default: PayoutStatusEnum.PENDING,
    required: false,
    index: true,
    sparse: true,
  })
  payoutStatus?: PayoutStatusEnum;

  @Prop({ type: String })
  walletAddress?: string;

  @Prop({ type: Number })
  tokenAmount?: number;

  @Prop({ type: String, enum: CryptoCurrencyEnum, required: false })
  cryptoCurrency?: CryptoCurrencyEnum;

  @Prop({ type: String, enum: BlockchainNameEnum, required: false })
  chain?: BlockchainNameEnum;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: () => InsurancePackage.name,
    required: false,
  })
  packageId?: string;

  @Prop({
    type: Object,
    required: false,
  })
  insuredPeriod?: {
    start: Date;
    end: Date;
  };

  @Prop({ type: Number, required: false })
  triggerThreshold?: number;

  @Prop({ type: String, required: false })
  riskType?: string;

  @Prop({
    type: Object,
    required: false,
  })
  locationSnapshot?: {
    province: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };

  @Prop({ type: Number, required: false })
  paidAmount?: number;

  @Prop({ type: Number, required: false })
  payoutAmount?: number;

  @Prop({ type: Date, required: false })
  purchaseAt?: Date;

  @Prop({ type: Date, required: false })
  payoutAt?: Date;

  @Prop({ type: String, required: false })
  purchaseTxHash?: string;

  @Prop({ type: String, required: false })
  payoutTxHash?: string;

  @Prop({ type: Date, required: false })
  expiresAt?: Date;

  @Prop({ type: Number, required: false })
  weatherDataSnapshot?: number;

  @Prop({ type: String, required: false })
  chainlinkRequestId?: string;

  @Prop({ type: Object })
  metadata?: Record<string, any>;

  user: User;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
TransactionSchema.loadClass(Transaction);

TransactionSchema.virtual('user', {
  ref: () => User.name,
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

TransactionSchema.virtual('package', {
  ref: () => InsurancePackage.name,
  localField: 'packageId',
  foreignField: '_id',
  justOne: true,
});

export type TransactionDocument = Transaction & Document;
