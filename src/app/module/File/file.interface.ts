import { Document, ObjectId } from "mongoose";

// Define the IFile interface
export interface IFile  {
  userId: ObjectId;
  courseId: ObjectId;
  type: "question" | "note" | "lecture";
  fileUrl: string;
  fileName: string;
  fileSize: number;
  fileType: string;
}
