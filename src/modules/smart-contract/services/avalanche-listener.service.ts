import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { AvalancheProviderService } from './avalanche-provider.service';
import { IAvalanchePaymentReceivedEvent } from '../interfaces/IAvalanchePayment';
import { Contract } from 'ethers';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AvalancheEventEnum } from '../../../common';

@Injectable()
export class AvalancheListenerService implements OnModuleInit {
  private readonly logger = new Logger(AvalancheListenerService.name);
  private readonly contract: Contract;

  constructor(
    private readonly providerService: AvalancheProviderService,
    private eventEmitter: EventEmitter2,
  ) {
    this.logger.log('Initializing AvalancheListenerService...');
    this.contract = this.providerService.readOnlyContract;
  }

  onModuleInit() {
    this.logger.log(
      'AvalancheListenerService initialized, starting event listeners.',
    );
    this.listenToEvents();
  }

  private listenToEvents() {
    this.contract.on(
      'InsurancePurchased',
      (
        from: string,
        packageId: string,
        tokenAddress: string,
        premiumAmount: bigint,
        lat: bigint,
        lon: bigint,
        startDate: bigint,
        tokenType: string,
        timestamp: bigint,
        event: any,
      ) => {
        const params: IAvalanchePaymentReceivedEvent = {
          from,
          packageId,
          tokenAddress,
          premiumAmount: Number(premiumAmount),
          lat: Number(lat),
          lon: Number(lon),
          startDate: Number(startDate),
          tokenType,
          timestamp: Number(timestamp),
          txHash: event.log.transactionHash,
        };
        this.logger.log('InsurancePurchased Event:', JSON.stringify(params));
        this.eventEmitter.emit(AvalancheEventEnum.BuyInsurance, params);
      },
    );

    this.contract.on('Log', (logType: any, message: string, event: any) => {
      const logTypeStr = logType === 0n ? 'INFO' : 'ERROR';
      this.logger.log(
        `[${logTypeStr}] Smart Contract Log: ${message} (Tx: ${event.transactionHash})`,
      );
    });

    this.contract.on(
      'WeatherResponse',
      (
        requestId: string,
        weatherData: string,
        response: any,
        error: any,
        event: any,
      ) => {
        this.logger.log(
          `Weather Response for requestId=${requestId}, Tx: ${event.log.transactionHash}`,
        );
        this.logger.log(`  Weather Data: ${weatherData}`);
        if (response) this.logger.log(`  Response: ${response}`);
        if (error) this.logger.error(`  Error: ${error}`);
      },
    );

    this.contract.on(
      'WeatherDataRequested',
      (requestId: string, lat: bigint, lon: bigint, event: any) => {
        console.log(event);
        console.log(requestId, lat, lon);
      },
    );

    this.logger.log('Successfully set up all event listeners.');
  }
}
