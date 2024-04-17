import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema({ versionKey: false })
export class Book {
  @Prop()
  id: number;

  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  price: number;

  @Prop()
  publiccation_year: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
