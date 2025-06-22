import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;
}
