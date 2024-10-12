import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Admin from "../models/admin.model.js";
import Test from "../models/test.model.js";
import Category from "../models/category.model.js";

export const searchLab = asyncHandler(async (req, res) => {
  const { q } = req.query;
  const { item } = req.params;

  if (!q) {
    throw new ApiError(400, 'Query parameter "q" is required');
  }

  const searchResult = await Admin.find({
    labname: { $regex: q, $options: "i" },
  })
    .sort({ createdAt: -1 })
    .limit(item);

  return res
    .status(200)
    .json(new ApiResponse(200, { searchInfo: searchResult }, "Lab data"));
});

export const searchTest = asyncHandler(async (req, res) => {
  const { q } = req.query;
  const { item } = req.params;

  if (!q) {
    throw new ApiError(400, 'Query parameter "q" is required');
  }

  const searchResult = await Test.find({
    $or: [
      { testname: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
    ],
  })
    .sort({ createdAt: -1 })
    .limit(item);

  return res
    .status(200)
    .json(new ApiResponse(200, { searchInfo: searchResult }, "Tests data"));
});

export const searchCategory = asyncHandler(async (req, res) => {
  const { q } = req.query;
  const { item } = req.params;

  if (!q) {
    throw new ApiError(400, 'Query parameter "q" is required');
  }

  const searchResult = await Category.find({
    name: { $regex: q, $options: "i" },
  })
    .sort({ createdAt: -1 })
    .limit(item);

  return res
    .status(200)
    .json(new ApiResponse(200, { searchInfo: searchResult }, "category data"));
});
