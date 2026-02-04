import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TelemetryController } from './telemetry.controller';
import { TelemetryService } from './telemetry.service';

import { VehicleHistory } from '../entities/vehicle-history.entity';
import { MeterHistory } from '../entities/meter-history.entity';
import { LiveVehicle } from '../entities/live-vehicle.entity';
import { LiveMeter } from '../entities/live-meter.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VehicleHistory,
      MeterHistory,
      LiveVehicle,
      LiveMeter,
    ]),
  ],
  controllers: [TelemetryController],
  providers: [TelemetryService],
})
export class TelemetryModule {}
