import { Injectable, Logger } from '@nestjs/common';
import { InsurancePackageRepository } from '../../database';
import { InsurancePackageDto } from '../../../common/dto/insurance-package.dto';

@Injectable()
export class InsurancePackageService {
  private readonly logger = new Logger(InsurancePackageService.name);

  constructor(
    private readonly insurancePackageRepo: InsurancePackageRepository,
  ) {}

  async findAll(): Promise<InsurancePackageDto[]> {
    const packages = await this.insurancePackageRepo.find();
    return packages.map((pkg) => new InsurancePackageDto(pkg));
  }
}
