import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('')
export class HealthCheckController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get('/health')
  @HealthCheck()
  healthCheck() {
    return this.health.check([
      async () => this.db.pingCheck('database', { timeout: 2000 }),
    ]);
  }
}
