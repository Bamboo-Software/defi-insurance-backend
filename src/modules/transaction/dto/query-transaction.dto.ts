import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PageOptionsDto, TransactionTypeEnum } from '../../../common';

export class FindAllTransactionRequestDto extends PageOptionsDto {
  @IsEnum(TransactionTypeEnum)
  @IsOptional()
  type?: TransactionTypeEnum;

  @IsString()
  @IsNotEmpty()
  walletAddress: string;
}
