/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule';
import { CoreModule } from '../core/core.module';
import { InsuranceSchedule } from './schedules/insurance.schedule';
import { SmartContractModule } from '../smart-contract/smart-contract.module';

const services = [];

@Module({
  imports: [NestScheduleModule.forRoot(), CoreModule, SmartContractModule],
  controllers: [],
  providers: [InsuranceSchedule, ...services],
  exports: [],
})
export class ScheduleModule {}
