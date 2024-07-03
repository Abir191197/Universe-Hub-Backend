import QueryBuilder from "../../builders/QueryBuilder";
import { ICourse } from "./course.interface";
import CourseModel from "./course.model";
import { courseSearchableFields } from "./courses.constant";

const createCourseIntoDB = async (courseData: ICourse): Promise<ICourse> => {
  const course = new CourseModel(courseData);
  await course.save();
  return course.toObject();
};

const getAllCourserFromDB = async (query: Record<string, unknown>) => {
  
  const queryObj = { ...query };
  console.log(queryObj);

  const courseQuery = new QueryBuilder(CourseModel.find(), queryObj).search(courseSearchableFields).
    filter().
    paginate().
    sort().
    fields(); //chaining

 const result = await courseQuery.modelQuery;
 return result;
}


export const courseService = {
  createCourseIntoDB,
  getAllCourserFromDB,
};