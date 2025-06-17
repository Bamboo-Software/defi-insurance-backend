import { User, UserSocial } from '@/modules/database';
import { Expose, Transform, Type, plainToInstance } from 'class-transformer';
import { RoleTypeEnum, SocialTypeEnum } from '../enums';

export class UserDto {
  @Expose()
  @Type(() => String)
  id?: string;

  @Expose()
  @Type(() => String)
  _id?: string;

  @Expose()
  name?: string;

  @Expose()
  firstName?: string;

  @Expose()
  lastName?: string;

  @Expose()
  email?: string;

  @Expose()
  phone?: string;

  @Expose()
  username?: string;

  @Expose()
  emailVerified?: boolean;

  @Expose()
  phoneVerified?: boolean;

  @Expose()
  avatar?: string;

  @Expose()
  active?: boolean;

  @Expose()
  telegramLanguageCode?: string;

  @Expose()
  role?: RoleTypeEnum;

  @Expose()
  referralCode?: string;

  @Expose()
  isTelegramPremium?: boolean;

  @Expose()
  estimatedTelegramAccountAge?: string;

  @Expose()
  pointsBalance?: number;

  @Expose()
  timezone?: string;

  @Expose()
  deletedAt?: Date;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;

  @Expose()
  transactionCount?: number;

  @Expose()
  referralCount?: number;

  @Expose()
  achievementCount?: number;

  @Expose()
  lotteryEntries?: number;

  @Expose()
  doublePointsActive?: boolean;

  @Expose()
  doublePointsExpiresAt?: Date;

  @Expose()
  isOnboarded: boolean;

  @Expose()
  @Type(() => String)
  botId?: string;

  @Expose()
  isBot?: boolean;

  @Expose()
  @Type(() => UserSocialDto)
  socials?: UserSocialDto[];

  constructor(props: Partial<User>) {
    return plainToInstance(UserDto, props, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
  }
}

export class UserSocialDto {
  @Expose()
  id: string;

  @Expose()
  socialType?: SocialTypeEnum;

  @Expose()
  socialId?: string;

  constructor(props: Partial<UserSocial>) {
    return plainToInstance(UserSocialDto, props, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
  }
}
