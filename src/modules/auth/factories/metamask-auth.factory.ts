import { verifyMessage } from 'ethers';
import { IAuthFactory, IUser } from '../interfaces';
import { buildUsernameFromWalletAddress } from '../../../utils';

export class MetamaskAuthFactory implements IAuthFactory {
  async getUserInfo(
    walletAddress: string,
    signature: string,
    message: string,
  ): Promise<IUser> {
    const recoveredAddress = verifyMessage(message, signature);
    if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      throw new Error('Signature verification failed');
    }

    return {
      id: walletAddress,
      email: null,
      name: buildUsernameFromWalletAddress(walletAddress),
      username: buildUsernameFromWalletAddress(walletAddress),
      avatar: null,
      walletAddress,
    };
  }
}
