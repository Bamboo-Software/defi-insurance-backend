import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  TransactionRepository,
  InsurancePackageRepository,
} from '../../database';
import {
  OrderDirectionEnum,
  PageDto,
  TransactionDto,
  TransactionTypeEnum,
} from '../../../common';
import { FindAllTransactionRequestDto } from '../dto/query-transaction.dto';

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
      walletAddress,
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
        populate: ['package'],
        lean: true,
      },
    );

    const dtos = items.map((entity) => new TransactionDto(entity));
    return new PageDto(dtos, total);
  }
}
