import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Repository } from './Repository';
import { Transaction } from '../schemas';

@Injectable()
export class TransactionRepository extends Repository<Transaction> {
  constructor(
    @InjectModel(Transaction.name) private readonly model: Model<Transaction>,
  ) {
    super(model);
  }
}
