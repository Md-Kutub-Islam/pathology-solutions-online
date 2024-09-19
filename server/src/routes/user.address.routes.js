import { Router } from "express";
import {
  createAdress,
  getCurrentAddress,
  removeAddress,
  updateAddress,
} from "../controllers/address.controller.js";
import { verifyUserJWT } from "../middlewares/user.auth.middlewares.js";

const router = Router();

router
  .route("/:userId")
  .post(verifyUserJWT, createAdress)
  .get(verifyUserJWT, getCurrentAddress);

router
  .route("/:userId/:addressId")
  .put(verifyUserJWT, updateAddress)
  .delete(verifyUserJWT, removeAddress);

export default router;
