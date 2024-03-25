import { ProductPromotionHour } from './ProductPromotionHour';

export abstract class IProductPromotionHourRepository {
  abstract create(
    productPromotion: ProductPromotionHour,
  ): Promise<ProductPromotionHour>;
  abstract update(
    productPromotionHour: ProductPromotionHour,
  ): Promise<ProductPromotionHour>;
  abstract delete(id: string): Promise<void>;
  abstract findByProductPromotionId(
    productPromotionId: string,
  ): Promise<ProductPromotionHour[]>;
  abstract deleteByProductPromotionId(
    productPromotionId: string,
  ): Promise<void>;
  abstract deleteByProductId(productId: string): Promise<void>;
}
