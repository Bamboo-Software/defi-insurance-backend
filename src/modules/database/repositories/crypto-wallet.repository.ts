import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Repository } from './Repository';
import { CryptoWallet } from '../schemas';

@Injectable()
export class CryptoWalletRepository extends Repository<CryptoWallet> {
  constructor(
    @InjectModel(CryptoWallet.name) private readonly model: Model<CryptoWallet>,
  ) {
    super(model);
  }
}
