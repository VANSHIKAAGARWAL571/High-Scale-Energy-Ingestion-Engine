import { Entity, Column, PrimaryColumn } from 'typeorm';
@Entity('live_meter')
export class LiveMeter {
  @PrimaryColumn()
  meterId: string;

  @Column('float')
  kwhConsumedAc: number;

  @Column('float')
  voltage: number;

  @Column({ type: 'timestamptz' })
  updatedAt: Date;
}
