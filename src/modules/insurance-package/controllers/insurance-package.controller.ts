import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InsurancePackageService } from '../services/insurance-package.service';
import { ApiOkResponse } from '../../../decorators';
import { InsurancePackageDto } from '../../../common';
import { FindAllInsurancePackageRequestDto } from '../dto/query-insurance-package.dto';

@ApiTags('insurance-package')
@Controller('insurance-package')
export class InsurancePackageController {
  constructor(
    private readonly insurancePackageService: InsurancePackageService,
  ) {}

  @Get()
  @ApiOkResponse({
    type: InsurancePackageDto,
    description: 'Get all insurance packages',
    isArray: true,
  })
  async findAll(@Query() query: FindAllInsurancePackageRequestDto) {
    return this.insurancePackageService.findAll();
  }
}
