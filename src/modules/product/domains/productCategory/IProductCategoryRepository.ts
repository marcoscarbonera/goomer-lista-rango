import { ProductCategory } from './ProductCategory';

export abstract class IProductCategoryRepository {
  abstract findById(id: string): Promise<ProductCategory>;
}
