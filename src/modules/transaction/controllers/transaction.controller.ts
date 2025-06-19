import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiOkResponse,
  ApiPageOkResponse,
  UseGuardAuth,
} from '../../../decorators';
import { PageDto, TransactionDto } from '../../../common';
import { FindAllTransactionRequestDto } from '../dto/query-transaction.dto';
import { CreateInsuranceTransactionRequestDto } from '../dto/create-insurance-transaction.dto';

@Controller('insurance-transaction')
@ApiTags('insurance-transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('me')
  @UseGuardAuth()
  @ApiPageOkResponse({
    type: TransactionDto,
    description: 'Get all transactions',
  })
  async getAllTransactions(
    @Query() payload: FindAllTransactionRequestDto,
  ): Promise<PageDto<TransactionDto>> {
    return await this.transactionService.getAllTransactions(payload);
  }

  @Post()
  @ApiOkResponse({
    type: TransactionDto,
    description: 'Create a new transaction',
  })
  async createInsuranceTransaction(
    @Body() payload: CreateInsuranceTransactionRequestDto,
  ) {
    return await this.transactionService.createInsuranceTransaction(payload);
  }
}
