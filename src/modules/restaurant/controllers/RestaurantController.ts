import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateRestaurantDto } from '../dto/CreateRestaurantDto';
import { CreateRestaurantUseCase } from '@restaurant/usecases/CreateRestaurantUseCase';
import { FindAllRestaurantUseCase } from '@restaurant/usecases/FindAllRestaurantUseCase';
import { FindRestaurantUseCase } from '@restaurant/usecases/FindRestaurantUseCase';
import { UpdateRestaurantDto } from '@restaurant/dto/UpdateRestaurantDto';
import { UpdateRestaurantUseCase } from '@restaurant/usecases/UpdateRestaurantUseCase';
import { DeleteRestaurantUseCase } from '@restaurant/usecases/DeleteRestaurantUseCase';

@Controller('restaurants')
export class RestaurantController {
  constructor(
    private readonly createRestaurantUseCase: CreateRestaurantUseCase,
    private readonly findAllRestaurantUseCase: FindAllRestaurantUseCase,
    private readonly findRestaurantUseCase: FindRestaurantUseCase,
    private readonly updateRestaurantUseCase: UpdateRestaurantUseCase,
    private readonly deleteRestaurantUseCase: DeleteRestaurantUseCase,
  ) {}

  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.createRestaurantUseCase.execute(createRestaurantDto);
  }

  @Get()
  findAll() {
    return this.findAllRestaurantUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findRestaurantUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.updateRestaurantUseCase.execute(id, updateRestaurantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteRestaurantUseCase.execute(id);
  }
}
