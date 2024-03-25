import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductRepository } from './ProductRepository';
import { ProductModel } from '@database/domains/product/ProductModel';
import { Product } from './Product';
import { v4 as uuidv4 } from 'uuid';

describe('ProductRepository', () => {
  let productRepository: ProductRepository;
  let productModelRepository: Repository<ProductModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductRepository,
        {
          provide: getRepositoryToken(ProductModel),
          useClass: Repository,
        },
      ],
    }).compile();

    productRepository = module.get<ProductRepository>(ProductRepository);
    productModelRepository = module.get<Repository<ProductModel>>(
      getRepositoryToken(ProductModel),
    );
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const id = uuidv4();

      const product: Product = {
        id,
        name: 'Product 1',
        price: 10.99,
        urlImage: 'https://example.com/image.jpg',
        productCategoryId: 'category1',
        restaurantId: 'restaurant1',
      };

      const querySpy = jest.spyOn(productModelRepository, 'query');
      querySpy.mockResolvedValueOnce(
        [],
      ); 

      querySpy.mockResolvedValueOnce([{ 
        name: product.name,
        price: product.price,
        url_image: product.urlImage,
        product_category_id: product.productCategoryId,
        restaurant_id: product.restaurantId,
      }]); // Mock the select query

      // Act
      const result = await productRepository.create(product);

      const resultProduct = {
        name: product.name,
        price: product.price,
        url_image: product.urlImage,
        product_category_id: product.productCategoryId,
        restaurant_id: product.restaurantId
      };

      // Assert
      expect(querySpy).toHaveBeenCalledTimes(2);
      expect(querySpy).toHaveBeenNthCalledWith(
        1,
        `INSERT INTO product (id, name, price, url_image, product_category_id, restaurant_id) VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          product.id,
          product.name,
          product.price,
          product.urlImage,
          product.productCategoryId,
          product.restaurantId,
        ],
      );
      expect(querySpy).toHaveBeenNthCalledWith(
        2,
        `SELECT * FROM product WHERE id = $1 limit 1`,
        [product.id],
      );

      console.log(product, result);

      expect(result).toEqual(resultProduct);
    });
  });

  describe('update', () => {
    it('should update an existing product', async () => {
      // TODO: Write test case for the update method
    });
  });

  describe('delete', () => {
    it('should delete a product', async () => {
      // TODO: Write test case for the delete method
    });
  });

  describe('findById', () => {
    it('should find a product by ID', async () => {
      // TODO: Write test case for the findById method
    });
  });

  describe('findAllByRestaurantId', () => {
    it('should find all products by restaurant ID', async () => {
      // TODO: Write test case for the findAllByRestaurantId method
    });
  });
});