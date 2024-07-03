import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { sendImageToCloud } from "../../utils/sendImageToCloud";
import { IFile } from "./file.interface";
import FileModel from "./file.model";


//create File into DATABASE

// const createFileUploadIntoDB = async (payload: {
//   authUserInformation: any;
//   fileInformation: any;
//   typeInformation: any;
// }) => {
//   const { authUserInformation, fileInformation, typeInformation } = payload;

//   console.log("from here", fileInformation.originalname);

//    const fileName = fileInformation.originalname;
//    const path = fileInformation.path;


//   const {secure_url,resource_type,bytes} =await sendImageToCloud(fileName,path);

 

//   const newFile: Partial<IFile> = {
//     uploadedBy: authUserInformation.name,
//     //courseId: fileInformation.courseId,
//     type: typeInformation.type,
//     fileUrl: secure_url as string,
//     fileSize: Math.round(bytes / 1024),
//     fileType: resource_type,
//   };

//   const file = new FileModel(newFile);
//   await file.save();
//   return file.toObject();
// };

// Create File into DATABASE
const createFileUploadIntoDB = async (payload: {
  authUserInformation: any;
  fileInformation: any;
  typeInformation: any;
}) => {
  const { authUserInformation, fileInformation, typeInformation } = payload;
  const fileName = fileInformation.originalname;
  const buffer = fileInformation.buffer;

  const { secure_url, resource_type, bytes } = await sendImageToCloud(fileName, buffer);

  const newFile: Partial<IFile> = {
    uploadedBy: authUserInformation.name,
    type: typeInformation.type,
    fileUrl: secure_url as string,
    fileSize: Math.round(bytes / 1024),
    fileType: resource_type,
  };

  const file = new FileModel(newFile);
  await file.save();
  return file.toObject();
};

//FILE approved or status change in database


const fileStatusChangeIntoDB = async (id: string) => {
  try {
    // Check if the file exists in the database
    const file = await FileModel.findOne({ _id: id });

    if (!file) {
      throw new AppError(httpStatus.NOT_FOUND, "File not found");
    }

    // Check if the file status is already "Approved"
    if (file.status === "Approved") {
      throw new AppError(httpStatus.BAD_REQUEST, "File already approved");
    }

    // Update the file status to "Approved"
    file.status = "Approved";
    await file.save(); 

    return file; 
  } catch (error) {
    throw error; 
  }
};






export const fileUploadService = {
  createFileUploadIntoDB,
  fileStatusChangeIntoDB
};
