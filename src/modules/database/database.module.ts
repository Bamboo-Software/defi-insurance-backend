import { Global, Module } from '@nestjs/common';
import {
  CryptoWalletRepository,
  FileRepository,
  InsurancePackageRepository,
  LogRepository,
  TransactionRepository,
  UserOtpRepository,
  UserRepository,
  UserSocialRepository,
} from './repositories';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoConfig } from '@/config';
import {
  CryptoWallet,
  CryptoWalletSchema,
  FileSchema,
  Log,
  LogSchema,
  Transaction,
  TransactionSchema,
  User,
  UserOtp,
  UserOtpSchema,
  UserSchema,
  UserSocial,
  UserSocialSchema,
} from './schemas';
import {
  InsurancePackage,
  InsurancePackageSchema,
} from './schemas/insurance-packages.schema';

const repositories = [
  LogRepository,
  UserRepository,
  UserSocialRepository,
  UserOtpRepository,
  TransactionRepository,
  CryptoWalletRepository,
  FileRepository,
  InsurancePackageRepository,
];

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(mongoConfig.uri, mongoConfig.options),
    MongooseModule.forFeature([
      { name: Log.name, schema: LogSchema },
      { name: User.name, schema: UserSchema },
      { name: UserSocial.name, schema: UserSocialSchema },
      { name: UserOtp.name, schema: UserOtpSchema },
      { name: Transaction.name, schema: TransactionSchema },
      { name: CryptoWallet.name, schema: CryptoWalletSchema },
      { name: File.name, schema: FileSchema },
      { name: InsurancePackage.name, schema: InsurancePackageSchema },
    ]),
  ],
  controllers: [],
  providers: [...repositories],
  exports: [...repositories],
})
export class DatabaseModule {}
