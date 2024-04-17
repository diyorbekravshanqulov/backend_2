import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { HttpService } from '@nestjs/axios';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly httpService: HttpService,
  ) {}

  @Post(':id/like')
  async likeBoss(@Param('id') id: string) {
    let prod = await this.productService.findOne(+id);
    if (!prod) {
      throw new NotFoundException('Not found Product');
    }
    prod = await this.productService.update(+id, { likes: prod.likes + 1 });

    try {
      this.httpService
        .post(`http://localhost:3000/api/product/${id}/like`, {})
        .subscribe((res) => {
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }

    return prod;
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
  