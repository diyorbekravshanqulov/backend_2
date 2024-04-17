import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schemas';
import { ProductMicroServiceController } from './product-microservicecontroller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    HttpModule,
  ],
  controllers: [ProductController, ProductMicroServiceController],
  providers: [ProductService],
})
export class ProductModule {}
