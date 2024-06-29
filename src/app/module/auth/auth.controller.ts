import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import config from "../../../config";

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

//LogIn function 

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUserFromDB(req.body);
  const { accessToken } = result;

  // res.cookie("refreshToken", refreshToken, {
  //   secure: config.NODE_ENV === "production",
  //   httpOnly: true,
  // });

  res.cookie("accessToken", accessToken, {
    secure: config.NODE_ENV === "development",
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in successfully!",
    data: {
      user: {
        ...result.user.toObject(), 
        password: null, 
      },
      accessToken: result.accessToken, 
    },
  });

});





export const AuthControllers = {
  Signup,
  login,
};
