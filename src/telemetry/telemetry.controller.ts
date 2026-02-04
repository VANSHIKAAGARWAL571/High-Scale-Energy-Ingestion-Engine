import { Controller, Post, Body } from '@nestjs/common';
import { TelemetryService } from './telemetry.service';
import { VehicleDto } from './dto/vehicle.dto';
import { MeterDto } from './dto/meter.dto';

@Controller('telemetry')
export class TelemetryController {
  constructor(private service: TelemetryService) {}

  @Post('vehicle')
  ingestVehicle(@Body() body: VehicleDto) {
    return this.service.ingestVehicle(body);
  }

  @Post('meter')
  ingestMeter(@Body() body: MeterDto) {
    return this.service.ingestMeter(body);
  }
}
