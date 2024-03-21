import { RestaurantAddress } from './RestaurantAddress';

export abstract class IRestaurantAddressRepository {
  abstract create(
    restaurantAddress: RestaurantAddress,
  ): Promise<RestaurantAddress>;
  abstract update(
    restaurantAddress: RestaurantAddress,
  ): Promise<RestaurantAddress>;
  abstract delete(id: string): Promise<void>;
  abstract findAll(): Promise<RestaurantAddress[]>;
  abstract findByRestaurantId(restauntId: string): Promise<RestaurantAddress>;
  abstract deleteByRestaurantId(restauntId: string): Promise<void>;
}
