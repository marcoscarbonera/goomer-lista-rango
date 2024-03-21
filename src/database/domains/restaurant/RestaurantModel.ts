import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('restaurant')
export class RestaurantModel {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'restaurant_PK',
  })
  id: string;

  @Column({ length: 255, name: 'name' })
  name: string;

  @Column({ name: 'url_image' })
  urlImage: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
