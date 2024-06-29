import { Schema, model, Document } from "mongoose";
import { ICourse, ILecture, INote, IQuestion } from "./course.interface";

const QuestionSchema = new Schema<IQuestion>({
  userId: { type: Schema.Types.ObjectId, required: true },
  questionTitle: { type: String, required: true },
  questionFileUrl: { type: String, required: true },
});

const NoteSchema = new Schema<INote>({
  userId: { type: Schema.Types.ObjectId, required: true },
  noteTitle: { type: String, required: true },
  noteContent: { type: String, required: true },
  noteFileUrl: { type: String },
});

const LectureSchema = new Schema<ILecture>({
  userId: { type: Schema.Types.ObjectId, required: true },
  lectureTitle: { type: String, required: true },
  lectureContent: { type: String, required: true },
  lectureFileUrl: { type: String, required: true },
});

const CourseSchema = new Schema<ICourse>({
  courseName: { type: String, required: true },
  questions: { type: [QuestionSchema], default: null },
  notes: { type: [NoteSchema], default: null },
  lectures: { type: [LectureSchema], default: null },
});

const CourseModel = model<ICourse>("Courses", CourseSchema, "Courses");

export default CourseModel;
