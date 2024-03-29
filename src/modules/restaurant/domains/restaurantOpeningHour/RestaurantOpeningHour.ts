import { Entity } from 'src/helpers/Entity';

export class RestaurantOpeningHour extends Entity {
  constructor(input: Partial<RestaurantOpeningHour>) {
    super(input);
  }

  dayOfWeek: number;
  openingTime: string;
  openingDurationMinutes: number;
  restaurantId: string;
}
