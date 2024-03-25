import { Entity } from 'src/helpers/Entity';

export class ProductPromotionHour extends Entity {
  constructor(input: Partial<ProductPromotionHour>) {
    super(input);
  }

  id: string;
  description: string;
  price: number;

  productId: string;
}
