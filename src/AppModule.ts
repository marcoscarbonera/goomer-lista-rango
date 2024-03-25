import { Module } from '@nestjs/common';
import { TypeOrmConfig } from '@database/config/TypeOrmConfig';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CoreModule } from '@core/CoreModule';
import { RestaurantsModule } from './modules/restaurant/RestaurantModule';
import { ProductModule } from '@product/ProductModule';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...(TypeOrmConfig as TypeOrmModuleOptions),
    }),
    CoreModule,
    RestaurantsModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
