import {
  POSTGRES_CONNECTION_LIMIT,
  POSTGRES_CONNECTION_TIMEOUT,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from '@config/environment';
import { ProductCategoryModel } from '@database/domains/product/ProductCategoryModel';
import { ProductModel } from '@database/domains/product/ProductModel';
import { ProductPromotionHourModel } from '@database/domains/product/ProductPromotionHourModel';
import { ProductPromotionModel } from '@database/domains/product/ProductPromotionModel';
import { RestaurantAddressModel } from '@database/domains/restaurant/RestaurantAddressModel';
import { RestaurantModel } from '@database/domains/restaurant/RestaurantModel';
import { RestaurantOpeningHourModel } from '@database/domains/restaurant/RestaurantOpeningHourModel';

/**
 * Database configuration.
 */
export const TypeOrmConfig = {
  type: 'postgres',
  synchronize: false,
  migrationsRun: false,
  extra: {
    connectionLimit: POSTGRES_CONNECTION_LIMIT,
  },
  logging: false,
  autoLoadEntities: true,
  emitDecoratorMetadata: true,
  experimentalDecorators: true,
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  connectionLimit: POSTGRES_CONNECTION_LIMIT,
  connectionTimeout: POSTGRES_CONNECTION_TIMEOUT,
  database: POSTGRES_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  entities: [
    RestaurantModel,
    RestaurantAddressModel,
    RestaurantOpeningHourModel,
    ProductModel,
    ProductCategoryModel,
    ProductPromotionModel,
    ProductPromotionHourModel,
  ],
};
