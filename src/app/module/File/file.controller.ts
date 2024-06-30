import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { fileUploadService } from "./file.service";


const fileUpload = catchAsync(async (req, res) => {
  const result = await fileUploadService.createFileUploadIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "File uploaded successfully",
    data: result,
  });
});

export const fileUploadController = {
  fileUpload,
};
