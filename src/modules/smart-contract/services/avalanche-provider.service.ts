import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Contract, InterfaceAbi, Wallet, WebSocketProvider } from 'ethers';
import { avalancheConfig } from '../../../config';
import { AVALANCHE_DEFI_INSURANCE_CONTRACT_ABI_DATA } from '../../../common';

@Injectable()
export class AvalancheProviderService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(AvalancheProviderService.name);

  private provider: WebSocketProvider;
  private signer: Wallet;
  private readonly insuranceContractAddress: string;
  private readonly insuranceContractAbi: InterfaceAbi;

  public readOnlyContract: Contract;
  public writableContract: Contract;

  constructor() {
    this.logger.log('Initializing AvalancheProviderService...');
    this.insuranceContractAbi = AVALANCHE_DEFI_INSURANCE_CONTRACT_ABI_DATA;
    this.insuranceContractAddress =
      avalancheConfig.defiInsuranceSmartContractAddress;
    this.initializeProvider();
  }

  async onModuleInit() {
    this.logger.log('AvalancheProviderService initialized.');
  }

  async onModuleDestroy() {
    this.logger.log('Destroying WebSocketProvider connection.');
    if (this.provider) {
      this.provider.removeAllListeners();
      await this.provider.destroy();
    }
  }

  private initializeProvider() {
    this.disconnectProvider();
    this.provider = new WebSocketProvider(avalancheConfig.getWssEndpoint());

    this.readOnlyContract = new Contract(
      this.insuranceContractAddress,
      this.insuranceContractAbi,
      this.provider,
    );

    if (avalancheConfig.masterWalletPrivateKey) {
      this.signer = new Wallet(
        avalancheConfig.masterWalletPrivateKey,
        this.provider,
      );
      this.writableContract = new Contract(
        this.insuranceContractAddress,
        this.insuranceContractAbi,
        this.signer,
      );
      this.logger.log(
        `Initialized signer with address: ${this.signer.address}`,
      );
    }

    this.provider.on('error', (error) => {
      this.logger.error('WebSocketProvider Error:', error);
      this.logger.warn('Reconnecting...');
      this.initializeProvider();
    });
  }

  private disconnectProvider() {
    if (this.provider) {
      this.provider.removeAllListeners();
      this.provider.destroy();
    }
  }

  public getProvider(): WebSocketProvider {
    return this.provider;
  }
}
