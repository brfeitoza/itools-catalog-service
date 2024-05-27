import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/ProductDto';
import { ApiBody, ApiQuery } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll(): Promise<ProductDto[]> {
    return this.productsService.getAll();
  }

  @ApiQuery({ name: 'id' })
  @Get(':id')
  async getById(@Query('id') id: string): Promise<ProductDto> {
    return this.productsService.getById(id);
  }

  @ApiBody({ type: ProductDto })
  @Post()
  async create(@Body() product: ProductDto): Promise<ProductDto> {
    return this.productsService.create(product);
  }

  @ApiQuery({ name: 'id' })
  @ApiBody({ type: ProductDto })
  @Put(':id')
  async update(
    @Query('id') id: string,
    @Body() product: ProductDto,
  ): Promise<ProductDto> {
    return this.productsService.update(id, product);
  }

  @ApiQuery({ name: 'id' })
  @Delete(':id')
  async delete(@Query('id') id: string): Promise<ProductDto> {
    return this.productsService.delete(id);
  }
}
