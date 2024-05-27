import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty()
  price: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
