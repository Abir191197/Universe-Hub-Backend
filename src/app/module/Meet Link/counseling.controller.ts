import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CounselingServices } from "./counseling.service";

// create Event Full link into DB
const createCounseling = catchAsync(async (req, res) => {
 const payload = {
   
   authUserInformation: req.user,
  EventInformation: req.body,
 };

  const result = await CounselingServices.createCounselingIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Counseling Event successfully",
    data: result,
  });
});


//get Event Full link from DB

const getAllEvent = catchAsync(async (req, res) => {
  const result = await CounselingServices.getCounsellingFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event are retrieved  succesfully",
    data: result,
  });
});


//Create Google meet link

const createMeetLink = catchAsync(async (req, res) => {
  


})




export const CounselingControllers = {
  createCounseling,
  getAllEvent,
  createMeetLink,
};