import { Product } from './Product';

export abstract class IProductRepository {
  abstract create(product: Product): Promise<Product>;
  abstract update(product: Product): Promise<Product>;
  abstract findById(id: string): Promise<Product>;
  abstract findAllByRestaurantId(restauntId: string): Promise<Product[]>;
  abstract delete(id: string): Promise<void>;
}
