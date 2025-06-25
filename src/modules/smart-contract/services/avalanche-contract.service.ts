import { Injectable, Logger } from '@nestjs/common';
import { Contract, InterfaceAbi, WebSocketProvider } from 'ethers';
import { avalancheConfig } from '../../../config';
import { AVALANCHE_DEFI_INSURANCE_CONTRACT_ABI_DATA } from '../../../common';
import { IAvalanchePaymentReceivedEvent } from '../interfaces/IAvalanchePayment';

@Injectable()
export class AvalancheContractService {
  private readonly logger = new Logger(AvalancheContractService.name);

  private provider: WebSocketProvider;
  private contract: Contract;
  private insuranceContractAddress: string;
  private insuranceContractAbi: InterfaceAbi;

  constructor() {
    this.logger.log('AvalancheContractService initialized');
    this.provider = new WebSocketProvider(avalancheConfig.getWssEndpoint());
    this.insuranceContractAbi = AVALANCHE_DEFI_INSURANCE_CONTRACT_ABI_DATA;
    this.insuranceContractAddress =
      avalancheConfig.defiInsuranceSmartContractAddress;
    this.contract = new Contract(
      this.insuranceContractAddress,
      this.insuranceContractAbi,
      this.provider,
    );
  }

  async onModuleInit() {
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
        // console.log('InsurancePurchased:', event);
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
        console.log('InsurancePurchased:', params);
        this.logger.log('InsurancePurchased:', JSON.stringify(params));
      },
    );

    this.contract.on('Log', (logType: any, message: string, event: any) => {
      console.log('Log Event:', logType, message, event);
      const logTypeStr = logType === 0n ? 'INFO' : 'ERROR';
      console.log(`[${logTypeStr}] Log Event: ${message}`);
      console.log('Transaction Hash:', event.transactionHash);
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
        console.log(`Weather Response: requestId=${requestId}`);
        console.log('Weather Data:', weatherData);
        console.log('Response:', response);
        console.log('Error:', error);
        console.log('Transaction Hash:', event.log.transactionHash);
      },
    );

    this.provider.on('error', (error) => {
      this.logger.error('Lỗi WebSocketProvider:', error);
      this.reconnectWebSocket();
    });
  }

  private async reconnectWebSocket() {
    this.logger.warn('Reconnecting WebSocketProvider...');
    this.provider = new WebSocketProvider(avalancheConfig.getWssEndpoint());
    this.contract = new Contract(
      this.insuranceContractAddress,
      this.insuranceContractAbi,
      this.provider,
    );
    this.listenToEvents();
  }
}
