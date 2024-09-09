import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import useragent from "express-useragent";
import authRouters from "./routes/user.auth.routes.js";
import adminAuthRouters from "./routes/admin.auth.routes.js";
import addressRoutes from "./routes/address.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import testRoutes from "./routes/test.routes.js";
import { BASEPATH } from "./constants.js";

const app = express();

// middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Test route
// /api/v1/healthcheck
// app.get(`${BASEPATH}/healthcheck`, (_, res) => {
//     try {
//       return res.status(200).json(new ApiResponse(200, {}, 'ok'));
//     } catch (error) {
//       console.log(error);
//       throw new ApiError(500, error.message);
//     }
//   });

// Auth & User Routes
app.use(`${BASEPATH}/auth`, useragent.express(), authRouters);
// Auth & Admin Routes
app.use(`${BASEPATH}/auth/admin`, useragent.express(), adminAuthRouters);
// Address Routes
app.use(`${BASEPATH}/address`, addressRoutes);
// Category Routes
app.use(`${BASEPATH}/category`, categoryRoutes);
// Tests Routes
app.use(`${BASEPATH}/test`, testRoutes);

export default app;
