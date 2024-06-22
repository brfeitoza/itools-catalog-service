import {
  Body,
  Controller,
  Delete,
  Get,
  OnModuleInit,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/ProductDto';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import KafkaConfig from 'src/config/kafka';

@Controller('products')
export class ProductsController implements OnModuleInit {
  constructor(private readonly productsService: ProductsService) {}

  onModuleInit() {
    const kafka = new KafkaConfig();
    kafka.consume('orders', (value) => {
      const newOrder = JSON.parse(value);
      console.log('New order:', newOrder);
      console.log('Removendo produtos do estoque...');
      this.productsService.deleteMany(newOrder.products);
    });
  }

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
