import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { LoginSocialActionTypeEnum, SocialTypeEnum } from '../../../common';

export class LoginSocialRequestDto {
  @ApiProperty({ enum: SocialTypeEnum, description: 'Type of social login' })
  @IsNotEmpty()
  socialType: SocialTypeEnum;

  @ApiPropertyOptional({
    example: 'access_token_12345',
    description: 'Access token for social login',
  })
  @ValidateIf((o) =>
    [
      SocialTypeEnum.Facebook,
      SocialTypeEnum.Google,
      SocialTypeEnum.Instagram,
      SocialTypeEnum.X,
    ].includes(o.socialType),
  )
  @IsNotEmpty()
  accessToken?: string;

  @ApiPropertyOptional({
    example: 'refresh_token_67890',
    description: 'Optional refresh token for social login',
  })
  @IsOptional()
  refreshToken?: string;

  @ApiProperty({
    example:
      'user=%7B%22id%22%3A308131758%2C%22first_name%22%3A%22ALEX%22%2C%22last_name%22%3A%22IVANNIKOV.PRO%22%2C%22username%22%3A%22ivannikovPro%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-1857114464680496286&chat_type=private&auth_date=1716232213&hash=7d31991a605ab5e265b40ebbccc09c28bfb59366d2ac5cee9ca288c24a2ed3c3',
    description: 'Init data from TMA',
  })
  @ValidateIf((o) => o.socialType === SocialTypeEnum.Telegram)
  @IsNotEmpty()
  @IsString()
  telegramInitData?: string;

  @ApiPropertyOptional({
    example: 'wallet_address',
    description: 'Optional wallet address for login with wallet',
  })
  @ValidateIf((o) =>
    [SocialTypeEnum.Metamask, SocialTypeEnum.Phantom].includes(o.socialType),
  )
  @IsNotEmpty()
  walletAddress?: string;

  @ApiPropertyOptional({
    example: 'sign',
    description: 'Optional signature for login with wallet',
  })
  @ValidateIf((o) =>
    [SocialTypeEnum.Metamask, SocialTypeEnum.Phantom].includes(o.socialType),
  )
  @IsNotEmpty()
  signature?: string;

  @ApiPropertyOptional({
    example: 'message',
    description: 'Optional message for login with wallet',
  })
  @ValidateIf((o) =>
    [SocialTypeEnum.Metamask, SocialTypeEnum.Phantom].includes(o.socialType),
  )
  @IsNotEmpty()
  message?: string;

  @ApiPropertyOptional({
    example: 'ref_123',
    description: 'Referral code',
  })
  @IsOptional()
  ref?: string;
}

export class CreateLoginSocialUrlRequestDto {
  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  ref?: string;

  @IsOptional()
  @IsEnum(LoginSocialActionTypeEnum)
  action?: string = LoginSocialActionTypeEnum.Login;

  @ValidateIf((o) => o.action === LoginSocialActionTypeEnum.Sync)
  @IsString()
  token?: string;
}

export class OAuth2CallbackRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  error?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  error_description?: string;

  @ApiPropertyOptional({
    example: 'authorization_code_12345',
    description: 'Authorization code from OAuth2 flow',
  })
  @ValidateIf((o) => !o.error)
  @IsString()
  code?: string;

  @ApiPropertyOptional({
    example: 'state_123',
    description: 'Authorization state login',
  })
  @IsString()
  @IsOptional()
  state?: string;
}
