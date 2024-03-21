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
import { RestaurantModel } from './RestaurantModel';

@Entity('restaurant_address')
export class RestaurantAddressModel {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'restaurant_address_PK',
  })
  id: string;

  @Column({ type: 'varchar', length: 256, name: 'street' })
  street: string;

  @Column({ type: 'int', name: 'street_number' })
  streetNumber: number;

  @Column({ type: 'varchar', length: 128, nullable: true, name: 'complement' })
  complement: string;

  @Column({ type: 'varchar', length: 128, name: 'neighborhood' })
  neighborhood: string;

  @Column({ type: 'varchar', length: 16, name: 'zip_code' })
  zipCode: string;

  @Column({ type: 'varchar', length: 64, name: 'city' })
  city: string;

  @Column({ type: 'varchar', length: 64, name: 'state' })
  state: string;

  @Column({ type: 'varchar', length: 64, name: 'country' })
  country: string;

  @ManyToOne(() => RestaurantModel, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'restaurant_id',
    foreignKeyConstraintName: 'restaurant_address_restaurant_FK',
  })
  @Index('restaurant_address_restaurant_IDX')
  restaurant: RestaurantModel;

  restaurantId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
