import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { fileUploadService } from "./file.service";

//file upload

const fileUpload = catchAsync(async (req, res) => {

 
  const payload = {
    fileInformation: req.file,
    authUserInformation: req.user,
    typeInformation:req.body,

  };



  const result = await fileUploadService.createFileUploadIntoDB(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "File uploaded successfully",
    data: result,
  });
});



//file approved



const fileApproved = catchAsync(async (req, res) => {
  
  const { id } = req.params;

  const result = await fileUploadService.fileStatusChangeIntoDB(id);

 sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "File Approved successfully",
    data: result,
  });

 });




export const fileUploadController = {
  fileUpload,
  fileApproved
};
