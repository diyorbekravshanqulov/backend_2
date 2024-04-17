import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller('product')
export class ProductMicroServiceController {
  constructor(private readonly productService: ProductService) {}

  @EventPattern('hello')
  async hello(data: string) {
    console.log(data);
  }

  @EventPattern('product_created')
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return this.productService.findOne(+id);
  //   }

  @EventPattern('product_updated')
  async update(@Body() updateProductDto: UpdateProductDto) {
    const { id, ...updateProducted } = updateProductDto;
    return this.productService.update(+id, updateProducted);
  }

  @EventPattern('product_deleted')
  async remove(id: number) {
    // console.log(id);
    return this.productService.remove(id);
  }
}
