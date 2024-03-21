import { RestaurantOpeningHour } from './RestaurantOpeningHour';

export abstract class IRestaurantOpeningHoursRepository {
  abstract create(
    restaurantOpeningHours: RestaurantOpeningHour,
  ): Promise<RestaurantOpeningHour>;
  abstract update(
    restaurantOpeningHours: RestaurantOpeningHour,
  ): Promise<RestaurantOpeningHour>;
  abstract delete(id: string): Promise<void>;
  abstract findAll(): Promise<RestaurantOpeningHour[]>;
  abstract findById(
    restaurantId: string,
    dayOfWeek: number,
  ): Promise<RestaurantOpeningHour>;

  abstract findByRestaurantId(
    restauntId: string,
  ): Promise<RestaurantOpeningHour[]>;

  abstract deleteByRestaurantId(restauntId: string): Promise<void>;
}
