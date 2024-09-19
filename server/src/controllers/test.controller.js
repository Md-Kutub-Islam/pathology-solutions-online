import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Test from "../models/test.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { availableUserRoles } from "../constants.js";

export const createTest = asyncHandler(async (req, res) => {
  const { testname, description, price, category } = req.body;
  const uploadedFile = await req.file;
  const admin = await req.admin;

  if (!testname || !description || !price || !category || !uploadedFile) {
    throw new ApiError(400, "All fields are required");
  }

  if (admin.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

  const uploadOptions = {
    folder: "mainImage",
    width: 200,
    height: 200,
    crop: "fit",
  };

  const img = await uploadOnCloudinary(uploadedFile.path, uploadOptions);

  if (!img || img.http_code === 400) {
    throw new ApiError(500, "Error uploading image to Cloudinary");
  }

  const testData = {
    testname,
    description,
    price,
    category,
    mainImage: {
      url: img.url,
      public_id: img.public_id,
      secure_url: img.secure_url,
      width: img.width,
      height: img.height,
      format: img.format,
    },
  };

  const test = await Test.create(testData);

  if (!test) {
    throw new ApiError(500, "Failed to create test");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { testInfo: test }, "Test created successfully")
    );
});

export const getAllTest = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const tests = await Test.find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return res
    .status(200)
    .json(
      new ApiResponse(200, { testInfo: tests }, "Tests retrieved successfully")
    );
});

export const getOneTest = asyncHandler(async (req, res) => {
  const { testId } = req.params;

  const test = await Test.findById(testId);

  if (!test) {
    throw new ApiError(404, `Test with id ${testId} not found`);
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { testInfo: test }, "Test retrieved successfully")
    );
});

export const updateTest = asyncHandler(async (req, res) => {
  const { testId } = req.params;
  const uploadedFile = req.file;
  const { testname, description, price, category } = req.body;
  const admin = await req.admin;

  if (admin.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

  let imageData;
  if (uploadedFile) {
    const uploadOptions = {
      folder: "mainImage",
      width: 800,
      height: 600,
      crop: "fit",
    };
    const img = await uploadOnCloudinary(uploadedFile.path, uploadOptions);
    imageData = {
      url: img.url,
      public_id: img.public_id,
      secure_url: img.secure_url,
      width: img.width,
      height: img.height,
      format: img.format,
    };
  }

  const test = await Test.findById(testId);
  if (!test) {
    throw new ApiError(404, "Test not found");
  }

  if (testname) {
    test.testname = testname;
  }
  if (description) {
    test.description = description;
  }
  if (price) {
    test.price = price;
  }
  if (category) {
    test.category = category;
  }
  if (imageData) {
    test.mainImage = imageData;
  }

  await test.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, { testInfo: test }, "Test updated successfully")
    );
});

export const removeTest = asyncHandler(async (req, res) => {
  const { testId } = req.params;
  const admin = await req.admin;
  const test = await Test.findById(testId);

  if (!admin) {
    throw new ApiError(500, "you don't have access");
  }

  if (!test) {
    throw new ApiError("Test not found", 404);
  }

  await Test.findByIdAndDelete(testId);

  return res
    .status(200)
    .json(new ApiResponse(200, "Test deleted successfully"));
});

export const filterTests = asyncHandler(async (req, res) => {
  const { categoryId, sortBy } = req.query;
  // the sortBy should be either `high_to_low` or `low_to_high`

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const query = {};
  if (categoryId) {
    query.category = categoryId;
  }

  let sort = {};
  if (sortBy === "low_to_high") {
    sort = { price: 1 };
  } else if (sortBy === "high_to_low") {
    sort = { price: -1 };
  }

  if (!categoryId) {
    throw new ApiError(400, "Category ID required to filer products");
  }

  const tests = await Test.find(query).sort(sort).skip(skip).limit(limit);

  if (!tests) {
    throw new ApiError(400, `No items found with the respective filter params`);
  }

  return res.status(200).json(new ApiResponse(200, tests, ""));
});
