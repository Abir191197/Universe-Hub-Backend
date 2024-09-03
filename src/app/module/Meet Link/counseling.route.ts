import express from "express";
import authVerify from "../../middlewares/authVerify";
import { USER_ROLE } from "../users/user.constant";

import { CounselingControllers } from "./counseling.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CounselingValidation } from "./counseling.validation";


const router = express.Router();

router.post(
  "/createEvent",
  authVerify(),
  validateRequest(CounselingValidation.CounselingValidationSchema),
  CounselingControllers.createCounseling
);


router.get(
  "/",
  authVerify(USER_ROLE.admin, USER_ROLE.counsellor,USER_ROLE.student),
  CounselingControllers.getAllEvent
);


//Booking by student

router.put(
  "/:id",
  authVerify(USER_ROLE.admin, USER_ROLE.counsellor, USER_ROLE.student),
  CounselingControllers.BookedEvent
);





export const CounsellingRoute = router;