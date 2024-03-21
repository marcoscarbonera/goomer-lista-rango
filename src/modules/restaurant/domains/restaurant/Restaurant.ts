import { Entity } from 'src/helpers/Entity';
import { RestaurantAddress } from '../restaurantAddress/RestaurantAddress';
import { RestaurantOpeningHour } from '../restaurantOpeningHour/RestaurantOpeningHour';

export class Restaurant extends Entity {
  constructor(input: Partial<Restaurant>) {
    super(input);
  }

  id: string;
  name: string;
  urlImage: string;

  address: RestaurantAddress;

  openingHours: RestaurantOpeningHour[];
}
