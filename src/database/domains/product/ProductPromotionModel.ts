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
import { ProductModel } from './ProductModel';

@Entity('product_promotion')
export class ProductPromotionModel {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'product_promotion_PK',
  })
  id: string;

  @ManyToOne(() => ProductModel, {
    nullable: false,
  })
  @JoinColumn({
    name: 'product_id',
    foreignKeyConstraintName: 'product_promotion_product_FK',
  })
  @Index('product_promotion_product_IDX')
  product: ProductModel;

  productId: string;

  @Column({ type: 'text', name: 'description' })
  description: string;

  @Column({
    name: 'price',
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: new AsNumber(),
  })
  price: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
