import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  InsurancePackageRepository,
  TransactionRepository,
} from '../../database';
import { IAvalanchePaymentReceivedEvent } from '../../smart-contract/interfaces/IAvalanchePayment';
import {
  PayoutStatusEnum,
  PurchaseStatusEnum,
  TransactionTypeEnum,
} from '../../../common';
import { avalancheConfig } from '../../../config';
import { IWeatherParams } from '../interfaces/IWeather';
import { WeatherDataRepository } from '../../database/repositories/weather-data.repository';
import { IProcessPayout } from '../interfaces/IProcessPayout';

const USDC_DECIMALS = 6;
const LOCATION_COORDINATE_SCALING_FACTOR = 1_000_000;

@Injectable()
export class HandleAvalancheContractService {
  private readonly logger = new Logger(HandleAvalancheContractService.name);

  constructor(
    private readonly transactionRepo: TransactionRepository,
    private readonly insurancePackageRepo: InsurancePackageRepository,
    private readonly weatherDataRepo: WeatherDataRepository,
  ) {}

  async handleBuyInsurance(
    payload: IAvalanchePaymentReceivedEvent,
  ): Promise<void> {
    this.logger.log(
      `Handling InsurancePurchased event: ${JSON.stringify(payload)}`,
    );

    const {
      packageId,
      from: walletAddress,
      lat,
      lon,
      txHash: purchaseTxHash,
      premiumAmount: rawPremiumAmount,
      tokenAddress,
      startDate: startTimestamp,
      timestamp,
    } = payload;

    const latitude = lat / LOCATION_COORDINATE_SCALING_FACTOR;
    const longitude = lon / LOCATION_COORDINATE_SCALING_FACTOR;
    const premiumAmount = rawPremiumAmount / 10 ** USDC_DECIMALS;
    const purchaseAt = new Date(timestamp * 1000);
    const insuredPeriodStart = new Date(startTimestamp * 1000);

    if (
      tokenAddress.toLowerCase() !==
      avalancheConfig.usdcContractAddress.toLowerCase()
    ) {
      this.logger.error(`Token ${tokenAddress} is not a supported currency.`);
      return;
    }

    const insurancePackage =
      await this.insurancePackageRepo.findById(packageId);
    if (!insurancePackage) {
      this.logger.error(`Insurance package with ID ${packageId} not found.`);
      return;
    }

    if (premiumAmount < insurancePackage.price) {
      const priceDiff = Math.abs(insurancePackage.price - premiumAmount);
      const priceTolerance = insurancePackage.price * 0.01; // 1% tolerance
      if (priceDiff > priceTolerance) {
        this.logger.error(
          `Premium amount mismatch for tx ${purchaseTxHash}. Expected ${insurancePackage.price}, but got ${premiumAmount}.`,
        );
        return;
      }
    }

    const insuredPeriodEnd = new Date(insuredPeriodStart);
    insuredPeriodEnd.setDate(
      insuredPeriodStart.getDate() + insurancePackage.durationDays,
    );

    await this.transactionRepo.findOneAndUpdate(
      { purchaseTxHash },
      {
        $set: {
          type: TransactionTypeEnum.INSURANCE_PURCHASE,
          purchaseStatus: PurchaseStatusEnum.PAID,
          payoutStatus: PayoutStatusEnum.PENDING,
          packageId: insurancePackage.id,
          walletAddress,
          tokenAmount: premiumAmount,
          paidAmount: premiumAmount,
          payoutAmount: insurancePackage.payoutAmount,
          cryptoCurrency: insurancePackage.cryptoCurrency,
          chain: insurancePackage.chain,
          triggerThreshold: insurancePackage.triggerThreshold,
          riskType: insurancePackage.riskType,
          insuredPeriod: {
            start: insuredPeriodStart,
            end: insuredPeriodEnd,
          },
          locationSnapshot: {
            province: insurancePackage.region.province,
            coordinates: {
              lat: latitude,
              lng: longitude,
            },
          },
          purchaseAt,
          expiresAt: insuredPeriodEnd,
          purchaseTxHash,
          metadata: {
            walletAddress,
            packageName: insurancePackage.name,
          },
        },
      },
      { upsert: true, new: true },
    );

    this.logger.log(
      `Successfully processed and saved transaction for hash ${purchaseTxHash}`,
    );
  }

  async fetchWeatherData(payload: IWeatherParams) {
    this.logger.log(
      `Handling FetchWeatherData event: ${payload}`,
    );
    if (!payload) return;
    if (typeof payload === 'string') {
      payload = JSON.parse(payload);
    }
    const weather = await this.weatherDataRepo.create({
      lat: payload.lat,
      lng: payload.lng,
      temperature: payload.temperature,
      rainIntensity: payload.rainIntensity,
      precipitationProbability: payload.precipitationProbability,
      humidity: payload.humidity,
      windSpeed: payload.windSpeed,
      timestamp: payload.timestamp,
    });
    this.logger.log('Weather data saved to DB', weather);
  }

  async processPayout(payload: IProcessPayout) {
    this.logger.log(`Handling processPayout event: ${JSON.stringify(payload)}`);
    // Update transaction theo claimId
    await this.transactionRepo.findByIdAndUpdate(payload.claimId, {
      payoutStatus: PayoutStatusEnum.PAID,
      payoutAt: new Date(),
      payoutTxHash: payload.txHash,
    });
    this.logger.log(`Transaction ${payload.claimId} updated as PAID`);
  }
}
