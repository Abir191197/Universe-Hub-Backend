import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseService } from "./course.service";
import { RequestHandler } from "express";

const CourseCreate = catchAsync(async (req, res) => {
  const result = await courseService.createCourseIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course Create successfully",
    data: result,
  });
});

const getAllCourse: RequestHandler = catchAsync(async (req, res) => {
 
 const result = await courseService.getAllCourserFromDB(req.query);
 
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Courses are retrieved  succesfully",
    data: result,
  });

});




export const courseControllers = {
  CourseCreate,
  getAllCourse,
};