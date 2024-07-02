import { Schema, model } from "mongoose";
import { IFile } from "./file.interface";

const fileSchema = new Schema<IFile>({
  uploadedBy: { type: String, required: true },
  // courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
  type: { type: String, enum: ["question", "note", "lecture"], required: true },
  fileUrl: { type: String, required: true },
  fileSize: { type: Number, required: true },
  fileType: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Approved"],default: "Pending" }
});

const FileModel = model<IFile>("Files", fileSchema,"Files");

export default FileModel;
