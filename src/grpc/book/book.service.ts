import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookDocument } from './book.schema';
import { IBook } from './book.interface';
import { DateTime } from 'luxon';

@Injectable()
export class BookService {
  constructor( @InjectModel('books') private readonly MBook: Model<BookDocument> ) {}

  async findAll(): Promise<BookDocument[]> {
    return await this.MBook.find();
  }

  async findOne(req: String, type: String = 'id'): Promise<BookDocument> {
    if (type === 'id')
      return await this.MBook.findById(req);
    else
      return await this.MBook.findOne({type: req});
  }

  async create(req: IBook): Promise<BookDocument> {
    const date = DateTime.local()
    console.log(date.toJSDate());
    const book = new this.MBook(req);
    return await book.save();
  }

  async update(id: String, req: IBook): Promise<BookDocument> {
    return await this.MBook.findByIdAndUpdate(id, req);
  }

  async delete(id: String): Promise<BookDocument> {
    return await this.MBook.findByIdAndDelete(id);
  }
}
