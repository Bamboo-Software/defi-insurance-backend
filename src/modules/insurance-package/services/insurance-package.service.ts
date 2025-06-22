import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InsurancePackageRepository } from '../../database';
import { InsurancePackageDto } from '../../../common/dto/insurance-package.dto';
import { AGRICULTURAL_INSURANCE_DATA } from '../../../common';
import { isEqual } from 'lodash';

@Injectable()
export class InsurancePackageService implements OnModuleInit {
  private readonly logger = new Logger(InsurancePackageService.name);

  constructor(
    private readonly insurancePackageRepo: InsurancePackageRepository,
  ) {}

  async onModuleInit() {
    this.logger.log('Initializing insurance packages...');
    const packages = AGRICULTURAL_INSURANCE_DATA;

    for (const pkg of packages) {
      const existingPackage = await this.insurancePackageRepo.findOne({
        name: pkg.name,
      });

      if (!existingPackage) {
        await this.insurancePackageRepo.create(pkg);
      } else {
        const existingData = existingPackage.toObject();
        const { _id, id, createdAt, updatedAt, __v, ...existingFields } =
          existingData;
        if (!isEqual(existingFields, pkg)) {
          await this.insurancePackageRepo.updateOne(
            { _id: existingPackage._id },
            { $set: pkg },
          );
          this.logger.log(`Updated package: ${pkg.name}`);
        }
      }
    }
    this.logger.log('Insurance packages initialization completed.');
  }

  async findAll(): Promise<InsurancePackageDto[]> {
    const packages = await this.insurancePackageRepo.find();
    const packageDtos = packages.map((pkg) => new InsurancePackageDto(pkg));
    return packageDtos;
  }
}
