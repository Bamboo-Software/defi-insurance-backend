import { Expose, plainToInstance, Transform, Type } from 'class-transformer';
import {
  BlockchainNameEnum,
  CryptoCurrencyEnum,
  PaymentProviderEnum,
  PayoutStatusEnum,
  PurchaseStatusEnum,
  TransactionStatusEnum,
  TransactionTypeEnum,
} from '../enums';
import { Transaction } from '../../modules/database';
import { UserDto } from './user.dto';
import { InsurancePackageDto } from './insurance-package.dto';

export class TransactionDto {
  @Expose()
  id?: string;

  @Expose()
  @Type(() => String)
  _id?: string;

  @Expose()
  @Type(() => String)
  userId: string;

  @Expose()
  provider?: PaymentProviderEnum;

  @Expose()
  type: TransactionTypeEnum;

  @Expose()
  purchaseStatus: PurchaseStatusEnum;

  @Expose()
  payoutStatus?: PayoutStatusEnum;

  @Expose()
  walletAddress?: string;

  @Expose()
  tokenAmount?: number;

  @Expose()
  cryptoCurrency?: CryptoCurrencyEnum;

  @Expose()
  chain?: BlockchainNameEnum;

  @Expose()
  @Type(() => String)
  packageId?: string;

  @Expose()
  insuredPeriod?: {
    start: Date;
    end: Date;
  };

  @Expose()
  triggerThreshold?: number;

  @Expose()
  riskType?: string;

  @Expose()
  locationSnapshot?: {
    province: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };

  @Expose()
  paidAmount?: number;

  @Expose()
  payoutAmount?: number;

  @Expose()
  purchaseAt?: Date;

  @Expose()
  payoutAt?: Date;

  @Expose()
  purchaseTxHash?: string;

  @Expose()
  payoutTxHash?: string;

  @Expose()
  weatherDataSnapshot?: number;

  @Expose()
  chainlinkRequestId?: string;

  @Expose()
  expiresAt?: Date;

  @Expose()
  metadata?: Record<string, any>;

  @Expose()
  @Type(() => UserDto)
  user?: UserDto;

  @Expose()
  @Type(() => InsurancePackageDto)
  package?: InsurancePackageDto;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;

  constructor(props: Partial<Transaction>) {
    return plainToInstance(TransactionDto, props, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
  }
}
