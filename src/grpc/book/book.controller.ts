import { Controller, Res } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { BookService } from './book.service';
import { book } from '../../../protobuf/rpc';
import { IBook } from './book.interface';

import ReqGet = book.GetRequest;
import ReqAdd = book.AddRequest;
import ReqUpdate = book.UpdateRequest;
import ReqDelete = book.DeleteRequest;

import ResIndex = book.IndexResponse;
import ResGet = book.GetResponse;
import ResAdd = book.AddResponse;
import ResUpdate = book.UpdateResponse;
import ResDelete = book.DeleteResponse;


@Controller('book')
export class BookController {
  constructor(private readonly SBook: BookService) {}

  @GrpcMethod('BookService', 'Index')
  async Index(): Promise<ResIndex> {
    const books = await this.SBook.findAll();
    return ResIndex.create({
      message: 'Book List',
      books
    });
  }

  @GrpcMethod('BookService', 'Get')
  async Get(req: ReqGet): Promise<ResGet> {
    const book = await this.SBook.findOne(req.id);
    return ResGet.create({
      message: 'Get Book',
      book
    });
  }

  @GrpcMethod('BookService', 'Add')
  async Add(req: ReqAdd): Promise<ResAdd> {
    const data: IBook = {
      title: req.title,
      year: req.year,
      author: {
        name: req.name,
        phone: req.phone,
        address: req.address
      }
    };
    const book = await this.SBook.create(data);
    return ResAdd.create({
      message: 'Book Added',
      book
    });
  }

  @GrpcMethod('BookService', 'Update')
  async Update(req: ReqUpdate): Promise<ResUpdate> {
    const data: IBook = {
      title: req.title,
      year: req.year,
      author: {
        name: req.name,
        phone: req.phone,
        address: req.address
      }
    };
    const book = await this.SBook.update(req.id, data);
    return ResUpdate.create({
      message: 'Book Updated',
      book
    });
  }

  @GrpcMethod('BookService', 'Delete')
  async Delete(req: ReqDelete): Promise<ResDelete> {
    await this.SBook.delete(req.id);
    return ResDelete.create({
      message: 'Book Deleted'
    });
  }
}
