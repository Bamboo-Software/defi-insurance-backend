/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [CoreModule, NestScheduleModule.forRoot()],
  controllers: [],
  providers: [],
  exports: [],
})
export class ScheduleModule {}
