import { Entity } from 'src/helpers/Entity';
import { ProductPromotionHour } from '../productPromotionHour/ProductPromotionHour';

export class ProductPromotion extends Entity {
  constructor(input: Partial<ProductPromotion>) {
    super(input);
  }

  id: string;
  description: string;
  price: number;

  productId: string;

  promotionHours: ProductPromotionHour[];
}
