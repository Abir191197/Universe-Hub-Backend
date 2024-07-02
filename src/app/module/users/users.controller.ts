import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./users.service";

const findUser = catchAsync(async (req, res) => {
  const result = await UserService.findUserFromDB(req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});

const updatedUser = catchAsync(async (req, res) => {
  const result = await UserService.updatedUserIntoDB(req.user, req.body);

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



export const userControllers = {
  findUser,
  updatedUser,
  roleChange,
};