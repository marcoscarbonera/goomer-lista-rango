import { Entity } from 'src/helpers/Entity';

export class RestaurantAddress extends Entity {
  constructor(input: Partial<RestaurantAddress>) {
    super(input);
  }

  id: string;
  street: string;
  streetNumber: number;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  complement: string;
  neighborhood: string;
  restaurantId: string;
}
