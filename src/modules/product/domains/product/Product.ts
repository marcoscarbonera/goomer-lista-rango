import { Entity } from 'src/helpers/Entity';
import { ProductPromotion } from '../productPromotion/ProductPromotion';

export class Product extends Entity {
  constructor(input: Partial<Product>) {
    super(input);
  }

  id: string;
  name: string;
  urlImage: string;
  price: number;
  restaurantId: string;

  productCategoryId: string;

  productPromotion?: ProductPromotion;
}
