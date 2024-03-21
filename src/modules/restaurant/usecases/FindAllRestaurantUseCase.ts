import { Injectable } from '@nestjs/common';
import { IRestaurantRepository } from '@restaurant/domains/restaurant/IRestaurantRepository';
import { Restaurant } from '@restaurant/domains/restaurant/Restaurant';
import { IRestaurantAddressRepository } from '@restaurant/domains/restaurantAddress/IRestaurantAddressRepository';
import { IRestaurantOpeningHoursRepository } from '@restaurant/domains/restaurantOpeningHour/IRestaurantOpeningHourRepository';

@Injectable()
export class FindAllRestaurantUseCase {
  constructor(
    private restaurantRepository: IRestaurantRepository,
    private restaurantAddressRepository: IRestaurantAddressRepository,
    private restaurantOpeningHoursRepository: IRestaurantOpeningHoursRepository,
  ) {}

  async execute(): Promise<Restaurant[]> {
    const restaurants = await this.restaurantRepository.findAll();

    if (!restaurants) {
      return null;
    }

    //get address from restaurants
    for (const restaurant of restaurants) {
      restaurant.address =
        await this.restaurantAddressRepository.findByRestaurantId(
          restaurant.id,
        );
    }

    for (const restaurant of restaurants) {
      restaurant.openingHours =
        await this.restaurantOpeningHoursRepository.findByRestaurantId(
          restaurant.id,
        );
    }

    return restaurants;
  }
}
