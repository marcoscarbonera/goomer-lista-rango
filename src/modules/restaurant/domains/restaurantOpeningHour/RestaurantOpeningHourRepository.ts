import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createModelMapper } from 'src/helpers/ModelMapper';
import { IRestaurantOpeningHoursRepository } from './IRestaurantOpeningHourRepository';
import { RestaurantOpeningHourModel } from '@database/domains/restaurant/RestaurantOpeningHourModel';
import { RestaurantOpeningHour } from './RestaurantOpeningHour';

@Injectable()
export class RestaurantOpeningHourRepository
  implements IRestaurantOpeningHoursRepository
{
  constructor(
    @InjectRepository(RestaurantOpeningHourModel)
    private readonly model: Repository<RestaurantOpeningHourModel>,
  ) {}

  restaurantOpeningHourModelMapper = createModelMapper<
    RestaurantOpeningHourModel,
    RestaurantOpeningHour
  >();

  async create(
    restaurantOpeningHour: RestaurantOpeningHour,
  ): Promise<RestaurantOpeningHour> {
    //create insert with query
    const restaurantOpeningHourModel =
      this.restaurantOpeningHourModelMapper.domainToModel(
        restaurantOpeningHour,
      );

    await this.model.query(
      `INSERT INTO restaurant_opening_hour (restaurant_id, day_of_week, opening_time, opening_duration_minutes) VALUES ($1, $2, $3, $4)`,
      [
        restaurantOpeningHourModel.restaurantId,
        restaurantOpeningHourModel.dayOfWeek,
        restaurantOpeningHourModel.openingTime,
        restaurantOpeningHourModel.openingDurationMinutes,
      ],
    );

    const newRestaurantOpeningHour = await this.model.query(
      `SELECT * FROM restaurant_opening_hour WHERE restaurant_id = $1 AND day_of_week = $2 limit 1`,
      [
        restaurantOpeningHourModel.restaurantId,
        restaurantOpeningHourModel.dayOfWeek,
      ],
    );

    return this.restaurantOpeningHourModelMapper.modelToDomain(
      newRestaurantOpeningHour[0] ?? null,
    );
  }

  async update(
    restaurantOpeningHour: RestaurantOpeningHour,
  ): Promise<RestaurantOpeningHour> {
    const restaurantOpeningHourModel =
      this.restaurantOpeningHourModelMapper.domainToModel(
        restaurantOpeningHour,
      );

    await this.model.query(
      `UPDATE restaurant_opening_hour SET opening_time = $1, opening_duration_minutes = $2 WHERE restaurant_id = $3 AND day_of_week = $4`,
      [
        restaurantOpeningHourModel.openingTime,
        restaurantOpeningHourModel.openingDurationMinutes,
        restaurantOpeningHourModel.restaurantId,
        restaurantOpeningHourModel.dayOfWeek,
      ],
    );

    const newRestaurantOpeningHour = await this.model.query(
      `SELECT * FROM restaurant_opening_hour WHERE restaurant_id = $1 AND day_of_week = $2 limit 1`,
      [
        restaurantOpeningHourModel.restaurantId,
        restaurantOpeningHourModel.dayOfWeek,
      ],
    );

    return this.restaurantOpeningHourModelMapper.modelToDomain(
      newRestaurantOpeningHour[0] ?? null,
    );
  }

  async delete(id: string): Promise<void> {
    await this.model.query(
      `DELETE FROM restaurant_opening_hour WHERE restaurant_id = $1`,
      [id],
    );
  }

  async findAll(): Promise<RestaurantOpeningHour[]> {
    const restaurantOpeningHours = await this.model.query(
      `SELECT * FROM restaurant_opening_hour`,
    );

    restaurantOpeningHours.map((restaurantOpeningHour) => {
      return this.restaurantOpeningHourModelMapper.modelToDomain(
        restaurantOpeningHour,
      );
    });

    return restaurantOpeningHours;
  }

  async findById(
    restaurantId: string,
    dayOfWeek: number,
  ): Promise<RestaurantOpeningHour> {
    const restaurantOpeningHour = await this.model.query(
      `SELECT * FROM restaurant_opening_hour WHERE restaurant_id = $1 AND day_of_week = $2 limit 1`,
      [restaurantId, dayOfWeek],
    );

    return this.restaurantOpeningHourModelMapper.modelToDomain(
      restaurantOpeningHour[0] ?? null,
    );
  }

  async findByRestaurantId(
    restauntId: string,
  ): Promise<RestaurantOpeningHour[]> {
    const restaurantOpeningHours = await this.model.query(
      `SELECT * FROM restaurant_opening_hour WHERE restaurant_id = $1`,
      [restauntId],
    );

    restaurantOpeningHours.map((restaurantOpeningHour) => {
      return this.restaurantOpeningHourModelMapper.modelToDomain(
        restaurantOpeningHour,
      );
    });

    return restaurantOpeningHours;
  }

  async deleteByRestaurantId(restauntId: string): Promise<void> {
    await this.model.query(
      `DELETE FROM restaurant_opening_hour WHERE restaurant_id = $1`,
      [restauntId],
    );
  }
}
