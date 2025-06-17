import { Expose, plainToInstance, Type } from 'class-transformer';
import { PaymentProviderEnum } from '../enums';
import { CryptoWallet } from '../../modules/database';
import { UserDto } from './user.dto';

export class CryptoWalletDto {
  @Expose()
  id: string;

  @Expose()
  userId: string;

  @Expose()
  walletAddress: string;

  @Expose()
  provider: PaymentProviderEnum;

  @Expose()
  verified: boolean;

  @Expose()
  @Type(() => UserDto)
  user?: UserDto;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;

  constructor(props: Partial<CryptoWallet>) {
    return plainToInstance(CryptoWalletDto, props, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
  }
}
