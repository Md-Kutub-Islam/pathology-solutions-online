import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const accessToken =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  const refreshToken =
    req.cookies?.refreshToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!accessToken || !refreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  const decodedAccessToken = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET
  );
  const decodedRefreshToken = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  if (decodedAccessToken._id != decodedRefreshToken._id) {
    throw new ApiError(401, "invalid user");
  }

  const admin = await Admin.findById(decodedAccessToken._id).select(
    "-password -refreshToken"
  );

  if (!admin) {
    throw new ApiError(401, "invalid access token");
  }

  req.admin = admin;
  next();
});

export const verifyPermission =
  (roles = []) =>
  async (req, res, next) => {
    if (!req.admin?._id) {
      return res
        .status(401)
        .json({ success: false, msg: "Unauthorized request" });
    }

    if (roles.includes(req.admin?.role)) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        msg: "You're not allowed to perform this task",
      });
    }
  };
