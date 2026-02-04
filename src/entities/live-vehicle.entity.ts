import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('live_vehicle')
export class LiveVehicle {
  @PrimaryColumn()
  vehicleId: string;

  @Column('float')
  soc: number;

  @Column('float')
  kwhDeliveredDc: number;

  @Column('float')
  batteryTemp: number;

  @Column({ type: 'timestamptz' })
  updatedAt: Date;
}
