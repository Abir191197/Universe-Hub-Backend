import express from "express";
import authVerify from "../../middlewares/authVerify";
import { USER_ROLE } from "../users/user.constant";
import validateRequest from "../../middlewares/validateRequest";

import { createCounselingControllers } from "./counseling.controller";
import { CounselingValidation } from "./counseling.validation";

const router = express.Router();

router.post(
  "/createEvent",
  authVerify(USER_ROLE.admin, USER_ROLE.counsellor),
  validateRequest(CounselingValidation.CounselingValidationSchema),
  createCounselingControllers.createCounseling
);


export const MeetRoutes = router;