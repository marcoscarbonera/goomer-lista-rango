import { Restaurant } from './Restaurant';

export abstract class IRestaurantRepository {
  abstract create(restaurant: Restaurant): Promise<Restaurant>;
  abstract update(restaurant: Restaurant): Promise<Restaurant>;
  abstract delete(id: string): Promise<void>;
  abstract findAll(): Promise<Restaurant[]>;
  abstract findById(id: string): Promise<Restaurant>;
}
