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
    message: "Counseling Event Create successfully",
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


//Booking by Student

const BookedEvent = catchAsync(async (req, res) => {
  
  const { id } = req.params;
  const user = req.user; 
  const result = await CounselingServices.EventBookingConfirmIntoDB(id, user);

sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: "Event Booked  succesfully",
  data: result,
});


})














export const CounselingControllers = {
  createCounseling,
  getAllEvent,
  BookedEvent,
};