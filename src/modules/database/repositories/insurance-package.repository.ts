import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  InsurancePackage,
  InsurancePackageDocument,
} from '../schemas/insurance-packages.schema';
import { Repository } from './Repository';

@Injectable()
export class InsurancePackageRepository extends Repository<InsurancePackageDocument> {
  constructor(
    @InjectModel(InsurancePackage.name)
    private readonly insurancePackageModel: Model<InsurancePackageDocument>,
  ) {
    super(insurancePackageModel);
  }
}
