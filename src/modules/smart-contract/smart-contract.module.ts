import { Module } from '@nestjs/common';
import { AvalancheInteractionService } from './services/avalanche-interaction.service';
import { AvalancheProviderService } from './services/avalanche-provider.service';
import { AvalancheListenerService } from './services/avalanche-listener.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    AvalancheProviderService,
    AvalancheListenerService,
    AvalancheInteractionService,
  ],
  exports: [AvalancheInteractionService],
})
export class SmartContractModule {}
