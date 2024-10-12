import { Router } from "express";
import {
  searchCategory,
  searchLab,
  searchTest,
} from "../controllers/search.controller.js";

const routes = Router();

routes.route("/search-test/:item").get(searchTest);
routes.route("/search-lab/:item").get(searchLab);
routes.route("/search-category/:item").get(searchCategory);

export default routes;
