import { Router } from "express";
import {
  createTest,
  getAllTest,
  getOneTest,
  updateTest,
  removeTest,
  filterTests,
} from "../controllers/test.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/admin.auth.middleware.js";

const router = Router();

router
  .route("/")
  .post(verifyJWT, upload.single("mainImage"), createTest)
  .get(getAllTest);

router
  .route("/:testId")
  .get(getOneTest)
  .put(verifyJWT, upload.single("mainImage"), updateTest)
  .delete(verifyJWT, removeTest);

router.route("/filterTests").get(filterTests);

export default router;
