import { Module } from '@nestjs/common';
import { HealthCheckController } from './controllers/HealthCheckController';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule],
  controllers: [HealthCheckController],
  providers: [],
})
export class CoreModule {}
