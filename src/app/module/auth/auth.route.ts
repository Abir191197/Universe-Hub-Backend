import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "../users/user.validation";
import { AuthControllers } from "./auth.controller";



const router = express.Router();
router.post(
  "/signup",
  validateRequest(UserValidation.userValidationSchema),
  AuthControllers.Signup
);

export const AuthRoutes = router;
