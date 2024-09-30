// forum.model.ts
import mongoose, { Schema } from "mongoose";
import { IPost } from "./forum.interface";

const CommentSchema: Schema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  CommentAuthorName: { type: String },
  fileUrl: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  comments: [CommentSchema],
  fileUrl: { type: String, required: false },
   tags: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Post = mongoose.model<IPost>("Post", PostSchema);
