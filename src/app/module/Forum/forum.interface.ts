// forum.interface.ts
import { Document, Types } from "mongoose";

export interface IComment {
  _id?: Types.ObjectId;
  content: string;
  author: Types.ObjectId;
  CommentAuthorName: string;
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
  tags?: string;
  createdAt: Date;
  updatedAt: Date;
}
