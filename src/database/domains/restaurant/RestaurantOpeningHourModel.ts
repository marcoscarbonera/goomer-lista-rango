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
import { RestaurantModel } from './RestaurantModel';

@Entity('restaurant_opening_hour')
export class RestaurantOpeningHourModel {
  @PrimaryColumn({
    name: 'restaurant_id',
    primaryKeyConstraintName: 'restaurant_opening_hour_PK',
  })
  @Index('restaurant_opening_hour_restaurant_IDX')
  @JoinColumn({
    name: 'restaurant_id',
    foreignKeyConstraintName: 'restaurant_opening_hour_restaurant_FK',
  })
  @ManyToOne(() => RestaurantModel, { nullable: false, onDelete: 'CASCADE' })
  restaurant: RestaurantModel;
  restaurantId: string;

  @PrimaryColumn({
    type: 'int',
    primaryKeyConstraintName: 'restaurant_opening_hour_PK',
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
