import { Router } from "express";
import { verifyAdminJWT } from "../middlewares/admin.auth.middleware.js";
import { verifyUserJWT } from "../middlewares/user.auth.middlewares.js";
import {
  addOrder,
  deleteOrder,
  getAllOrder,
  // getOrder,
  updateOrder,
} from "../controllers/order.controller.js";

const router = Router();

router.route("/").get(verifyUserJWT, getAllOrder);

router.route("/:userId").post(verifyUserJWT, addOrder); ///:labId

router
  .route("/:userId/:orderId")
  // .get(verifyUserJWT, getOrder)
  .put(verifyUserJWT, updateOrder)
  .delete(verifyUserJWT, deleteOrder);

export default router;
