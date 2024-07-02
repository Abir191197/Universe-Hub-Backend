import express, { NextFunction, Request, Response } from "express";
import authVerify from "../../middlewares/authVerify";
import { upload } from "../../utils/sendImageToCloud";
import { USER_ROLE } from "../users/user.constant";
import { fileUploadController } from "./file.controller";
import validateRequest from "../../middlewares/validateRequest";
import { FileValidation } from "./file.validation";

const router = express.Router();

router.post(
  "/file",

  // Authentication middleware (adjust roles as needed)
  authVerify(USER_ROLE.admin, USER_ROLE.student),

  // File upload middleware (assuming you use multer for file uploads)
  upload.single("file"),

  // Middleware to parse JSON from form data if necessary
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      try {
        req.body = JSON.parse(req.body.data);
      } catch (error) {
        return next(error); // Handle JSON parsing error
      }
    }
    next();
  },

  // Validation middleware using Zod schema
  validateRequest(FileValidation.FileValidationSchema),

  // Controller function for handling file upload logic
  fileUploadController.fileUpload
);

export const fileRoutes = router;
