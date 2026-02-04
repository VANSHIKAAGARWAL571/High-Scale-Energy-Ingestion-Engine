import { Controller, Get, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private service: AnalyticsService) {}

  @Get('performance/:vehicleId')
  performance(@Param('vehicleId') id: string) {
    return this.service.performance(id);
  }
}
