import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';

import { VehicleHistory } from '../entities/vehicle-history.entity';
import { MeterHistory } from '../entities/meter-history.entity';
import { FleetMapping } from '../entities/fleet-mapping.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([VehicleHistory, MeterHistory, FleetMapping]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
