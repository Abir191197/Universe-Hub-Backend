import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./users.service";

const findUser = catchAsync(async (req, res) => {

  const user = req.user ?? null; 
  const result = await UserService.findUserFromDB(user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});

const updatedUser = catchAsync(async (req, res) => {
  const user = req.user ?? null;  
  const result = await UserService.updatedUserIntoDB(user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
});

const roleChange = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.updatedRoleIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Role updated successfully",
    data: result,
  });
});

//ban the user

const banUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.BanIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Suspend successfully",
    data: result,
  });
});
//active user
const ActiveUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.ActiveUserIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Active successfully",
    data: result,
  });
});


//get all user from DB
const getAllUser = catchAsync(async (req, res) => {

  const result = await UserService.GetAllUserFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " All User get  successfully",
    data: result,
  });
});



export const userControllers = {
  findUser,
  updatedUser,
  roleChange,
  getAllUser,
  banUser,
  ActiveUser,
};