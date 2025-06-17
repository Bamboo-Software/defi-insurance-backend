/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { RealtimeController } from './controllers/realtime.controller';

@Module({
  imports: [],
  controllers: [RealtimeController],
  providers: [],
})
export class RealtimeModule {}
