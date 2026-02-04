import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class EnvDto {
  @IsString()
  SERVICE_PORT: string;

  @IsString()
  DB_HOST: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  API_VERSION: string;

  @IsString()
  NODE_ENV: string;
}
