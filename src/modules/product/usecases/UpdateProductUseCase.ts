import { validateTimeFormat } from '@core/helpers/validateTimeFormat';
import { Injectable } from '@nestjs/common';
import { IProductRepository } from '@product/domains/product/IProductRepository';
import { Product } from '@product/domains/product/Product';
import { IProductPromotionRepository } from '@product/domains/productPromotion/IProductPromotionRepository';
import { ProductPromotion } from '@product/domains/productPromotion/ProductPromotion';
import { IProductPromotionHourRepository } from '@product/domains/productPromotionHour/IProductPromotionHourRepository';
import { ProductPromotionHour } from '@product/domains/productPromotionHour/ProductPromotionHour';
import { UpdateProductDto } from '@product/dto/UpdateProductDto';
import { calculateDurationMinutes } from 'src/helpers/TimerValidation';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    private productRepository: IProductRepository,
    private productPromotionRepository: IProductPromotionRepository,
    private productPromotionHourRepository: IProductPromotionHourRepository,
  ) {}

  async execute(
    restaurantId: string,
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      const product = new Product({
        id: id,
        name: updateProductDto.name,
        urlImage: updateProductDto.urlImage,
        price: updateProductDto.price,
        productCategoryId: updateProductDto.productCategoryId,
        restaurantId,
      });

      const newProduct = await this.productRepository.update(product);

      if (!updateProductDto.productPromotion) {
        return newProduct;
      }

      const productPromotion = new ProductPromotion({
        description: updateProductDto.productPromotion.description,
        price: updateProductDto.productPromotion.price,
        productId: newProduct.id,
      });

      const newProductPromotion =
        await this.productPromotionRepository.update(productPromotion);

      newProduct.productPromotion = newProductPromotion;

      const productPromotionHours =
        updateProductDto.productPromotion.promotionHours.map(
          (promotionHour) => {
            validateTimeFormat(promotionHour.openingTime);
            validateTimeFormat(promotionHour.closingTime);
            const openingDurationMinutes = calculateDurationMinutes(
              promotionHour.openingTime,
              promotionHour.closingTime,
            );

            return new ProductPromotionHour({
              dayOfWeek: promotionHour.dayOfWeek,
              openingTime: promotionHour.openingTime,
              openingDurationMinutes: openingDurationMinutes,
              productPromotionId: newProductPromotion.id,
            });
          },
        );

      const newProductPromotionHours = await Promise.all(
        productPromotionHours.map((promotionHour) =>
          this.productPromotionHourRepository.update(promotionHour),
        ),
      );

      newProduct.productPromotion.promotionHours = newProductPromotionHours;

      return newProduct;
    } catch (error) {
      throw new Error(error);
    }
  }
}
