import { IsEnum, IsOptional } from 'class-validator';
import { PageOptionsDto, TransactionTypeEnum } from '../../../common';

export class FindAllTransactionRequestDto extends PageOptionsDto {
  @IsEnum(TransactionTypeEnum)
  @IsOptional()
  type?: TransactionTypeEnum;
}
