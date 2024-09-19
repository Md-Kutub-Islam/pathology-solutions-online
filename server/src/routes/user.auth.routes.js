import { Router } from "express";

import {
  deleteUser,
  emailVerify,
  forgotPasswordLink,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshUserToken,
  registerUser,
  updateUser,
} from "../controllers/user.auth.controller.js";
import { verifyUserJWT } from "../middlewares/user.auth.middlewares.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyUserJWT, logoutUser);

router.route("/user").get(verifyUserJWT, getCurrentUser);
router
  .route("/user/:id")
  .put(verifyUserJWT, updateUser)
  .delete(verifyUserJWT, deleteUser);

router.route("/refreshToken").post(refreshUserToken);

router.route("/forgotPassword").post(forgotPasswordLink);
router.route("/emailVerify").post(emailVerify);

export default router;
