import { Router } from "express";
import {
  allPayments,
  cancelSubscription,
  checkout,
  getRazorpayAPIKey,
  paymentVerification,
} from "../controllers/payment.controller.js";
import { verifyUserJWT } from "../middlewares/user.auth.middlewares.js";

const router = Router();

router.route("/checkout").post(verifyUserJWT, checkout);
router.route("/payment-varification").post(verifyUserJWT, paymentVerification);
router.route("/payment-cancel").post(verifyUserJWT, cancelSubscription);
router.route("/razorpay-key").get(verifyUserJWT, getRazorpayAPIKey);
router.route("/").get(allPayments);

export default router;
