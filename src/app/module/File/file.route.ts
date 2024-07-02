import express, { NextFunction, Request, Response } from "express";
import authVerify from "../../middlewares/authVerify";
import { upload } from "../../utils/sendImageToCloud";
import { USER_ROLE } from "../users/user.constant";
import { fileUploadController } from "./file.controller";
const router = express.Router();

router.post(
  "/file",

  authVerify(USER_ROLE.admin, USER_ROLE.student),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  fileUploadController.fileUpload
);

export const fileRoutes = router;
