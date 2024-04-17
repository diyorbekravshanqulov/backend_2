import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller('book')
export class BookMicroServiceController {
  constructor(private readonly bookService: BookService) {}

  @EventPattern('hello')
  async hello(data: string) {
    console.log(data);
  }

  @EventPattern('book_created')
  async create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.bookService.findOne(+id);
  // }

  @EventPattern('book_updated')
  async update(@Body() updateBookDto: UpdateBookDto) {
    const { id, ...updateBook } = updateBookDto;
    return this.bookService.update(+id, updateBook);
  }

  @EventPattern('book_deleted')
  async remove(id: number) {
    return this.bookService.remove(id);
  }
}
