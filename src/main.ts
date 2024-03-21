import { NestFactory } from '@nestjs/core';
import { RequestMethod } from '@nestjs/common';
import { AppModule } from './AppModule';
import { InvalidTimeFormatFilter } from '@core/helpers/exceptionFilters/InvalidTimeFormatFilter';
import { ErrorInterceptor } from '@core/helpers/interceptors/ErrorInterceptor';

async function bootstrap() {
  const api = await NestFactory.create(AppModule);
  api.setGlobalPrefix('/api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  api.useGlobalInterceptors(new ErrorInterceptor());
  api.useGlobalFilters(new InvalidTimeFormatFilter());

  await api.listen(3000);
}
bootstrap();
