import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Get,
} from '@nestjs/common';
import { CreateProductDto } from '@product/dto/CreateProductDto';
import { UpdateProductDto } from '@product/dto/UpdateProductDto';
import { CreateProductUseCase } from '@product/usecases/CreateProductUseCase';
import { DeleteProductUseCase } from '@product/usecases/DeleteProductUseCase';
import { FindAllProductsUseCase } from '@product/usecases/FindAllProductsUseCase';
import { UpdateProductUseCase } from '@product/usecases/UpdateProductUseCase';

@Controller('restaurants/:restaurantId/products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly findProductsUseCase: FindAllProductsUseCase,
  ) {}

  @Post()
  create(
    @Param('restaurantId') restaurantId: string,
    @Body() CreateProductDto: CreateProductDto,
  ) {
    return this.createProductUseCase.execute(restaurantId, CreateProductDto);
  }

  @Get()
  findAll(@Param('restaurantId') restaurantId: string) {
    return this.findProductsUseCase.execute(restaurantId);
  }

  @Patch(':id')
  update(
    @Param('restaurantId') restaurantId: string,
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateProductDto,
  ) {
    return this.updateProductUseCase.execute(
      restaurantId,
      id,
      updateRestaurantDto,
    );
  }

  @Delete(':id')
  remove(@Param('restaurantId') restaurantId: string, @Param('id') id: string) {
    return this.deleteProductUseCase.execute(restaurantId, id);
  }
}
