import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('vehicle_history')
@Index(['vehicleId', 'timestamp'])
export class VehicleHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vehicleId: string;

  @Column('float')
  kwhDeliveredDc: number;

  @Column('float')
  batteryTemp: number;

  @Column()
  soc: number;

  @Column({ type: 'timestamptz' })
  timestamp: Date;
}
