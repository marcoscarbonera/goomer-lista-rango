import { Entity } from 'src/helpers/Entity';

export class ProductPromotionHour extends Entity {
  constructor(input: Partial<ProductPromotionHour>) {
    super(input);
  }

  productPromotionId: string;
  dayOfWeek: number;
  openingTime: string;
  openingDurationMinutes: number;
}
