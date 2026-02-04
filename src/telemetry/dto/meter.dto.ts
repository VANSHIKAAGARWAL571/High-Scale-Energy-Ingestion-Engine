import { IsString, IsNumber, IsDateString } from 'class-validator';

export class MeterDto {
  @IsString()
  meterId: string;

  @IsNumber()
  kwhConsumedAc: number;

  @IsNumber()
  voltage: number;

  @IsDateString()
  timestamp: string;
}
