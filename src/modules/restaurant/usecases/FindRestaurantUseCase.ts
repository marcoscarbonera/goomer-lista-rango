import { Injectable } from '@nestjs/common';
import { IRestaurantRepository } from '@restaurant/domains/restaurant/IRestaurantRepository';
import { Restaurant } from '@restaurant/domains/restaurant/Restaurant';
import { IRestaurantAddressRepository } from '@restaurant/domains/restaurantAddress/IRestaurantAddressRepository';
import { IRestaurantOpeningHoursRepository } from '@restaurant/domains/restaurantOpeningHour/IRestaurantOpeningHourRepository';

@Injectable()
export class FindRestaurantUseCase {
  constructor(
    private restaurantRepository: IRestaurantRepository,
    private restaurantAddressRepository: IRestaurantAddressRepository,
    private restaurantOpeningHoursRepository: IRestaurantOpeningHoursRepository,
  ) {}

  async execute(id: string): Promise<Restaurant> {
    try {
      const restaurant = await this.restaurantRepository.findById(id);

      if (!restaurant) {
        return null;
      }

      restaurant.address =
        await this.restaurantAddressRepository.findByRestaurantId(
          restaurant.id,
        );

      restaurant.openingHours =
        await this.restaurantOpeningHoursRepository.findByRestaurantId(
          restaurant.id,
        );

      return restaurant;
    } catch (error) {
      throw error;
    }
  }
}
