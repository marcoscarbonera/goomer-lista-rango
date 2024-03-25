import { validateTimeFormat } from '@core/helpers/validateTimeFormat';
import { Injectable } from '@nestjs/common';
import { IRestaurantRepository } from '@restaurant/domains/restaurant/IRestaurantRepository';
import { Restaurant } from '@restaurant/domains/restaurant/Restaurant';
import { IRestaurantAddressRepository } from '@restaurant/domains/restaurantAddress/IRestaurantAddressRepository';
import { RestaurantAddress } from '@restaurant/domains/restaurantAddress/RestaurantAddress';
import { IRestaurantOpeningHoursRepository } from '@restaurant/domains/restaurantOpeningHour/IRestaurantOpeningHourRepository';
import { RestaurantOpeningHour } from '@restaurant/domains/restaurantOpeningHour/RestaurantOpeningHour';
import { UpdateRestaurantDto } from '@restaurant/dto/UpdateRestaurantDto';
import { calculateDurationMinutes } from 'src/helpers/TimerValidation';

@Injectable()
export class UpdateRestaurantUseCase {
  constructor(
    private restaurantRepository: IRestaurantRepository,
    private restaurantAddressRepository: IRestaurantAddressRepository,
    private restaurantOpeningHoursRepository: IRestaurantOpeningHoursRepository,
  ) {}

  async execute(
    id: string,
    restaurantDto: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    const restaurant = new Restaurant({
      id,
      name: restaurantDto.name,
      urlImage: restaurantDto.urlImage,
    });

    const updatedRestaurant =
      await this.restaurantRepository.update(restaurant);

    const address = new RestaurantAddress({
      street: restaurantDto.address.street,
      streetNumber: restaurantDto.address.streetNumber,
      neighborhood: restaurantDto.address.neighborhood,
      city: restaurantDto.address.city,
      state: restaurantDto.address.state,
      country: restaurantDto.address.country,
      zipCode: restaurantDto.address.zipCode,
      restaurantId: id,
    });

    const updatedRestaurantAddress =
      await this.restaurantAddressRepository.update(address);

    updatedRestaurant.address = updatedRestaurantAddress;

    const openingHours = restaurantDto.openingHours.map((openingHour) => {
      validateTimeFormat(openingHour.openingTime);
      validateTimeFormat(openingHour.closingTime);

      const openingDurationMinutes = calculateDurationMinutes(
        openingHour.openingTime,
        openingHour.closingTime,
      );

      return new RestaurantOpeningHour({
        dayOfWeek: openingHour.dayOfWeek,
        openingTime: openingHour.openingTime,
        openingDurationMinutes: openingDurationMinutes,
        restaurantId: id,
      });
    });

    const updatedOpeningHours = await Promise.all(
      openingHours.map((openingHour) => {
        return this.restaurantOpeningHoursRepository.update(openingHour);
      }),
    );

    updatedRestaurant.openingHours = updatedOpeningHours;

    return updatedRestaurant;
  }
}
