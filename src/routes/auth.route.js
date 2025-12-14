import { Router } from "express";
import {
  registerUser,
  login,
  logout,
  getCurrentUser,
  changeCurrentPassword,
  refreshAccessToken,
  verifyEmail,
  forgotPasswordRequest,
  resetForgotPassword,
  resendEmailVerification,
} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import { loginValidation, userRegisterValidator } from "../validators/index.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(loginValidation(), validate, login);
router.route("/logout").post(verifyJWT, logout);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/verify-email/:verificationToken").get(verifyEmail);
router.route("/forgot-password").post(forgotPasswordRequest);
router.route("/reset-password/:resetToken").post(resetForgotPassword);
router.route("/resend-email-verification").post(resendEmailVerification);

export default router;
