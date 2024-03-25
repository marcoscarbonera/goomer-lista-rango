import { Repository } from 'typeorm';
import { createModelMapper } from 'src/helpers/ModelMapper';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductModel } from '@database/domains/product/ProductModel';
import { IProductPromotionRepository } from './IProductPromotionRepository';
import { ProductPromotionModel } from '@database/domains/product/ProductPromotionModel';
import { ProductPromotion } from './ProductPromotion';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductPromotionRepository implements IProductPromotionRepository {
  constructor(
    @InjectRepository(ProductModel)
    private model: Repository<ProductModel>,
  ) {}

  producPromotiontModelMapper = createModelMapper<
    ProductPromotionModel,
    ProductPromotion
  >();

  async create(productPromotion: ProductPromotion): Promise<ProductPromotion> {
    const productPromotionModel =
      this.producPromotiontModelMapper.domainToModel(productPromotion);

    productPromotionModel.id = uuidv4();

    await this.model.query(
      `INSERT INTO product_promotion (id, product_id, description, price) VALUES ($1, $2, $3, $4)`,
      [
        productPromotionModel.id,
        productPromotionModel.productId,
        productPromotionModel.description,
        productPromotionModel.price,
      ],
    );

    const newProductPromotion = await this.model.query(
      `SELECT * FROM product_promotion WHERE id = $1 limit 1`,
      [productPromotionModel.id],
    );

    return this.producPromotiontModelMapper.modelToDomain(
      newProductPromotion[0] ?? null,
    );
  }

  async update(productPromotion: ProductPromotion): Promise<ProductPromotion> {
    const productPromotionModel =
      this.producPromotiontModelMapper.domainToModel(productPromotion);

    await this.model.query(
      `UPDATE product_promotion SET description = $1, price = $2 WHERE id = $3`,
      [
        productPromotionModel.description,
        productPromotionModel.price,
        productPromotionModel.id,
      ],
    );

    const newProductPromotion = await this.model.query(
      `SELECT * FROM product_promotion WHERE id = $1 limit 1`,
      [productPromotionModel.id],
    );

    return this.producPromotiontModelMapper.modelToDomain(
      newProductPromotion[0] ?? null,
    );
  }

  async delete(id: string): Promise<void> {
    await this.model.query(`DELETE FROM product_promotion WHERE id = $1`, [id]);
  }

  async findByProductId(productId: string): Promise<ProductPromotion> {
    const productPromotions = await this.model.query(
      `SELECT * FROM product_promotion WHERE product_id = $1 limit 1`,
      [productId],
    );

    return this.producPromotiontModelMapper.modelToDomain(
      productPromotions[0] ?? null,
    );
  }

  async findById(id: string): Promise<ProductPromotion> {
    const productPromotion = await this.model.query(
      `SELECT * FROM product_promotion WHERE id = $1 limit 1`,
      [id],
    );

    return this.producPromotiontModelMapper.modelToDomain(
      productPromotion[0] ?? null,
    );
  }

  async findAll(): Promise<ProductPromotion[]> {
    const productPromotions = await this.model.query(
      `SELECT * FROM product_promotion`,
    );

    return productPromotions.map((productPromotion) =>
      this.producPromotiontModelMapper.modelToDomain(productPromotion),
    );
  }

  async deleteByProductId(productId: string): Promise<void> {
    await this.model.query(
      `DELETE FROM product_promotion WHERE product_id = $1`,
      [productId],
    );
  }
}
