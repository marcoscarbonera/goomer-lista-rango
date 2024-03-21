import { AsNumber } from 'src/helpers/AsNumbers';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product_promotion')
export class ProductPromotionModel {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'product_promotion_PK',
  })
  id: string;

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
