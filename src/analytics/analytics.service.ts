import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { VehicleHistory } from '../entities/vehicle-history.entity';
import { MeterHistory } from '../entities/meter-history.entity';
import { FleetMapping } from '../entities/fleet-mapping.entity';

interface VehicleAgg {
  dc: string | null;
  temp: string | null;
}

interface MeterAgg {
  ac: string | null;
}

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(VehicleHistory)
    private vehicleRepo: Repository<VehicleHistory>,

    @InjectRepository(MeterHistory)
    private meterRepo: Repository<MeterHistory>,

    @InjectRepository(FleetMapping)
    private mapRepo: Repository<FleetMapping>,
  ) {}

  async performance(vehicleId: string) {
    const mapping = await this.mapRepo.findOneBy({ vehicleId });
    if (!mapping) {
      throw new NotFoundException('Mapping not found');
    }

    const meterId = mapping.meterId;
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const vehicleResult = await this.vehicleRepo
      .createQueryBuilder('v')
      .select('SUM(v.kwhDeliveredDc)', 'dc')
      .addSelect('AVG(v.batteryTemp)', 'temp')
      .where('v.vehicleId = :vehicleId', { vehicleId })
      .andWhere('v.timestamp >= :since', { since })
      .getRawOne<VehicleAgg>();

    const meterResult = await this.meterRepo
      .createQueryBuilder('m')
      .select('SUM(m.kwhConsumedAc)', 'ac')
      .where('m.meterId = :meterId', { meterId })
      .andWhere('m.timestamp >= :since', { since })
      .getRawOne<MeterAgg>();

    // Safe numeric conversion
    const dc = Number(vehicleResult?.dc ?? 0);
    const ac = Number(meterResult?.ac ?? 0);
    const avgTemp = Number(vehicleResult?.temp ?? 0);

    return {
      totalAc: ac,
      totalDc: dc,
      efficiency: ac ? dc / ac : 0,
      avgTemp,
    };
  }
}
