import { Schema, model } from "mongoose";
import { IFile } from "./file.interface";

const fileSchema = new Schema<IFile>({
  uploadedBy: { type: String, required: true },
  fileName: { type: String, required: true },
  fileDescription: { type: String, required: true },
  type: { type: String, enum: ["Question", "Video", "Personal Note"], required: true },
  fileUrl: { type: String, required: true },
  courseId: { type: Schema.Types.ObjectId, ref: "Courses", required: true },
  courseName: { type: String, required: true },
  fileSize: { type: Number, required: true },
  fileType: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Approved"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const FileModel = model<IFile>("Files", fileSchema, "Files");

export default FileModel;
