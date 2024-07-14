import { JwtPayload } from "jsonwebtoken";
import QueryBuilder from "../../builders/QueryBuilder";
import { ICourse } from "./course.interface";
import CourseModel from "./course.model";
import { courseSearchableFields } from "./courses.constant";
import UserModel from "../users/users.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Types } from "mongoose";


//create Course in the Database

const createCourseIntoDB = async (courseData: ICourse): Promise<ICourse> => {
  const course = new CourseModel(courseData);
  await course.save();
  return course.toObject();
};

//get All course

const getAllCourserFromDB = async (query: Record<string, unknown>) => {
  
  const queryObj = { ...query };
  


  const courseQuery = new QueryBuilder(
    CourseModel.find().populate("files"),
    queryObj
  )
    .search(courseSearchableFields)
    .filter()
    .paginate()
    .sort()
    .fields(); //chaining

 const result = await courseQuery.modelQuery;
 return result;
}
//student add course in the profile

const createCourseInProfileIntoDB = async (payload: {
  id: string;
  authInformation: JwtPayload;
}) => {
  const { id, authInformation } = payload;

  // Check if the user exists
  const user = await UserModel.findOne(
    { email: authInformation.email })
  ;
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // Check if the course exists
  const course = await CourseModel.findById(id);
  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }

  // Add the course ID to the user's courses array if it doesn't already exist
    (user.courses as Types.Array<Document | Types.ObjectId>).addToSet(
      course._id
    );
   await user.save();

  return user;
};

// Get single course find from Database logic

const getSingleCourseFromDB = async (id: string) => {
  try {
    const result = await CourseModel.findOne({ _id: id }).populate("files");
    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, "Course not found");
    }
    return result;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    } else {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to retrieve Course");
    }
  }
};





export const courseService = {
  createCourseIntoDB,
  getAllCourserFromDB,
  createCourseInProfileIntoDB,
  getSingleCourseFromDB,
};