// forum.interface.ts
import { Document, Types } from "mongoose";

export interface IComment {
  _id?: Types.ObjectId;
  content: string;
  author: Types.ObjectId;
  fileUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPost extends Document {
  title: string;
  content: string;
  author: Types.ObjectId;
  comments: IComment[];
  fileUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}