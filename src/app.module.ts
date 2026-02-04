import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module';
import { SharedModule } from './shared/shared.module';

import { TelemetryModule } from './telemetry/telemetry.module';
import { AnalyticsModule } from './analytics/analytics.module';

import { SampleMiddleware } from './middlewares/sample-middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
      cache: true,
    }),
    DatabaseModule,
    SharedModule,
    TelemetryModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SampleMiddleware).forRoutes('*');
  }
}
