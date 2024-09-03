import { Router } from "express";
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  getCurrentAdmin,
  updateAdmin,
  deleteAdmin,
  forgotPasswordLink,
  emailVerify,
  refreshUserToken,
} from "../controllers/admin.auth.controller.js";
import { verifyJWT } from "../middlewares/admin.auth.middleware.js";

const router = Router();

router.route("/register").post(registerAdmin);
router.route("/login").post(loginAdmin);
router.route("/logout").post(verifyJWT, logoutAdmin);

router.route("/admin").get(verifyJWT, getCurrentAdmin);
router.route("/:id").put(verifyJWT, updateAdmin).delete(verifyJWT, deleteAdmin);

router.route("/refreshToken").post(refreshUserToken);

router.route("/forgotPassword").post(forgotPasswordLink);
router.route("/emailVerify").post(emailVerify);

export default router;
