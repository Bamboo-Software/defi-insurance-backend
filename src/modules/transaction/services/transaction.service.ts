import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  TransactionRepository,
  InsurancePackageRepository,
} from '../../database';
import {
  OrderDirectionEnum,
  PageDto,
  TransactionDto,
  TransactionStatusEnum,
  TransactionTypeEnum,
  PurchaseStatusEnum,
  PayoutStatusEnum,
} from '../../../common';
import { FindAllTransactionRequestDto } from '../dto/query-transaction.dto';
import { ContextProvider } from '../../../providers';
import { CreateInsuranceTransactionRequestDto } from '../dto/create-insurance-transaction.dto';

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);

  constructor(
    private readonly transactionRepo: TransactionRepository,
    private readonly insurancePackageRepo: InsurancePackageRepository,
  ) {}

  async getAllTransactions(
    data: FindAllTransactionRequestDto,
  ): Promise<PageDto<TransactionDto>> {
    const {
      offset,
      limit,
      q,
      startTime,
      endTime,
      orderField,
      orderDirection,
      type,
      walletAddress,
    } = data;

    const filter: any = {
      ...(walletAddress ? { walletAddress } : {}),
      ...(type ? { type } : { type: TransactionTypeEnum.INSURANCE_PURCHASE }),
      ...(startTime || endTime
        ? {
            createdAt: {
              ...(startTime ? { $gte: new Date(startTime) } : {}),
              ...(endTime ? { $lte: new Date(endTime) } : {}),
            },
          }
        : {}),
      ...(q
        ? {
            $or: [
              { walletAddress: { $regex: q, $options: 'i' } },
              { packageId: { $regex: q, $options: 'i' } },
            ],
          }
        : {}),
    };

    const { items, total } = await this.transactionRepo.findAndCount(
      filter,
      null,
      {
        skip: offset,
        limit,
        sort: {
          [orderField ?? 'createdAt']:
            orderDirection === OrderDirectionEnum.ASC ? 1 : -1,
        },
      },
    );
    const dtos = items.map((entity) => new TransactionDto(entity));
    return new PageDto(dtos, total);
  }

  async createInsuranceTransaction(
    payload: CreateInsuranceTransactionRequestDto,
  ): Promise<TransactionDto> {
    const {
      packageId,
      walletAddress,
      latitude,
      longitude,
      purchaseTxHash,
      startDate,
    } = payload;
    const insurancePackage =
      await this.insurancePackageRepo.findById(packageId);
    if (!insurancePackage) {
      throw new NotFoundException('Insurance package not found');
    }

    const purchaseAt = new Date();
    const insuredPeriodStart = startDate || purchaseAt;
    const insuredPeriodEnd = new Date(insuredPeriodStart);
    insuredPeriodEnd.setDate(
      insuredPeriodStart.getDate() + insurancePackage.durationDays,
    );

    const tx = await this.transactionRepo.create({
      type: TransactionTypeEnum.INSURANCE_PURCHASE,
      purchaseStatus: PurchaseStatusEnum.AWAITING_PAYMENT,
      payoutStatus: PayoutStatusEnum.PENDING,
      packageId: insurancePackage.id,
      walletAddress,
      paidAmount: insurancePackage.price,
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
    });
    return new TransactionDto(tx);
  }
}
