import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { MeetLinkServices } from "./counseling.service";

const createCounseling = catchAsync(async (req, res) => {
 const payload = {
   
   authUserInformation: req.user,
  EventInformation: req.body,
 };

  const result = await MeetLinkServices.createCounselingIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Counseling Event successfully",
    data: result,
  });
});


export const createCounselingControllers = {
  createCounseling,
};