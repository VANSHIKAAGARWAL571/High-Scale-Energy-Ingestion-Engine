import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalConfigService } from 'src/shared/global-confing.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [GlobalConfigService],
      useFactory: (config: GlobalConfigService) => {
        return {
          type: 'postgres',
          // host: process.env.DB_HOST || 'localhost',
          // port: 5432,
          // username: 'postgres',
          // password: 'Vanshika',
          // database: 'energy_db',
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          username: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME,
          autoLoadEntities: true,
          synchronize: config.env.NODE_ENV === 'development' ? true : false,
          logging: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
