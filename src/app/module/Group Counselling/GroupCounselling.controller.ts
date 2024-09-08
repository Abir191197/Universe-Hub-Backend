import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { GroupStudyService } from "./GroupCounselling.service";

// create Event Full link into DB
const createGroupStudy = catchAsync(async (req, res) => {
  const payload = {
    authUserInformation: req.user,
    EventInformation: req.body,
  };

    const result = await GroupStudyService.createGroupStudyIntoDB(payload); 

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Counseling Event Create successfully",
    data: result,
  });
});


//Delete Group study

const deleteGroupStudy = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await GroupStudyService.GroupStudyDeleteFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Group Study deleted successfully",
    data: result,
  });
});


//Get All Group study

const getAllGroupStudy = catchAsync(async (req, res) => {

  const result = await GroupStudyService.getAllCounsellingFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Group study are retrieved  succesfully",
    data: result,
  });
});







export const GroupStudyController = {
  createGroupStudy,
  deleteGroupStudy,
  getAllGroupStudy,
};