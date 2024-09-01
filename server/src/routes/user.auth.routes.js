import { Router } from "express";

import {
  emailVerify,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshUserToken,
  registerUser,
} from "../controllers/user.auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);

router.route("/user").get(verifyJWT, getCurrentUser);

router.route("/refreshToken").post(refreshUserToken);

router.route("/emailVerify").post(emailVerify);

export default router;
