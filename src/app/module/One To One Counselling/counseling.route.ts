import express from "express";
import authVerify from "../../middlewares/authVerify";
import { USER_ROLE } from "../users/user.constant";

import validateRequest from "../../middlewares/validateRequest";
import { CounselingControllers } from "./counseling.controller";
import { CounselingValidation } from "./counseling.validation";

const router = express.Router();
//create Counselling

router.post(
  "/createEvent",
  authVerify(),
  validateRequest(CounselingValidation.CounselingValidationSchema),
  CounselingControllers.createCounseling
);

//get all  counselling
router.get(
  "/",
  authVerify(USER_ROLE.admin, USER_ROLE.counsellor, USER_ROLE.student),
  CounselingControllers.getAllEvent
);

//get only who have counselling that show

router.get(
  "/whoCounselling",
  authVerify(USER_ROLE.admin, USER_ROLE.counsellor, USER_ROLE.student),
  CounselingControllers.getCounsellingByWhoOwner
);

//Booking by student

router.put(
  "/EventBooked/:id",
  authVerify(USER_ROLE.admin, USER_ROLE.counsellor, USER_ROLE.student),
  CounselingControllers.BookedEvent
);

//delete  counselling

router.delete(
  "/:id",
  authVerify(USER_ROLE.admin, USER_ROLE.counsellor),
  CounselingControllers.deleteCounselling
);

// Route to mark counseling as completed
router.put(
  "/markCompleted/:id",
  authVerify(USER_ROLE.admin, USER_ROLE.counsellor),
  CounselingControllers.CompleteCounselling
);



export const CounsellingRoute = router;
