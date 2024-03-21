import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductPromotionModel } from './ProductPromotionModel';

@Entity('product_promotion_hour')
export class ProductPromotionHourModel {
  @PrimaryColumn({
    name: 'product_promotion_id',
    primaryKeyConstraintName: 'product_promotion_hour_PK',
  })
  @Index('product_promotion_hour_product_promotion_IDX')
  @JoinColumn({
    name: 'product_promotion_id',
    foreignKeyConstraintName: 'product_promotion_hour_FK',
  })
  @ManyToOne(() => ProductPromotionModel, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  productPromotion: ProductPromotionModel;

  @PrimaryColumn({
    type: 'int',
    primaryKeyConstraintName: 'product_promotion_hour_PK',
    name: 'day_of_week',
  })
  dayOfWeek: number;

  @Column({ type: 'time', name: 'opening_time' })
  openingTime: string;

  @Column({ type: 'int', name: 'opening_duration_minutes' })
  openingDurationMinutes: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
