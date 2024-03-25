import { validateTimeFormat } from '@core/helpers/validateTimeFormat';
import { Injectable } from '@nestjs/common';
import { IProductRepository } from '@product/domains/product/IProductRepository';
import { Product } from '@product/domains/product/Product';
import { IProductPromotionRepository } from '@product/domains/productPromotion/IProductPromotionRepository';
import { ProductPromotion } from '@product/domains/productPromotion/ProductPromotion';
import { IProductPromotionHourRepository } from '@product/domains/productPromotionHour/IProductPromotionHourRepository';
import { ProductPromotionHour } from '@product/domains/productPromotionHour/ProductPromotionHour';
import { CreateProductDto } from '@product/dto/CreateProductDto';
import { calculateDurationMinutes } from 'src/helpers/TimerValidation';

@Injectable()
export class CreateProductUseCase {
  constructor(
    private productRepository: IProductRepository,
    private productPromotionRepository: IProductPromotionRepository,
    private productPromotionHourRepository: IProductPromotionHourRepository,
  ) {}

  async execute(
    restaurantId: string,
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    try {
      const product = new Product({
        id: createProductDto.id,
        name: createProductDto.name,
        urlImage: createProductDto.urlImage,
        price: createProductDto.price,
        productCategoryId: createProductDto.productCategoryId,
        restaurantId,
      });

      const newProduct = await this.productRepository.create(product);

      if (!createProductDto.productPromotion) {
        return newProduct;
      }

      const productPromotion = new ProductPromotion({
        description: createProductDto.productPromotion.description,
        price: createProductDto.productPromotion.price,
        productId: newProduct.id,
      });

      const newProductPromotion =
        await this.productPromotionRepository.create(productPromotion);

      newProduct.productPromotion = newProductPromotion;

      const productPromotionHours =
        createProductDto.productPromotion.promotionHours.map(
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
          this.productPromotionHourRepository.create(promotionHour),
        ),
      );

      newProduct.productPromotion.promotionHours = newProductPromotionHours;

      return newProduct;
    } catch (error) {
      throw new Error(error);
    }
  }
}
