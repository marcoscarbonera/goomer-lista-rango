import { Entity } from 'src/helpers/Entity';

export class ProductCategory extends Entity {
  constructor(input: Partial<ProductCategory>) {
    super(input);
  }

  name: string;
}
