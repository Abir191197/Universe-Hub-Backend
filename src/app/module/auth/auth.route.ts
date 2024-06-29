import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "../users/user.validation";
import { AuthControllers } from "./auth.controller";
import handleZodError from "../../errors/handleZodError";
import { AuthValidation } from "./auth.validation";

const router = express.Router();
router.post(
  "/signup",
  validateRequest(UserValidation.userValidationSchema),
  AuthControllers.Signup,
  handleZodError,
);

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.login,
);











export const AuthRoutes = router;
