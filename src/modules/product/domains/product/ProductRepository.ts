import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { IProductRepository } from './IProductRepository';
import { Product } from './Product';
import { ProductModel } from '@database/domains/product/ProductModel';
import { createModelMapper } from '@helpers/ModelMapper';


@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductModel)
    private model: Repository<ProductModel>,
  ) {}

  productModelMapper = createModelMapper<ProductModel, Product>();

  async create(product: Product): Promise<Product> {
    const productModel = this.productModelMapper.domainToModel(product);

    productModel.id = uuidv4();
    await this.model.query(
      `INSERT INTO product (id, name, price, url_image, product_category_id, restaurant_id) VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        productModel.id,
        productModel.name,
        productModel.price,
        productModel.urlImage,
        productModel.productCategoryId,
        productModel.restaurantId,
      ],
    );

    const newProduct = await this.model.query(
      `SELECT * FROM product WHERE id = $1 limit 1`,
      [productModel.id],
    );

    return this.productModelMapper.modelToDomain(newProduct[0] ?? null);
  }

  async update(product: Product): Promise<Product> {
    const productModel = this.productModelMapper.domainToModel(product);

    await this.model.query(
      `UPDATE product SET name = $1, price = $2, product_category_id = $3, url_image = $4 WHERE id = $5 AND restaurant_id = $6`,
      [
        productModel.name,
        productModel.price,
        productModel.productCategoryId,
        productModel.urlImage,
        productModel.id,
        productModel.restaurantId,
      ],
    );

    const newProduct = await this.model.query(
      `SELECT * FROM product WHERE id = $1 limit 1`,
      [productModel.id],
    );

    return this.productModelMapper.modelToDomain(newProduct[0] ?? null);
  }

  async delete(id: string): Promise<void> {
    await this.model.query(`DELETE FROM product WHERE id = $1`, [id]);
  }

  async findById(id: string): Promise<Product> {
    const product = await this.model.query(
      `SELECT * FROM product WHERE id = $1 limit 1`,
      [id],
    );

    return this.productModelMapper.modelToDomain(product[0] ?? null);
  }

  async findAllByRestaurantId(restaurantId: string): Promise<Product[]> {
    const products = await this.model.query(
      `SELECT * FROM product WHERE restaurant_id = $1`,
      [restaurantId],
    );

    return products.map((product) => {
      return this.productModelMapper.modelToDomain(product);
    });
  }
}
