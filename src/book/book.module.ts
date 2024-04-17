import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/book.schemas';
import { HttpModule } from '@nestjs/axios';
import { BookMicroServiceController } from './book-microservicecontroller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    HttpModule,
  ],
  controllers: [BookController, BookMicroServiceController],
  providers: [BookService],
})
export class BookModule {}
