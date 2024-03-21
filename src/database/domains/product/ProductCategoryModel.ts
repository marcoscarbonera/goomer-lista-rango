import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product_category')
export class ProductCategoryModel {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'product_category_PK',
  })
  id: string;

  @Column({ length: 255, name: 'name' })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
