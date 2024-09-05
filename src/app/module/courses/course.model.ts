import { model, Schema } from "mongoose";
import { ICourse } from "./course.interface";

const CourseSchema = new Schema<ICourse>({
  courseName: { type: String, required: true },
  files: [{ type: Schema.Types.ObjectId, ref: "Files" }],
  Description: { type: String },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const CourseModel = model<ICourse>("Courses", CourseSchema, "Courses");

export default CourseModel;
