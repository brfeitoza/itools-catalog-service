import { Injectable } from '@nestjs/common';
import { prisma } from 'src/config/prisma';
import { ProductDto } from './dto/ProductDto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  async getAll(): Promise<ProductDto[]> {
    return prisma.product.findMany();
  }

  async getById(id: string): Promise<ProductDto> {
    console.log('buscando produto', id);
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

  async deleteMany(
    ids: string[],
  ): Promise<Prisma.PrismaPromise<Prisma.BatchPayload>> {
    return prisma.product.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
