import { IFile } from "./file.interface";
import FileModel from "./file.model";

const createFileUploadIntoDB = async (courseData: IFile): Promise<IFile> => {
  const course = new FileModel(courseData);
  await course.save();
  return course.toObject();
};

export const fileUploadService = {
  createFileUploadIntoDB,
};
