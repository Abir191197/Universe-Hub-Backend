
export interface IFile {
  uploadedBy: string;
  // courseId: ObjectId;
  type: "question" | "note" | "lecture";
  fileUrl: string;
  fileSize: number;
  fileType: string;
  status: "Pending" | "Approved";
  createdAt: Date;
  updatedAt: Date;
}
