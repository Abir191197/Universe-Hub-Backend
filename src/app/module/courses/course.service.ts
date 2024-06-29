import { ICourse } from "./course.interface";
import CourseModel from "./course.model";

const createCourseIntoDB = async (courseData: ICourse): Promise<ICourse> => {
  const course = new CourseModel(courseData);
  await course.save();
  return course.toObject();
};


export const courseService = {
  createCourseIntoDB,
};