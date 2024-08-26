import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { fileUploadService } from "./file.service";
import AppError from "../../errors/AppError";

//file upload

const fileUpload = catchAsync(async (req, res) => {
  const payload = {
    fileInformation: req.file,
    authUserInformation: req.user,
    typeInformation: req.body,
  };

  const result = await fileUploadService.createFileUploadIntoDB(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "File uploaded successfully",
    data: result,
  });
});

//get file for course

// Controller to handle request for getting all files for a course
const getAllFileForOneCourses = catchAsync(async (req, res) => {
  // Extracting the course ID from the request parameters
  const { id } = req.params;
  const result = await fileUploadService.getAllFilesForCourse(id);

  // Send a successful response with the result data
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Files retrieved successfully',
    data: result,
  });
});


const getAllFileForAdmin = catchAsync(async (req, res) => {
  

  const result = await fileUploadService.getAllFileDetailsFromDB();

  // Send a successful response with the result data
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Files retrieved successfully",
    data: result,
  });
})





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
  fileApproved,
  getAllFileForOneCourses,
  getAllFileForAdmin,
};
