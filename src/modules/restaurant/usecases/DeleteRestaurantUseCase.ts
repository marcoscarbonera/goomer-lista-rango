import { Injectable } from '@nestjs/common';
import { IRestaurantRepository } from '@restaurant/domains/restaurant/IRestaurantRepository';
import { Restaurant } from '@restaurant/domains/restaurant/Restaurant';
import { IRestaurantAddressRepository } from '@restaurant/domains/restaurantAddress/IRestaurantAddressRepository';
import { IRestaurantOpeningHoursRepository } from '@restaurant/domains/restaurantOpeningHour/IRestaurantOpeningHourRepository';

@Injectable()
export class DeleteRestaurantUseCase {
  constructor(
    private restaurantRepository: IRestaurantRepository,
    private restaurantAddressRepository: IRestaurantAddressRepository,
    private restaurantOpeningHoursRepository: IRestaurantOpeningHoursRepository,
  ) {}

  async execute(id: string): Promise<void> {
    try {
      await this.restaurantOpeningHoursRepository.delete(id);
      await this.restaurantAddressRepository.deleteByRestaurantId(id);
      await this.restaurantRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
