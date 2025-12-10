import { Router } from "express";
import { registerUser, login, logout } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import { loginValidation, userRegisterValidator } from "../validators/index.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(loginValidation(), validate, login);
router.route("/logout").post(verifyJWT, logout);

export default router;
