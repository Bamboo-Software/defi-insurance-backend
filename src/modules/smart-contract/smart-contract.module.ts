import { Module } from '@nestjs/common';
import { AvalancheContractService } from './services/avalanche-contract.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AvalancheContractService],
  exports: [AvalancheContractService],
})
export class SmartContractModule {}
