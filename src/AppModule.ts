import { Module } from '@nestjs/common';
import { TypeOrmConfig } from '@database/config/TypeOrmConfig';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CoreModule } from '@core/CoreModule';
import { RestaurantsModule } from './modules/restaurant/RestaurantModule';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...(TypeOrmConfig as TypeOrmModuleOptions),
    }),
    CoreModule,
    RestaurantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
