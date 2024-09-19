import { Router } from "express";
import {
  createCategory,
  getAllCategory,
  getOneCategory,
  removeCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyAdminJWT } from "../middlewares/admin.auth.middleware.js";

const router = Router();

router
  .route("/")
  .post(verifyAdminJWT, upload.single("image"), createCategory)
  .get(getAllCategory);

router
  .route("/:categoryId")
  .get(getOneCategory)
  .put(verifyAdminJWT, upload.single("image"), updateCategory)
  .delete(verifyAdminJWT, removeCategory);

export default router;
