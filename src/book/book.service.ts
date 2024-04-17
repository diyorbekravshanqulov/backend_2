import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './schemas/book.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async create(createBookDto: CreateBookDto) {
    return this.bookModel.create(createBookDto);
  }

  async findAll() {
    return this.bookModel.find();
  }

  async findOne(id: number) {
    return this.bookModel.findOne({ id });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    return this.bookModel.findOneAndUpdate({ id }, updateBookDto, {
      new: true,
    });
  }

  async remove(id: number) {
    await this.bookModel.findOneAndDelete({ id });
    return {
      message: 'successfully removed mongo',
    };
  }
}
