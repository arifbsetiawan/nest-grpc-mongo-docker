import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'books', schema: BookSchema }
    ])
  ],
  providers: [BookService],
  controllers: [BookController]
})
export class BookModule {}
