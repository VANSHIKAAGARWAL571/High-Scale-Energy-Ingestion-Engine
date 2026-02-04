import {
  Controller,
  Get,
  Redirect,
  UseGuards,
  Version,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { AuthGaurd } from './gaurds/auth-gaurd';

@ApiTags('Health Check')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Version(VERSION_NEUTRAL)
  @ApiExcludeEndpoint()
  @Redirect('/v1/health-check', 302)
  redirectToHealth() {
    return;
  }

  @Get('/health')
  @Version(VERSION_NEUTRAL)
  @ApiExcludeEndpoint()
  simpleHealthCheck() {
    return { status: 'OK', timestamp: new Date().toISOString() };
  }

  @UseGuards(AuthGaurd)
  @Get('/health-check')
  @Version(VERSION_NEUTRAL)
  healthCheck() {
    return this.appService.healthCheck();
  }
}
