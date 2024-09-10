import { Router } from "express";
import { addOrUpdateCart } from "../controllers/cart.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.use(verifyJWT);

// router.route('/').get(fetchUserCart);

router.route("/addorupdatetocart").put(addOrUpdateCart);

export default router;
