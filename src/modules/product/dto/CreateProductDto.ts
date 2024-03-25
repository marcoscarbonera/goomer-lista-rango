export class CreateProductDto {
  id: string;
  name: string;
  urlImage: string;
  price: number;
  productCategoryId: string;
  restaurantId: string;
  productPromotion?: ProductPromotion;
}

export class ProductPromotion {
  description: string;
  price: number;
  promotionHours: ProductPromotionHour[];
}

export class ProductPromotionHour {
  dayOfWeek: number;
  openingTime: string;
  closingTime: string;
  openingDurationMinutes: number;
}
