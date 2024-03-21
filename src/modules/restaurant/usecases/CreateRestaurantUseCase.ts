import { validateTimeFormat } from '@core/helpers/validateTimeFormat';
import { Injectable } from '@nestjs/common';
import { IRestaurantRepository } from '@restaurant/domains/restaurant/IRestaurantRepository';
import { Restaurant } from '@restaurant/domains/restaurant/Restaurant';
import { IRestaurantAddressRepository } from '@restaurant/domains/restaurantAddress/IRestaurantAddressRepository';
import { RestaurantAddress } from '@restaurant/domains/restaurantAddress/RestaurantAddress';
import { IRestaurantOpeningHoursRepository } from '@restaurant/domains/restaurantOpeningHour/IRestaurantOpeningHourRepository';
import {
  RestaurantOpeningHour,
  calculateOpeningDurationMinutes,
} from '@restaurant/domains/restaurantOpeningHour/RestaurantOpeningHour';
import { CreateRestaurantDto } from '@restaurant/dto/CreateRestaurantDto';

@Injectable()
export class CreateRestaurantUseCase {
  constructor(
    private restaurantRepository: IRestaurantRepository,
    private restaurantAddressRepository: IRestaurantAddressRepository,
    private restaurantOpeningHoursRepository: IRestaurantOpeningHoursRepository,
  ) {}

  async execute(restaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    try {
      const restaurant = new Restaurant({
        id: restaurantDto.id,
        name: restaurantDto.name,
        urlImage: restaurantDto.urlImage,
      });

      const newRestaurant = await this.restaurantRepository.create(restaurant);

      const address = new RestaurantAddress({
        street: restaurantDto.address.street,
        streetNumber: restaurantDto.address.streetNumber,
        neighborhood: restaurantDto.address.neighborhood,
        city: restaurantDto.address.city,
        state: restaurantDto.address.state,
        country: restaurantDto.address.country,
        zipCode: restaurantDto.address.zipCode,
        restaurantId: newRestaurant.id,
      });

      const newRestaurantAddress =
        await this.restaurantAddressRepository.create(address);

      restaurant.address = newRestaurantAddress;

      const openingHours = restaurantDto.openingHours.map((openingHour) => {
        validateTimeFormat(openingHour.openingTime);
        validateTimeFormat(openingHour.closingTime);

        const openingDurationMinutes = calculateOpeningDurationMinutes(
          openingHour.openingTime,
          openingHour.closingTime,
        );

        return new RestaurantOpeningHour({
          dayOfWeek: openingHour.dayOfWeek,
          openingTime: openingHour.openingTime,
          openingDurationMinutes: openingDurationMinutes,
          restaurantId: newRestaurant.id,
        });
      });

      const newOpeningHours = await Promise.all(
        openingHours.map((openingHour) =>
          this.restaurantOpeningHoursRepository.create(openingHour),
        ),
      );

      restaurant.openingHours = newOpeningHours;
      return restaurant;
    } catch (error) {
      throw new Error(error);
    }
  }
}
