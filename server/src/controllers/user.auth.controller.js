import {
  EMAIL_VERIFY_PAGE,
  cookieOptions,
  RESET_PASS_PAGE,
} from "../constants.js";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { SendEmail } from "../utils/SendMail.js";
import moment from "moment-timezone";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

const ignoreFields =
  "-password -refreshToken -emailVerificationExpiry -emailVerificationToken -createdAt";

const findUser = async (username, email) => {
  try {
    return await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
  } catch (error) {
    throw new ApiError(500, `Something went wrong error - ${error}`);
  }
};

const generateToken = async (user) => {
  try {
    const verificationToken = await user.generateTemporaryToken();
    const { unHashedToken, hashedToken, tokenExpiry } = verificationToken;

    const now = new Date();
    const addTime = 20 * 60 * 1000;
    const expiry = new Date(now.getTime() + addTime);

    return { unHashedToken, hashedToken, tokenExpiry, expiry };
  } catch (error) {
    throw new ApiError(500, `Something went wrong error - ${error}`);
  }
};

export const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = await req.body;

  if (!name || !username || !email || !password) {
    throw new ApiError(400, "missing required fields");
  }

  const existingUser = await findUser(username, email);

  if (existingUser) {
    if (existingUser.email === email) {
      throw new ApiError(409, "email already exists");
    }

    if (existingUser.username === username) {
      throw new ApiError(409, "username already taken");
    }
  }

  const data = {
    name: name,
    email: email,
    username: username.toLowerCase(),
    password: password,
  };

  const newUser = await User.create(data);

  if (!newUser) {
    throw new ApiError(500, "something went worng");
  }

  const token = await generateToken(newUser);
  const newUserInfo = await User.findByIdAndUpdate(
    newUser._id,
    {
      $set: {
        emailVerificationToken: token.hashedToken,
        emailVerificationExpiry: token.expiry,
      },
    },
    { new: true }
  ).select(ignoreFields);

  const basePath = process.env.CORS_ORIGIN;
  const emailData = {
    email: newUserInfo.email,
    template: "ConfirmEmail",
    url: `${basePath}${EMAIL_VERIFY_PAGE}?token=${token.unHashedToken}`,
    subject: "Email Verification",
  };
  await SendEmail(emailData);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { userInfo: newUserInfo },
        "user registered successfully"
      )
    );
});

export const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = await req.body;

  const userAgent = req.useragent;

  const deviceInfo = {
    isMobile: userAgent.isMobile,
    isTablet: userAgent.isTablet,
    isDesktop: userAgent.isDesktop,
    isBot: userAgent.isBot,
    browser: userAgent.browser,
    version: userAgent.version,
    os: userAgent.os,
    platform: userAgent.platform,
    source: userAgent.source,
  };

  if (!email && !username) {
    throw new ApiError(400, "missing required fields");
  }

  if (!password) {
    throw new ApiError(400, "missing required fields");
  }

  const user = await findUser(username, email);

  if (!user) {
    throw new ApiError(404, "user not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(500, "invalid credentials");
  }

  if (!user.isEmailVerified) {
    const currentDate = new Date();
    const tokenExpired = user?.emailVerificationExpiry < currentDate;

    if (!tokenExpired) {
      throw new ApiError(
        310,
        "your email has not been verified. A verification link already sent to your email address"
      );
    }

    const token = await generateToken(user);
    const basePath = process.env.CORS_ORIGIN;
    const emailData = {
      email: user.email,
      template: "ConfirmEmail",
      url: `${basePath}${EMAIL_VERIFY_PAGE}?token=${token.unHashedToken}`,
      subject: "Email Verification",
    };

    await SendEmail(emailData);

    await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          emailVerificationToken: token.hashedToken,
          emailVerificationExpiry: token.expiry,
        },
      },
      { new: true }
    );

    throw new ApiError(
      310,
      "your email has not been verified. A verification link has been sent to your email address"
    );
  }

  const refreshToken = await user.generateRefreshToken();
  const accessToken = await user.generateAccessToken();

  const loggedInUserInfo = await User.findByIdAndUpdate(
    user?._id,
    { $set: { refreshToken: refreshToken } },
    { new: true }
  ).select(ignoreFields);

  if (!loggedInUserInfo) {
    throw new ApiError(500, "something went worng");
  }

  // const formattedDate = moment(loggedInUserInfo.updatedAt)
  //   .tz("Asia/Kolkata")
  //   .format("MMMM D, YYYY [at] h:mm A");
  // await Notification.create({
  //   user: loggedInUserInfo._id,
  //   notification: `Your account logged in from ${deviceInfo.os} (${deviceInfo.browser}) on ${formattedDate}`,
  // });

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { userInfo: loggedInUserInfo },
        "user login successfully"
      )
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
        emailVerificationToken: 1,
        emailVerificationExpiry: 1,
        forgotPasswordToken: 1,
        forgotPasswordExpiry: 1,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, "user logged out"));
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await req.user;
  return res
    .status(200)
    .json(
      new ApiResponse(200, { userInfo: user }, "user fetched successfully")
    );
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await req.user;

  let deleteUser = user;
  const findUser = await User.findById(id);

  if (!findUser) {
    throw new ApiError(404, "user not found");
  }
  deleteUser = findUser;

  if (id == user._id) {
    deleteUser = user;
  }

  if (id != user._id) {
    throw new ApiError(500, "you don't have access");
  }

  const deletedUser = await User.findByIdAndDelete(deleteUser?._id);
  if (!deletedUser) {
    throw new ApiError(500, "something went worng");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "user deleted successfully"));
});

export const updateUser = asyncHandler(async (req, res) => {
  const { name, username, email, password, newPassword } = req.body;
  const { id } = req.params;
  const user = req.user;

  console.log(name, username, email, password, newPassword);

  if (!name && !username && !email && !newPassword) {
    throw new ApiError(404, "no update data provided");
  }

  const findUser = await User.findById(id);
  if (!findUser) {
    throw new ApiError(404, "user not found");
  }
  const updateUser = findUser;

  if (id != user._id) {
    throw new ApiError(500, "you don't have access");
  }

  if (password) {
    const isPasswordCorrect = await findUser.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      throw new ApiError(401, "worng password");
    }
  }

  const updateData = {};

  if (name) {
    updateData.name = name;
  }

  if (username) {
    updateData.username = username;
  }

  if (email) {
    const token = await generateToken(user);
    const basePath = process.env.CORS_ORIGIN;
    const emailData = {
      email: user.email,
      template: "ConfirmEmail",
      url: `${basePath}${EMAIL_VERIFY_PAGE}?token=${token.unHashedToken}`,
      subject: "Email Verification",
    };
    await SendEmail(emailData);

    updateData.email = email;
    updateData.isEmailVerified = false;
    updateData.emailVerificationToken = token.hashedToken;
    updateData.emailVerificationExpiry = token.expiry;
  }

  if (newPassword) {
    updateData.password = await bcrypt.hash(newPassword, 10);
  }

  const userInfo = await User.findByIdAndUpdate(
    updateUser._id,
    { $set: updateData },
    { new: true }
  ).select(ignoreFields);

  const message = `details updated. ${
    email ? "email verification link sent to your new email" : ""
  }`;
  return res
    .status(200)
    .json(new ApiResponse(200, { userInfo: userInfo }, message));
});

export const forgotPasswordLink = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "missing required fields");
  }

  const user = await User.findOne({
    $or: { email: email },
  });

  if (!user) {
    throw new ApiError(404, "user not found");
  }

  const token = await generateToken(user);
  const basePath = process.env.CORS_ORIGIN;
  const emailData = {
    email: user.email,
    template: "ForgotPassword",
    url: `${basePath}${RESET_PASS_PAGE}?token=${token.unHashedToken}`,
    subject: "Reset Your Password",
  };

  await SendEmail(emailData);
  await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        forgotPasswordToken: token.hashedToken,
        forgotPasswordExpiry: token.expiry,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { userInfo: user.email },
        "A Password Reset link has been sent to your email address"
      )
    );
});

export const refreshUserToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken || req.body.refreshToken;

  if (!token) {
    throw new ApiError(401, "unauthorized request");
  }

  const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  const user = await User.findById(decodedToken._id);

  if (!user) {
    await User.findByIdAndUpdate(
      req.user?._id,
      {
        $unset: {
          refreshToken: 1,
          emailVerificationToken: 1,
          emailVerificationExpiry: 1,
          forgotPasswordToken: 1,
          forgotPasswordExpiry: 1,
        },
      },
      { new: true }
    );

    return res
      .status(200)
      .clearCookie("accessToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions)
      .json(new ApiResponse(200, "user logged out"));
  }

  const newRefreshToken = await user.generateRefreshToken();
  const newAccessToken = await user.generateAccessToken();

  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        refreshToken: newRefreshToken,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .cookie("accessToken", newAccessToken, cookieOptions)
    .cookie("refreshToken", newRefreshToken, cookieOptions)
    .json(new ApiResponse(200, { userInfo: user }, "access token refreshed"));
});

export const emailVerify = asyncHandler(async (req, res) => {
  const { token } = req.body;

  if (!token) {
    throw new ApiError(404, "token not found");
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  console.log(hashedToken);

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
  });

  if (!user) {
    throw new ApiError(404, "user not found");
  }

  const currentDate = new Date();
  const tokenExpired = user.emailVerificationExpiry < currentDate;

  if (tokenExpired) {
    throw new ApiError(500, "token has expired");
  }

  await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        isEmailVerified: true,
      },
      $unset: {
        emailVerificationToken: 1,
        emailVerificationExpiry: 1,
      },
    },
    { new: true }
  );

  return res.status(200).json(200, "user verified successfully");
});
