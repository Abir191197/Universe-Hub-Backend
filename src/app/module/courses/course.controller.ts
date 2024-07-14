import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseService } from "./course.service";
import { RequestHandler } from "express";


//create course only admin
const CourseCreate = catchAsync(async (req, res) => {
  const result = await courseService.createCourseIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course Create successfully",
    data: result,
  });
});

//get course and search ,filter, sort,  pagination 

const getAllCourse: RequestHandler = catchAsync(async (req, res) => {
 
 const result = await courseService.getAllCourserFromDB(req.query);
 
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Courses are retrieved  succesfully",
    data: result,
  });

});

//add course in  student profile

const addCourseInPersonalProfile = catchAsync(async(req,res)=> {
  
    const { id } = req.params;
    const authInformation = req.user;

    // Creating the payload object
    const payload = {
      id,
      authInformation,
    };



  const result = await courseService.createCourseInProfileIntoDB(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course Added  successfully in personal Profile",
    data: result,
  });

})

//Get find single course from Database

const getSingleCourse = catchAsync(async (req, res) => {

  const { id } = req.params;
  
  const result = await courseService.getSingleCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "One Course founded ",
    data: result,
  });

})





export const courseControllers = {
  CourseCreate,
  getAllCourse,
  addCourseInPersonalProfile,
  getSingleCourse,
};