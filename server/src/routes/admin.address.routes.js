import { Router } from "express";
import {
  createAdress,
  getCurrentAddress,
  removeAddress,
  updateAddress,
} from "../controllers/address.controller.js";
import { verifyAdminJWT } from "../middlewares/admin.auth.middleware.js";

const router = Router();

router
  .route("/:adminId")
  .post(verifyAdminJWT, createAdress)
  .get(verifyAdminJWT, getCurrentAddress);

router
  .route("/:adminId/:addressId")
  .put(verifyAdminJWT, updateAddress)
  .delete(verifyAdminJWT, removeAddress);

export default router;
