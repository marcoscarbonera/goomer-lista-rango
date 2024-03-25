import { Injectable } from '@nestjs/common';
import { IProductRepository } from '@product/domains/product/IProductRepository';
import { Product } from '@product/domains/product/Product';
import { IProductPromotionRepository } from '@product/domains/productPromotion/IProductPromotionRepository';
import { IProductPromotionHourRepository } from '@product/domains/productPromotionHour/IProductPromotionHourRepository';

@Injectable()
export class FindAllProductsUseCase {
  constructor(
    private productRepository: IProductRepository,
    private productPromotionRepository: IProductPromotionRepository,
    private productPromotionHourRepository: IProductPromotionHourRepository,
  ) {}

  async execute(restaurantId: string): Promise<Product[]> {
    try {
      const products =
        await this.productRepository.findAllByRestaurantId(restaurantId);

      if (!products) {
        return null;
      }

      for (const product of products) {
        product.productPromotion =
          await this.productPromotionRepository.findByProductId(product.id);

        if (!product.productPromotion) {
          continue;
        }

        product.productPromotion.promotionHours =
          await this.productPromotionHourRepository.findByProductPromotionId(
            product.productPromotion.id,
          );
      }

      return products;
    } catch (error) {
      throw error;
    }
  }
}
