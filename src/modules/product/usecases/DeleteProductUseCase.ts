import { Injectable } from '@nestjs/common';
import { IProductRepository } from '@product/domains/product/IProductRepository';
import { IProductPromotionRepository } from '@product/domains/productPromotion/IProductPromotionRepository';
import { IProductPromotionHourRepository } from '@product/domains/productPromotionHour/IProductPromotionHourRepository';

@Injectable()
export class DeleteProductUseCase {
  constructor(
    private productRepository: IProductRepository,
    private productPromotionRepository: IProductPromotionRepository,
    private productPromotionHourRepository: IProductPromotionHourRepository,
  ) {}

  async execute(restaurant: string, id: string): Promise<void> {
    try {
      await this.productPromotionHourRepository.deleteByProductId(id);
      await this.productPromotionRepository.deleteByProductId(id);
      await this.productRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
