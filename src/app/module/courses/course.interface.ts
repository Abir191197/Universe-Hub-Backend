import { Document, Types } from "mongoose";

export interface ICourse extends Document {
  courseName: string;
  questions: IQuestion[] | null;
  notes: INote[] | null;
  lectures: ILecture[] | null;
}

export interface IQuestion {
  userId: Types.ObjectId;
  questionTitle: string;
  questionFileUrl: string;
}

export interface INote {
  userId: Types.ObjectId;
  noteTitle: string;
  noteContent: string;
  noteFileUrl?: string;
}

export interface ILecture {
  userId: Types.ObjectId;
  lectureTitle: string;
  lectureContent: string;
  lectureFileUrl: string;
}
