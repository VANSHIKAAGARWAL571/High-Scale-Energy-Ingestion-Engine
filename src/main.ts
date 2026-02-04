import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SharedModule } from './shared/shared.module';
import { GlobalConfigService } from './shared/global-confing.service';
import { HttpStatus, Logger, UnprocessableEntityException, ValidationPipe, VersioningType } from '@nestjs/common';
import { setupSwagger } from './swagger-setup';
import { loggerMiddleware } from './middlewares/logger-middleware';
import compression from 'compression';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });
  const config = app.select(SharedModule).get(GlobalConfigService);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: config.env.API_VERSION ?? '1',
  });

  app.use(compression());
  app.use(helmet({
    contentSecurityPolicy: false,
  }))

  app.use(loggerMiddleware)

  setupSwagger(app);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    transform: true,
    forbidUnknownValues: true,
    exceptionFactory: (errors)=> new UnprocessableEntityException(errors)
  }))

  const port = config.env.SERVICE_PORT;
  const logger = new Logger('Bootstrap');

  await app.listen(port?? 3000, async()=>{
    logger.debug(`Application listening on port ${await app.getUrl()}`);
  });

}
bootstrap();
