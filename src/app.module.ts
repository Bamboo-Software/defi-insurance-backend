import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './modules/core/core.module';
import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';;
import { ScheduleModule } from './modules/schedules/schedule.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { UploadModule } from './modules/upload/upload.module';
import { RealtimeModule } from './modules/realtime/realtime.module';
import { InsurancePackageModule } from './modules/insurance-package/insurance-package.module';
import { SmartContractModule } from './modules/smart-contract/smart-contract.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CoreModule,
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
    ScheduleModule,
    TransactionModule,
    UploadModule,
    RealtimeModule,
    InsurancePackageModule,
    SmartContractModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
