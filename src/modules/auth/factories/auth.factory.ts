import { Injectable } from '@nestjs/common';
import { SocialTypeEnum } from '../../../common/enums';
import { MetamaskAuthFactory } from './metamask-auth.factory';

@Injectable()
export class AuthFactory {
  static create(socialType: SocialTypeEnum) {
    switch (socialType) {
      case SocialTypeEnum.Metamask:
        return new MetamaskAuthFactory();

      default:
        throw new Error(`Invalid socialType value ${socialType}`);
    }
  }
}
