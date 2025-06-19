import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateInsuranceTransactionRequestDto {
  @IsNotEmpty()
  @IsString()
  packageId: string;

  @IsNotEmpty()
  @IsString()
  walletAddress: string;

  @IsOptional()
  @IsString()
  purchaseTxHash?: string;
}
