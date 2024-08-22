import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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

  // const basePath = process.env.CORS_ORIGIN;
  // const emailData = {
  //   email: newUserInfo.email,
  //   template: 'ConfirmEmail',
  //   url: `${basePath}${EMAIL_VERIFY_PAGE}?token=${token.unHashedToken}`,
  //   subject: 'Email Verification',
  // };
  // await SendEmail(emailData);

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
