
export interface IFile {
  uploadedBy: string;
  // courseId: ObjectId;
  fileName: string;
  fileDescription: string;
  type: "question" | "note" | "lecture";
  fileUrl: string;
  fileSize: number;
  fileType: string;
  status: "Pending" | "Approved";
  createdAt: Date;
  updatedAt: Date;
}
