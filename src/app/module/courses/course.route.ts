import express from "express";
import authVerify from "../../middlewares/authVerify";
import { USER_ROLE } from "../users/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { CourseValidation } from "./course.validation";
import { courseControllers } from "./course.controller";
const router = express.Router();

router.post(
  "/create-course",
  authVerify(USER_ROLE.admin, USER_ROLE.student),
  validateRequest(CourseValidation.courseValidationSchema),courseControllers.CourseCreate
);

router.get("/", authVerify(USER_ROLE.admin, USER_ROLE.student),
courseControllers.getAllCourse);

router.put("/:id", authVerify(USER_ROLE.admin, USER_ROLE.student),

courseControllers.addCourseInPersonalProfile
);

router.get("/:id", authVerify(USER_ROLE.admin, USER_ROLE.student),
courseControllers.getSingleCourse);



export const CourseRoutes = router;