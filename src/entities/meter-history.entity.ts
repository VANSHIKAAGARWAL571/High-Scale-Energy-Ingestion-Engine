import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';
@Entity('meter_history')
@Index(['meterId', 'timestamp'])
export class MeterHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  meterId: string;

  @Column('float')
  kwhConsumedAc: number;

  @Column('float')
  voltage: number;

  @Column({ type: 'timestamptz' })
  timestamp: Date;
}
