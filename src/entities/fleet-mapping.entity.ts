import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('fleet_mapping')
export class FleetMapping {
  @PrimaryColumn()
  vehicleId: string;

  @Column()
  meterId: string;
}
