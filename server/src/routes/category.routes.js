import { Router } from "express";
import {
  createCategory,
  getAllCategory,
  getOneCategory,
  removeCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import { verifyJWT } from "../middlewares/admin.auth.middleware.js";

const router = Router();

router.route("/").post(verifyJWT, createCategory).get(getAllCategory);

router
  .route("/:categoryId")
  .get(getOneCategory)
  .post(verifyJWT, updateCategory)
  .delete(verifyJWT, removeCategory);

export default router;
