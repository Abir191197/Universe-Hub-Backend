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




//get event by who have owner




const getCounsellingByWhoOwner = catchAsync(async (req, res) => {
const payload = {
   
   authUserInformation: req.user,
  
 };

  const result = await CounselingServices.getOwnerCounsellingFromDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event are retrieved for owner  succesfully",
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


//delete counselling controller

const deleteCounselling = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CounselingServices.EventDeleteFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Event deleted successfully",
    data: result,
  });
});




// Controller to handle the request
const CompleteCounselling = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CounselingServices.CompleteCounsellingUpdatedIntoBD(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Counseling session marked as completed successfully",
    data: result,
  });
});






export const CounselingControllers = {
  createCounseling,
  getAllEvent,
  BookedEvent,
  getCounsellingByWhoOwner,
  deleteCounselling,
  CompleteCounselling,
};