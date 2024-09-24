import express from "express";

import validateRequest from "../../middlewares/validateRequest";
import authVerify from "../../middlewares/authVerify";
import { USER_ROLE } from "../users/user.constant";
import { GroupStudyValidation } from "./GroupCounselling.validation";
import { GroupStudyController } from "./GroupCounselling.controller";



const router = express.Router();
//create Counselling

router.post(
  "/createGroupCounselling",
  authVerify(USER_ROLE.admin, USER_ROLE.counsellor, USER_ROLE.student),
  validateRequest(GroupStudyValidation.GroupStudyValidationSchema),
  GroupStudyController.createGroupStudy
);


router.delete(
  "/:id",
  authVerify(USER_ROLE.admin, USER_ROLE.counsellor, USER_ROLE.student),
  GroupStudyController.deleteGroupStudy
);


router.get(
  "/",
  authVerify(USER_ROLE.admin, USER_ROLE.counsellor, USER_ROLE.student),
  GroupStudyController.getAllGroupStudy
);

router.put(
  "/:id",
  authVerify(USER_ROLE.admin, USER_ROLE.counsellor, USER_ROLE.student),
  GroupStudyController.bookedGroupStudy
);



export const GroupCounsellingRoute = router;
