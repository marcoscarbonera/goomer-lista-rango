import { Repository } from 'typeorm';
import { createModelMapper } from 'src/helpers/ModelMapper';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from './ProductCategory';
import { ProductCategoryModel } from '@database/domains/product/ProductCategoryModel';
import { IProductCategoryRepository } from './IProductCategoryRepository';

@Injectable()
export class ProductCategoryRepository implements IProductCategoryRepository {
  constructor(
    @InjectRepository(ProductCategoryModel)
    private model: Repository<ProductCategoryModel>,
  ) {}

  productCategoryModelMapper = createModelMapper<
    ProductCategoryModel,
    ProductCategory
  >();

  async findById(id: string): Promise<ProductCategory> {
    const productCategory = await this.model.query(
      `SELECT * FROM product_category WHERE id = $1 limit 1`,
      [id],
    );

    return this.productCategoryModelMapper.modelToDomain(
      productCategory[0] ?? null,
    );
  }
}
