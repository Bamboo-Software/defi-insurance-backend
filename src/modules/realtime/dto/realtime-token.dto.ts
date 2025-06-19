import { IsNotEmpty, IsString } from 'class-validator';

export class RealtimeTokenDto {
  token: string;
}

export class RealtimeSubscriptionTokenRequestDto {
  @IsNotEmpty()
  @IsString()
  channel: string;
}
