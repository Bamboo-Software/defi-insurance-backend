import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TransactionRepository } from '../../database/repositories/transaction.repository';
import { InsurancePackageRepository } from '../../database/repositories/insurance-package.repository';
import { WeatherDataRepository } from '../../database/repositories/weather-data.repository';
import {
  PayoutStatusEnum,
  PurchaseStatusEnum,
  TransactionTypeEnum,
} from '../../../common/enums';
import { TriggerConditionEnum } from '../../../common/enums/insurance.enum';
import { AvalancheInteractionService } from '../../smart-contract/services/avalanche-interaction.service';
import { avalancheConfig } from '../../../config';

@Injectable()
export class InsuranceSchedule {
  private readonly logger = new Logger(InsuranceSchedule.name);

  constructor(
    private readonly transactionRepo: TransactionRepository,
    private readonly insurancePackageRepo: InsurancePackageRepository,
    private readonly weatherDataRepo: WeatherDataRepository,
    private readonly avalancheInteractionService: AvalancheInteractionService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handlePayoutCheck() {
    this.logger.log(`Payout check started at: ${new Date().toLocaleString()}`);

    // 1. Lấy các transaction cần kiểm tra payout
    const transactions = await this.transactionRepo.find({
      type: TransactionTypeEnum.INSURANCE_PURCHASE,
      purchaseStatus: PurchaseStatusEnum.PAID,
      payoutStatus: PayoutStatusEnum.PENDING,
      'insuredPeriod.end': { $gte: new Date() },
      'locationSnapshot.coordinates.lat': { $exists: true },
      'locationSnapshot.coordinates.lng': { $exists: true },
      packageId: { $exists: true },
    });

    for (const tx of transactions) {
      // 2. Lấy insurance package
      const insurancePackage = await this.insurancePackageRepo.findById(
        tx.packageId,
      );
      if (!insurancePackage) continue;

      const { lat, lng } = tx.locationSnapshot.coordinates;
      const insuredStart = tx.insuredPeriod?.start;
      const insuredEnd = tx.insuredPeriod?.end;
      if (!lat || !lng || !insuredStart || !insuredEnd) continue;

      // 3. Xác định khoảng thời gian trigger window
      let windowStart = insuredEnd;
      const windowEnd = insuredEnd;
      if (
        insurancePackage.triggerWindowDays &&
        insurancePackage.triggerWindowDays > 0
      ) {
        windowStart = new Date(insuredEnd);
        windowStart.setDate(
          windowStart.getDate() - insurancePackage.triggerWindowDays,
        );
      } else {
        windowStart = insuredStart;
      }

      // 4. Lấy weather data phù hợp
      // Trừ đi 1 tiếng cộng ở FE
      windowStart = new Date(windowStart.getTime() - 60 * 60 * 1000);
      console.log(windowStart, windowEnd);

      const weatherData = await this.weatherDataRepo.find({
        lat: { $gte: lat - 0.0001, $lte: lat + 0.0001 },
        lng: { $gte: lng - 0.0001, $lte: lng + 0.0001 },
        timestamp: { $gte: windowStart, $lte: windowEnd },
      });
      console.log(weatherData);
      if (!weatherData.length) continue;

      // 5. Lấy giá trị metric cần so sánh
      const metric = insurancePackage.triggerMetric;
      const condition = insurancePackage.triggerCondition;
      const threshold = insurancePackage.triggerThreshold;
      if (
        !metric ||
        !condition ||
        threshold === undefined ||
        threshold === null
      )
        continue;
      const values = weatherData.map((wd) => wd[metric]);
      console.log(values);
      // Lấy giá trị lớn nhất trong window (tuỳ loại metric có thể điều chỉnh)
      const value = Math.max(...values);
      console.log(value);

      // 6. So sánh điều kiện trigger
      let isTriggered = false;
      switch (condition) {
        case TriggerConditionEnum.GREATER_THAN:
          isTriggered = value > threshold;
          break;
        case TriggerConditionEnum.GREATER_THAN_OR_EQUAL:
          isTriggered = value >= threshold;
          break;
        case TriggerConditionEnum.LESS_THAN:
          isTriggered = value < threshold;
          break;
        case TriggerConditionEnum.LESS_THAN_OR_EQUAL:
          isTriggered = value <= threshold;
          break;
        case TriggerConditionEnum.EQUAL:
          isTriggered = value === threshold;
          break;
        case TriggerConditionEnum.NOT_EQUAL:
          isTriggered = value !== threshold;
          break;
      }
      console.log(isTriggered);

      // 7. Nếu đủ điều kiện, cập nhật transaction và process payout
      if (isTriggered) {
        await this.transactionRepo.findByIdAndUpdate(String(tx._id), {
          weatherDataSnapshot: value,
        });
        this.logger.log(`Payout triggered for transaction ${tx._id}`);

        // Gọi processPayout trên smart contract
        try {
          const payoutDecimals = 6; // USDC
          const payoutAmountRaw = Math.round(
            Number(tx.payoutAmount) * 10 ** payoutDecimals,
          );
          await this.avalancheInteractionService.processPayout(
            tx.walletAddress,
            String(tx._id),
            BigInt(payoutAmountRaw),
            avalancheConfig.usdcContractAddress,
          );
          this.logger.log(`processPayout called for tx ${tx._id}`);

          const otherTx = await this.transactionRepo.find({
            _id: { $ne: tx._id },
            payoutStatus: PayoutStatusEnum.PENDING,
            'locationSnapshot.coordinates.lat': lat,
            'locationSnapshot.coordinates.lng': lng,
          });
          if (otherTx.length === 0) {
            // Không còn transaction hợp lệ, deactivate location

            const latInt = Math.round(lat * 1_000_000);
            const lonInt = Math.round(lng * 1_000_000);
            await this.avalancheInteractionService.deactivateLocation(
              latInt,
              lonInt,
            );
            this.logger.log(
              `deactivateLocation called for (${latInt}, ${lonInt})`,
            );
          }
        } catch (err) {
          this.logger.error(
            `Handle process payout failed for (${lat}, ${lng}):`,
            err,
          );
        }
        // Kiểm tra còn transaction hợp lệ nào cùng lat/lng không
      }
    }
  }
}
