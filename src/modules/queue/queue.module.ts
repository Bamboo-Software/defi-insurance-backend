/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { HandleAvalancheContractService } from './services/avalanche-contract.service';
import { AvalancheContractController } from './controllers/ethereum-contract.controller';

const services = [HandleAvalancheContractService];

@Module({
  imports: [CoreModule],
  controllers: [AvalancheContractController],
  providers: [...services],
})
export class QueueModule {}
