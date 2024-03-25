import { ProductPromotion } from './ProductPromotion';

export abstract class IProductPromotionRepository {
  abstract create(
    productPromotion: ProductPromotion,
  ): Promise<ProductPromotion>;
  abstract update(
    productPromotion: ProductPromotion,
  ): Promise<ProductPromotion>;
  abstract delete(id: string): Promise<void>;
  abstract findByProductId(productId: string): Promise<ProductPromotion>;
  abstract findById(id: string): Promise<ProductPromotion>;
  abstract deleteByProductId(productId: string): Promise<void>;
}
