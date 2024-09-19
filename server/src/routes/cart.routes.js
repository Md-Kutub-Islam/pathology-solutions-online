import { Router } from "express";
import {
  addOrUpdateCart,
  clearCart,
  fetchUserCart,
  removeFromCart,
} from "../controllers/cart.controller.js";
import { verifyUserJWT } from "../middlewares/user.auth.middlewares.js";

const router = Router();

router.use(verifyUserJWT);

router.route("/").get(fetchUserCart);

router.route("/addorupdatetocart").put(addOrUpdateCart);
router.route("/removeitemfromcart/:testId").patch(removeFromCart);
router.route("/clearcart").patch(clearCart);

export default router;
