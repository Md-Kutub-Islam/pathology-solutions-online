import { Router } from "express";

import {
  emailVerify,
  loginUser,
  registerUser,
} from "../controllers/user.auth.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/emailVerify").post(emailVerify);

export default router;
