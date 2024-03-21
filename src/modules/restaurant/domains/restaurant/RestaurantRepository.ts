import { Repository } from 'typeorm';
import { Restaurant } from 'src/modules/restaurant/domains/restaurant/Restaurant';
import { createModelMapper } from 'src/helpers/ModelMapper';
import { RestaurantModel } from '@database/domains/restaurant/RestaurantModel';
import { IRestaurantRepository } from './IRestaurantRepository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { DeepPartial } from 'typeorm';

@Injectable()
export class RestaurantRepository implements IRestaurantRepository {
  constructor(
    @InjectRepository(RestaurantModel)
    private model: Repository<RestaurantModel>,
  ) {}

  restaurantModelMapper = createModelMapper<RestaurantModel, Restaurant>();

  async create(restaurant: Restaurant): Promise<Restaurant> {
    const restaurantModel =
      this.restaurantModelMapper.domainToModel(restaurant);

    restaurantModel.id = uuidv4();
    await this.model.query(
      `INSERT INTO restaurant (id, name, url_image) VALUES ($1, $2, $3)`,
      [restaurantModel.id, restaurantModel.name, restaurantModel.urlImage],
    );

    const newRestaurant = await this.model.query(
      `SELECT * FROM restaurant WHERE id = $1 limit 1`,
      [restaurantModel.id],
    );

    return this.restaurantModelMapper.modelToDomain(newRestaurant[0] ?? null);
  }

  async update(restaurant: Restaurant): Promise<Restaurant> {
    const restaurantModel =
      this.restaurantModelMapper.domainToModel(restaurant);

    await this.model.query(
      `UPDATE restaurant SET name = $1, url_image = $2 WHERE id = $3`,
      [restaurantModel.name, restaurantModel.urlImage, restaurantModel.id],
    );

    const newRestaurant = await this.model.query(
      `SELECT * FROM restaurant WHERE id = $1 limit 1`,
      [restaurantModel.id],
    );

    return this.restaurantModelMapper.modelToDomain(newRestaurant[0] ?? null);
  }

  async delete(id: string): Promise<void> {
    await this.model.query(`DELETE FROM restaurant WHERE id = $1`, [id]);
  }

  async findAll(): Promise<Restaurant[]> {
    const restaurants = await this.model.query(`SELECT * FROM restaurant`);

    restaurants.map((restaurant) => {
      return this.restaurantModelMapper.modelToDomain(restaurant);
    });

    return restaurants;
  }

  async findById(id: string): Promise<Restaurant> {
    const restaurant = await this.model.query(
      `SELECT * FROM restaurant WHERE id = $1 limit 1`,
      [id],
    );

    return this.restaurantModelMapper.modelToDomain(restaurant[0] ?? null);
  }
}
