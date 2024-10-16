import { Router } from "express";
import {
  createTest,
  getAllTest,
  getOneTest,
  updateTest,
  removeTest,
  filterTests,
  getTestByCategory,
} from "../controllers/test.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyAdminJWT } from "../middlewares/admin.auth.middleware.js";

const router = Router();

router
  .route("/")
  .post(verifyAdminJWT, upload.single("mainImage"), createTest)
  .get(getAllTest);

router.route("/:categoryId").get(getTestByCategory);

router
  .route("/:testId")
  .get(getOneTest)
  .put(verifyAdminJWT, upload.single("mainImage"), updateTest)
  .delete(verifyAdminJWT, removeTest);

router.route("/filterTests").get(filterTests);

export default router;
