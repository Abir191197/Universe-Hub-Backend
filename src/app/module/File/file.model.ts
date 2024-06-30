import { model, Schema } from "mongoose";
import { IFile } from "./file.interface";


const FileSchema = new Schema<IFile>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
  courseId: { type: Schema.Types.ObjectId, required: true, ref: "Courses" },
  type: { type: String, required: true, enum: ["question", "note", "lecture"] },
  fileUrl: { type: String, required: true },
  fileName: { type: String, required: true },
  fileSize: { type: Number, required: true },
  fileType: { type: String, required: true },
});

const FileModel = model<IFile>("Files", FileSchema, "Files");

export default FileModel;
