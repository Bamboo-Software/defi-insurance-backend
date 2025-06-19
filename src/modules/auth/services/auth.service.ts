/*
https://docs.nestjs.com/providers#services
*/

import {
  CryptoWalletRepository,
  User,
  UserRepository,
  UserSocial,
  UserSocialRepository,
} from '@/modules/database';
import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from '../dto/login-response.dto';
import { JwtPayloadType } from '../types';
import { UserDto } from '@/common/dto/user.dto';
import { LoginSocialRequestDto } from '../dto/login-request.dto';
import randomize from 'randomatic';
import { ContextProvider } from '../../../providers';
import {
  PaymentProviderEnum,
  RoleTypeEnum,
  SocialTypeEnum,
} from '../../../common';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezonePlugin from 'dayjs/plugin/timezone';
import { AuthFactory } from '../factories';
import { IUser } from '../interfaces';
import { MailService } from '../../core/services/mail.service';
import { UploadService } from '../../upload/services/upload.service';
import { UserNotFoundException } from '../../../exceptions';

dayjs.extend(utc);
dayjs.extend(timezonePlugin);

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepo: UserRepository,
    private readonly userSocialRepo: UserSocialRepository,
    private readonly uploadService: UploadService,
    private readonly cryptoWalletRepo: CryptoWalletRepository,
  ) {}

  async loginSocial(creds: LoginSocialRequestDto): Promise<any> {
    this.logger.log('loginSocial creds = ' + JSON.stringify(creds));
    const authFactory = AuthFactory.create(creds.socialType);

    const authInfo: IUser = await authFactory.getUserInfo(
      creds.accessToken || creds.walletAddress || creds.telegramInitData,
      creds.signature,
      creds.message,
    );

    let userSocial = await this.userSocialRepo.findOne({
      socialType: creds.socialType,
      socialId: authInfo.id,
    });
    let user: User = null;
    if (!userSocial) {
      const userBody: Partial<User> = {
        email: authInfo.email,
        emailVerified: Boolean(authInfo.email),
        firstName: authInfo.firstName,
        lastName: authInfo.lastName,
        name: authInfo.name,
        username: authInfo.username ?? `user_${randomize('A0', 6)}`,
        active: true,
        role: RoleTypeEnum.User,
        createdAt: new Date(),
      };

      const existingUsername = await this.userRepo.findOne({
        username: userBody.username,
      });
      if (existingUsername) {
        userBody.username = `${userBody.username}_${randomize('A0', 6)}`;
      }

      user = authInfo.email
        ? await this.userRepo.findOne({ email: authInfo.email })
        : null;

      if (!user) user = await this.userRepo.create({ ...userBody });

      userSocial = await this.userSocialRepo.create({
        userId: user.id,
        socialType: creds.socialType,
        socialId: authInfo.id,
        accessToken: creds.accessToken || creds.signature,
        refreshToken: creds.refreshToken,
      });

      if (
        creds.socialType === SocialTypeEnum.Phantom ||
        creds.socialType === SocialTypeEnum.Metamask
      ) {
        const existingWallet = await this.cryptoWalletRepo.findOne({
          walletAddress: authInfo.walletAddress,
        });
        if (existingWallet)
          throw new BadRequestException(
            `This wallet address ${authInfo.walletAddress} is already linked to another account. Please disconnect it from the current account or use a different wallet to proceed.`,
          );
        await this.cryptoWalletRepo.create({
          userId: user.id,
          walletAddress: authInfo.walletAddress,
          provider: creds.socialType as unknown as PaymentProviderEnum,
          tag: creds.socialType.toLowerCase(),
          verified: true,
        });
      }
    } else {
      const dataUpdate: Partial<UserSocial> = {
        accessToken: creds.accessToken,
        accessTokenExpiredAt: new Date(Date.now() + 3600 * 1000),
      };
      if (creds.refreshToken) {
        dataUpdate.refreshToken = creds.refreshToken;
        dataUpdate.refreshTokenExpiredAt = new Date(
          Date.now() + 6 * 30 * 24 * 3600 * 1000,
        );
      }
      await this.userSocialRepo.updateOne(
        { socialId: userSocial.socialId },
        { ...dataUpdate },
      );
      user = await this.userRepo.findOneAndUpdate(
        {
          _id: userSocial.userId,
        },
        {
          isTelegramPremium: authInfo.isTelegramPremium,
          telegramLanguageCode: authInfo.telegramLanguageCode,
          estimatedTelegramAccountAge: authInfo.estimatedTelegramAccountAge,
        },
      );
    }

    if (!user) throw new UserNotFoundException();

    if (authInfo.avatar) {
      if (!user.avatar) {
        user.avatar = authInfo.avatar;
        const result = await this.uploadService
          .saveImageUrlToS3(authInfo.avatar)
          .catch((err) => {
            this.logger.warn(
              'uploadService.saveImageUrlToS3 err: ' + err.message,
            );
          });
        if (result) {
          user.avatar = result.url;
        }
        await user
          .save()
          .catch((err) =>
            this.logger.warn('Cannot update avatar: ' + err.message),
          );
      }
    }

    ContextProvider.setAuthUser(user);
    return this.authenticate(user);
  }

  async authenticate(user: User): Promise<LoginResponseDto> {
    const payload: JwtPayloadType = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    const token = this.jwtService.sign(payload);

    return {
      user: new UserDto(user),
      token,
    };
  }

  async me(id: string): Promise<UserDto> {
    const user = await this.userRepo.findById(id, null, {
      populate: [
        'transactionCount',
        'achievementCount',
        'socials',
        'asReferrerCount',
        'asRefereeCount',
      ],
    });
    return new UserDto(user);
  }
}
