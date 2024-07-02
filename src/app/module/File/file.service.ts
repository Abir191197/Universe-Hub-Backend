import { sendImageToCloud } from "../../utils/sendImageToCloud";
import { IFile } from "./file.interface";
import FileModel from "./file.model";

const createFileUploadIntoDB = async (payload: {
  authUserInformation: any;
  fileInformation: any;
  typeInformation: any;
}) => {
  const { authUserInformation, fileInformation, typeInformation } = payload;

  console.log("from here", fileInformation.originalname);

   const fileName = fileInformation.originalname;
   const path = fileInformation.path;


  const {secure_url,resource_type,bytes} =await sendImageToCloud(fileName,path);

 

  const newFile: Partial<IFile> = {
    uploadedBy: authUserInformation.name,
    //courseId: fileInformation.courseId,
    type: typeInformation.type,
    fileUrl: secure_url as string,
    fileSize: Math.round(bytes / 1024),
    fileType: resource_type,
  };

  const file = new FileModel(newFile);
  await file.save();
  return file.toObject();
};

export const fileUploadService = {
  createFileUploadIntoDB,
};
