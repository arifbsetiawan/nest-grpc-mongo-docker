import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DateTime } from "luxon";
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

const authorProp = raw({
  name: String,
  phone: String,
  address: String
});

@Schema({
  timestamps: {
      currentTime: () => {
        const date = DateTime.local();
        return date.toJSDate();
      },
      createdAt: 'created_at',
      updatedAt: 'updated_at',
  }
})
export class Book extends Document {
  @Prop()
  title: string;

  @Prop()
  year: number;

  @Prop(authorProp)
  author: Record<string, any>

  @Prop()
  timestamps: true;
}

export const BookSchema = SchemaFactory.createForClass(Book);