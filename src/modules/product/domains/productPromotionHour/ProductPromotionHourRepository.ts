import { Repository } from 'typeorm';
import { createModelMapper } from 'src/helpers/ModelMapper';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductModel } from '@database/domains/product/ProductModel';
import { IProductPromotionHourRepository } from './IProductPromotionHourRepository';
import { ProductPromotionHour } from './ProductPromotionHour';
import { ProductPromotionHourModel } from '@database/domains/product/ProductPromotionHourModel';

@Injectable()
export class ProductPromotionHourRepository
  implements IProductPromotionHourRepository
{
  constructor(
    @InjectRepository(ProductModel)
    private model: Repository<ProductModel>,
  ) {}

  productPromotionHourModelMapper = createModelMapper<
    ProductPromotionHourModel,
    ProductPromotionHour
  >();

  async create(
    productPromotionHour: ProductPromotionHour,
  ): Promise<ProductPromotionHour> {
    const productPromotionHourModel =
      this.productPromotionHourModelMapper.domainToModel(productPromotionHour);

    await this.model.query(
      `INSERT INTO product_promotion_hour (product_promotion_id, day_of_week, opening_time, opening_duration_minutes) VALUES ($1, $2, $3, $4)`,
      [
        productPromotionHourModel.productPromotionId,
        productPromotionHourModel.dayOfWeek,
        productPromotionHourModel.openingTime,
        productPromotionHourModel.openingDurationMinutes,
      ],
    );

    const newProductPromotionHour = await this.model.query(
      `SELECT * FROM product_promotion_hour WHERE product_promotion_id = $1 limit 1`,
      [productPromotionHourModel.productPromotionId],
    );

    return this.productPromotionHourModelMapper.modelToDomain(
      newProductPromotionHour[0] ?? null,
    );
  }

  async update(
    productPromotionHour: ProductPromotionHour,
  ): Promise<ProductPromotionHour> {
    const productPromotionHourModel =
      this.productPromotionHourModelMapper.domainToModel(productPromotionHour);

    await this.model.query(
      `UPDATE product_promotion_hour SET day_of_week = $1, opening_time = $2, opening_duration_minutes = $3 WHERE product_promotion_id = $4`,
      [
        productPromotionHourModel.dayOfWeek,
        productPromotionHourModel.openingTime,
        productPromotionHourModel.openingDurationMinutes,
        productPromotionHourModel.productPromotionId,
      ],
    );

    return productPromotionHour;
  }

  async delete(id: string): Promise<void> {
    await this.model.query(
      `DELETE FROM product_promotion_hour WHERE product_promotion_id = $1`,
      [id],
    );
  }

  async findByProductPromotionId(
    productPromotionId: string,
  ): Promise<ProductPromotionHour[]> {
    const productPromotionHours = await this.model.query(
      `SELECT * FROM product_promotion_hour WHERE product_promotion_id = $1`,
      [productPromotionId],
    );

    return productPromotionHours.map((productPromotionHour) =>
      this.productPromotionHourModelMapper.modelToDomain(productPromotionHour),
    );
  }

  async deleteByProductPromotionId(productPromotionId: string): Promise<void> {
    await this.model.query(
      `DELETE FROM product_promotion_hour WHERE product_promotion_id = $1`,
      [productPromotionId],
    );
  }

  async findById(id: string): Promise<ProductPromotionHour> {
    const productPromotionHour = await this.model.query(
      `SELECT * FROM product_promotion_hour WHERE product_promotion_id = $1 limit 1`,
      [id],
    );

    return this.productPromotionHourModelMapper.modelToDomain(
      productPromotionHour[0] ?? null,
    );
  }

  async deleteByProductId(productId: string): Promise<void> {
    const productPromotion = await this.model.query(
      // delete product promotion hours by product id with join
      `DELETE FROM product_promotion_hour 
          WHERE product_promotion_id IN (SELECT id FROM product_promotion WHERE product_id = $1)`,
      [productId],
    );
  }
}
