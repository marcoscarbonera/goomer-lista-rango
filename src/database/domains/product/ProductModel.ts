import { AsNumber } from 'src/helpers/AsNumbers';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductCategoryModel } from './ProductCategoryModel';

@Entity('product')
export class ProductModel {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'product_PK',
  })
  id: string;

  @Column({ length: 255, name: 'name' })
  name: string;

  @Column({ name: 'url_image' })
  urlImage: string;

  @Column({
    name: 'price',
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: new AsNumber(),
  })
  price: number;

  @ManyToOne(() => ProductCategoryModel, {
    nullable: false,
  })
  @JoinColumn({
    name: 'product_category_id',
    foreignKeyConstraintName: 'product_category_FK',
  })
  @Index('product_product_category_IDX')
  productCategory: ProductCategoryModel;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
