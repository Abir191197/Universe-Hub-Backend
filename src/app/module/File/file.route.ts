import express from "express";
import authVerify from "../../middlewares/authVerify";
import { USER_ROLE } from "../users/user.constant";
import { FileValidation } from "./file.validation";
import validateRequest from "../../middlewares/validateRequest";
import { fileUploadController } from "./file.controller";
const router = express.Router();

router.post(
  "/create-course",
  authVerify(USER_ROLE.admin, USER_ROLE.student),
  validateRequest(FileValidation.fileValidationSchema),
  fileUploadController.fileUpload
);


export const fileRoutes = router;