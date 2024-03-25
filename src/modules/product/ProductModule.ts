import { Module } from '@nestjs/common';
import { ProductController } from './controllers/ProductController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModel } from '@database/domains/product/ProductModel';
import { ProductCategoryModel } from '@database/domains/product/ProductCategoryModel';
import { ProductPromotionModel } from '@database/domains/product/ProductPromotionModel';
import { ProductPromotionHourModel } from '@database/domains/product/ProductPromotionHourModel';
import { IProductRepository } from './domains/product/IProductRepository';
import { ProductRepository } from './domains/product/ProductRepository';
import { CreateProductUseCase } from './usecases/CreateProductUseCase';
import { IProductPromotionRepository } from './domains/productPromotion/IProductPromotionRepository';
import { ProductPromotionRepository } from './domains/productPromotion/ProductPromotionRepository';
import { IProductPromotionHourRepository } from './domains/productPromotionHour/IProductPromotionHourRepository';
import { ProductPromotionHourRepository } from './domains/productPromotionHour/ProductPromotionHourRepository';
import { UpdateProductUseCase } from './usecases/UpdateProductUseCase';
import { DeleteProductUseCase } from './usecases/DeleteProductUseCase';
import { FindAllProductsUseCase } from './usecases/FindAllProductsUseCase';

@Module({
  imports: [
        TypeOrmModule.forFeature([
      ProductModel,
      ProductCategoryModel,
      ProductPromotionModel,
      ProductPromotionHourModel,
    ]),
  ],
  controllers: [ProductController],
  providers: [
    { provide: IProductRepository, useClass: ProductRepository },
    {
      provide: IProductPromotionRepository,
      useClass: ProductPromotionRepository,
    },
    {
      provide: IProductPromotionHourRepository,
      useClass: ProductPromotionHourRepository,
    },
    CreateProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    FindAllProductsUseCase,
  ],
})
export class ProductModule {}
