import { Router } from "express";
import {
  createAdress,
  getCurrentAddress,
  removeAddress,
  updateAddress,
} from "../controllers/address.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router
  .route("/:userId")
  .post(verifyJWT, createAdress)
  .get(verifyJWT, getCurrentAddress);

router
  .route("/:userId/:addressId")
  .put(verifyJWT, updateAddress)
  .delete(verifyJWT, removeAddress);

export default router;
