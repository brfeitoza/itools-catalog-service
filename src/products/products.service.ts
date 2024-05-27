import { Injectable } from '@nestjs/common';
import { prisma } from 'src/config/prisma';
import { ProductDto } from './dto/ProductDto';

@Injectable()
export class ProductsService {
  async getAll(): Promise<ProductDto[]> {
    return prisma.product.findMany();
  }

  async getById(id: string): Promise<ProductDto> {
    return prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async create(product: ProductDto): Promise<ProductDto> {
    return prisma.product.create({
      data: product,
    });
  }

  async update(id: string, product: ProductDto): Promise<ProductDto> {
    return prisma.product.update({
      where: {
        id,
      },
      data: product,
    });
  }

  async delete(id: string): Promise<ProductDto> {
    return prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
