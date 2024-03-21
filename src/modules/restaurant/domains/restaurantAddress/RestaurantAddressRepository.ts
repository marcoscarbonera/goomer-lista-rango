import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createModelMapper } from 'src/helpers/ModelMapper';
import { IRestaurantAddressRepository } from './IRestaurantAddressRepository';
import { RestaurantAddressModel } from '@database/domains/restaurant/RestaurantAddressModel';
import { RestaurantAddress } from './RestaurantAddress';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RestaurantAddressRepository
  implements IRestaurantAddressRepository
{
  constructor(
    @InjectRepository(RestaurantAddressModel)
    private readonly model: Repository<RestaurantAddressModel>,
  ) {}

  restaurantAddressModelMapper = createModelMapper<
    RestaurantAddressModel,
    RestaurantAddress
  >();

  async create(
    restaurantAddress: RestaurantAddress,
  ): Promise<RestaurantAddress> {
    const restaurantAddressModel =
      this.restaurantAddressModelMapper.domainToModel(restaurantAddress);

    restaurantAddressModel.id = uuidv4();

    await this.model.query(
      `INSERT INTO restaurant_address (id, street, street_number, complement, neighborhood, zip_code, city, state, country, restaurant_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        restaurantAddressModel.id,
        restaurantAddressModel.street,
        restaurantAddressModel.streetNumber,
        restaurantAddressModel.complement,
        restaurantAddressModel.neighborhood,
        restaurantAddressModel.zipCode,
        restaurantAddressModel.city,
        restaurantAddressModel.state,
        restaurantAddressModel.country,
        restaurantAddressModel.restaurantId,
      ],
    );

    const newRestaurantAddress = await this.model.query(
      `SELECT * FROM restaurant_address WHERE id = $1 limit 1`,
      [restaurantAddressModel.id],
    );
    return this.restaurantAddressModelMapper.modelToDomain(
      newRestaurantAddress[0] ?? null,
    );
  }

  async update(
    restaurantAddress: RestaurantAddress,
  ): Promise<RestaurantAddress> {
    const restaurantAddressModel =
      this.restaurantAddressModelMapper.domainToModel(restaurantAddress);

    await this.model.query(
      `UPDATE restaurant_address SET street = $1, street_number = $2, complement = $3, neighborhood = $4, zip_code = $5, city = $6, state = $7, country = $8, restaurant_id = $9 WHERE id = $10`,
      [
        restaurantAddressModel.street,
        restaurantAddressModel.streetNumber,
        restaurantAddressModel.complement,
        restaurantAddressModel.neighborhood,
        restaurantAddressModel.zipCode,
        restaurantAddressModel.city,
        restaurantAddressModel.state,
        restaurantAddressModel.country,
        restaurantAddressModel.restaurantId,
        restaurantAddressModel.id,
      ],
    );

    const newRestaurantAddress = await this.model.query(
      `SELECT * FROM restaurant_address WHERE id = $1 limit 1`,
      [restaurantAddressModel.id],
    );

    return this.restaurantAddressModelMapper.modelToDomain(
      newRestaurantAddress[0] ?? null,
    );
  }

  async delete(id: string): Promise<void> {
    await this.model.query(`DELETE FROM restaurant_address WHERE id = $1`, [
      id,
    ]);
  }

  async findAll(): Promise<RestaurantAddress[]> {
    const restaurantAddresses = await this.model.query(
      `SELECT * FROM restaurant_address`,
    );

    restaurantAddresses.map((restaurantAddress) => {
      return this.restaurantAddressModelMapper.modelToDomain(restaurantAddress);
    });

    return restaurantAddresses;
  }

  async findByRestaurantId(restaurantId: string): Promise<RestaurantAddress> {
    const restaurantAddress = await this.model.query(
      `SELECT * FROM restaurant_address WHERE restaurant_id = $1 limit 1`,
      [restaurantId],
    );

    return this.restaurantAddressModelMapper.modelToDomain(
      restaurantAddress[0] ?? null,
    );
  }

  async deleteByRestaurantId(restauntId: string): Promise<void> {
    await this.model.query(
      `DELETE FROM restaurant_address WHERE restaurant_id = $1`,
      [restauntId],
    );
  }
}
