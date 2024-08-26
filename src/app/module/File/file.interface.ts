import { Document, Types } from "mongoose";

export interface IFile  {
  uploadedBy: string;
  fileName: string;
  fileDescription: string;
  type: "question" | "note" | "lecture";
  fileUrl: string;
  courseId: Types.ObjectId; // Ensure courseId is of type ObjectId
  courseName: string;
  fileSize: number;
  fileType: string;
  status: "Pending" | "Approved";
  createdAt?: Date;
  updatedAt?: Date;
}
