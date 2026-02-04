import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { VehicleHistory } from '../entities/vehicle-history.entity';
import { MeterHistory } from '../entities/meter-history.entity';
import { LiveVehicle } from '../entities/live-vehicle.entity';
import { LiveMeter } from '../entities/live-meter.entity';

import { VehicleDto } from './dto/vehicle.dto';
import { MeterDto } from './dto/meter.dto';

@Injectable()
export class TelemetryService {
  constructor(
    @InjectRepository(VehicleHistory)
    private vehicleHistoryRepo: Repository<VehicleHistory>,

    @InjectRepository(LiveVehicle)
    private liveVehicleRepo: Repository<LiveVehicle>,

    @InjectRepository(MeterHistory)
    private meterHistoryRepo: Repository<MeterHistory>,

    @InjectRepository(LiveMeter)
    private liveMeterRepo: Repository<LiveMeter>,
  ) {}

  async ingestVehicle(data: VehicleDto) {
    await this.vehicleHistoryRepo.save(data);

    await this.liveVehicleRepo.upsert(
      {
        vehicleId: data.vehicleId,
        soc: data.soc,
        kwhDeliveredDc: data.kwhDeliveredDc,
        batteryTemp: data.batteryTemp,
        updatedAt: data.timestamp,
      },
      ['vehicleId'],
    );
  }

  async ingestMeter(data: MeterDto) {
    await this.meterHistoryRepo.save(data);

    await this.liveMeterRepo.upsert(
      {
        meterId: data.meterId,
        kwhConsumedAc: data.kwhConsumedAc,
        voltage: data.voltage,
        updatedAt: data.timestamp,
      },
      ['meterId'],
    );
  }
}
