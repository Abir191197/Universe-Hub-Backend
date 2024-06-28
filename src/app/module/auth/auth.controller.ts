import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";
import { AuthServices } from "./auth.service";

// SignIn function
const Signup = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.signUpUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is signed up successfully!",
    data: result,
  });
});


export const AuthControllers = {
  Signup,
};