import { Expose, Type, plainToInstance } from 'class-transformer';
import { InsurancePackage } from '../../modules/database';

export class InsurancePackageDto {
  @Expose()
  id?: string;

  @Expose()
  @Type(() => String)
  _id?: string;

  @Expose()
  name: string;

  @Expose()
  description?: string;

  @Expose()
  riskType: string;

  @Expose()
  region: {
    province: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };

  @Expose()
  durationDays: number;

  @Expose()
  cryptoCurrency?: string;

  @Expose()
  chain?: string;

  @Expose()
  price: number;

  @Expose()
  payoutAmount: number;

  @Expose()
  unit?: string;

  @Expose()
  triggerThreshold?: number;

  @Expose()
  triggerCondition?: string;

  @Expose()
  triggerMetric?: string;

  @Expose()
  triggerUnit?: string;

  @Expose()
  triggerWindowDays?: number;

  @Expose()
  active: boolean;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;

  constructor(props: Partial<InsurancePackage>) {
    return plainToInstance(InsurancePackageDto, props, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
  }
}
