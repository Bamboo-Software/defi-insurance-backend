import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Model } from './Model';
import {
  BlockchainNameEnum,
  CryptoCurrencyEnum,
  InsuredRiskTypeEnum,
} from '../../../common';
import {
  TriggerConditionEnum,
  TriggerMetricEnum,
} from '../../../common/enums/insurance.enum';

@Schema({
  collection: 'insurance-packages',
  versionKey: false,
  strict: false,
  timestamps: true,
  toObject: { virtuals: true, getters: true },
  toJSON: { virtuals: true, getters: true },
})
export class InsurancePackage extends Model {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
  description?: string;

  @Prop({
    type: String,
    enum: InsuredRiskTypeEnum,
    required: true,
    index: true,
    sparse: true,
  })
  riskType: InsuredRiskTypeEnum;

  @Prop({
    type: Object,
    required: true,
  })
  region: {
    province: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };

  @Prop({ type: Number, required: true })
  durationDays: number;

  @Prop({ type: String, enum: CryptoCurrencyEnum, required: false })
  cryptoCurrency?: CryptoCurrencyEnum;

  @Prop({ type: String, enum: BlockchainNameEnum, required: false })
  chain?: BlockchainNameEnum;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  payoutAmount: number;

  @Prop({ type: String, required: false })
  unit: string;

  @Prop({ type: Number, required: false })
  triggerThreshold: number;

  @Prop({ type: String, enum: TriggerConditionEnum, required: false })
  triggerCondition: TriggerConditionEnum;

  @Prop({ type: String, enum: TriggerMetricEnum, required: false })
  triggerMetric: TriggerMetricEnum;

  @Prop({ type: String, required: false })
  triggerUnit: string;

  @Prop({ type: Number, required: false })
  triggerWindowDays: number;

  @Prop({ type: Boolean, default: true })
  active: boolean;
}

export const InsurancePackageSchema =
  SchemaFactory.createForClass(InsurancePackage);
InsurancePackageSchema.loadClass(InsurancePackage);
export type InsurancePackageDocument = InsurancePackage & Document;
