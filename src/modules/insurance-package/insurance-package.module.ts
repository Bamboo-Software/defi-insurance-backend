import { Module } from '@nestjs/common';
import { InsurancePackageController } from './controllers/insurance-package.controller';
import { InsurancePackageService } from './services/insurance-package.service';

@Module({
  controllers: [InsurancePackageController],
  providers: [InsurancePackageService],
  exports: [InsurancePackageService],
})
export class InsurancePackageModule {}
