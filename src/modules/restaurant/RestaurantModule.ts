import { Module } from '@nestjs/common';
import { RestaurantController } from './controllers/RestaurantController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantModel } from '@database/domains/restaurant/RestaurantModel';
import { RestaurantAddressModel } from '@database/domains/restaurant/RestaurantAddressModel';
import { RestaurantOpeningHourModel } from '@database/domains/restaurant/RestaurantOpeningHourModel';
import { CreateRestaurantUseCase } from './usecases/CreateRestaurantUseCase';
import { RestaurantRepository } from './domains/restaurant/RestaurantRepository';
import { IRestaurantRepository } from './domains/restaurant/IRestaurantRepository';
import { FindAllRestaurantUseCase } from './usecases/FindAllRestaurantUseCase';
import { IRestaurantAddressRepository } from './domains/restaurantAddress/IRestaurantAddressRepository';
import { RestaurantAddressRepository } from './domains/restaurantAddress/RestaurantAddressRepository';
import { IRestaurantOpeningHoursRepository } from './domains/restaurantOpeningHour/IRestaurantOpeningHourRepository';
import { RestaurantOpeningHourRepository } from './domains/restaurantOpeningHour/RestaurantOpeningHourRepository';
import { FindRestaurantUseCase } from './usecases/FindRestaurantUseCase';
import { UpdateRestaurantUseCase } from './usecases/UpdateRestaurantUseCase';
import { DeleteRestaurantUseCase } from './usecases/DeleteRestaurantUseCase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RestaurantModel,
      RestaurantAddressModel,
      RestaurantOpeningHourModel,
    ]),
  ],
  controllers: [RestaurantController],
  providers: [
    { provide: IRestaurantRepository, useClass: RestaurantRepository },
    {
      provide: IRestaurantAddressRepository,
      useClass: RestaurantAddressRepository,
    },
    {
      provide: IRestaurantOpeningHoursRepository,
      useClass: RestaurantOpeningHourRepository,
    },
    CreateRestaurantUseCase,
    FindAllRestaurantUseCase,
    FindRestaurantUseCase,
    UpdateRestaurantUseCase,
    DeleteRestaurantUseCase,
  ],
})
export class RestaurantsModule {}
