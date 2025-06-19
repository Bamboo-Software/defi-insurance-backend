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
    } = data;
    const user = ContextProvider.getAuthUser();

    const filter: any = {
      userId: user.id,
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
    const user = ContextProvider.getAuthUser();
    const insurancePackage = await this.insurancePackageRepo.findById(
      payload.packageId,
    );
    if (!insurancePackage) {
      throw new NotFoundException('Insurance package not found');
    }
    const tx = await this.transactionRepo.create({
      userId: user.id,
      type: TransactionTypeEnum.INSURANCE_PURCHASE,
      purchaseStatus: PurchaseStatusEnum.AWAITING_PAYMENT,
      payoutStatus: PayoutStatusEnum.PENDING,
      packageId: insurancePackage.id,
      walletAddress: payload.walletAddress,
      paidAmount: insurancePackage.price,
      payoutAmount: insurancePackage.payoutAmount,
      triggerThreshold: insurancePackage.triggerThreshold,
      cryptoCurrency: insurancePackage.cryptoCurrency,
      chain: insurancePackage.chain,
    });
    return new TransactionDto(tx);
  }
}
