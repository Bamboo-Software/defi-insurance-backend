import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InsurancePackage } from '../schemas/insurance-package.schema';
import { Repository } from './Repository';

@Injectable()
export class InsurancePackageRepository extends Repository<InsurancePackage> {
  constructor(
    @InjectModel(InsurancePackage.name)
    private readonly model: Model<InsurancePackage>,
  ) {
    super(model);
  }
}
