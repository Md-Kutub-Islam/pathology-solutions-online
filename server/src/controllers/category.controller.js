import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Category from "../models/category.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { availableUserRoles } from "../constants.js";

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const img = req.file;
  const admin = await req.admin;

  if (!name || !img) {
    throw new ApiError(400, "All fields are required");
  }
  if (!name) {
    throw new ApiError(400, "All fields are required");
  }
  if (admin.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

  const uploadOptions = {
    folder: "avatar",
    // gravity: 'faces',
    width: 200,
    height: 200,
    crop: "fit",
  };

  const uploadedImg = await uploadOnCloudinary(img.path, uploadOptions, {
    folder: "category-images",
  });

  if (!uploadedImg) {
    throw new ApiError(500, "Error occured while uploading the image");
  }

  if (uploadedImg.http_code === 400) {
    throw new ApiError(500, `error uploading image: ${uploadedImg?.message}`);
  }

  const category = await Category.create({
    name,
    image: {
      url: uploadedImg.url,
      public_id: uploadedImg.public_id,
      secure_url: uploadedImg.secure_url,
      width: uploadedImg.width,
      height: uploadedImg.height,
      format: uploadedImg.format,
    },
    owner: admin.id,
  });

  if (!category) {
    throw new ApiError(500, "Failed to create category, please try again");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { categoryInfo: category },
        "Category created successfully"
      )
    );
});

export const getAllCategory = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const category = await Category.find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { categoryInfo: category },
        "Category retrieved successfully"
      )
    );
});

export const getOneCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(404, `Category with id ${categoryId} not found`);
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { categoryInfo: category },
        "Category retrieved successfully"
      )
    );
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { categoryId } = await req.params;
  const { name } = await req.body;
  const admin = await req.admin;
  const image = req.file;

  if (admin.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(404, `Category with id ${categoryId} not found`);
  }

  const updateData = {};
  if (name) {
    updateData.name = name;
  }

  if (image) {
    const uploadOptions = {
      folder: "category-images",
    };

    const img = await uploadOnCloudinary(image.path, uploadOptions);
    if (!img) {
      throw new ApiError(500, `something went worng error`);
    }

    if (img.http_code === 400) {
      throw new ApiError(500, `error uploading image: ${img?.message}`);
    }

    const imgData = {
      url: img.url,
      public_id: img.public_id,
      secure_url: img.secure_url,
      width: img.width,
      height: img.height,
      format: img.format,
    };

    updateData.image = imgData;
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    categoryId,
    { $set: updateData },
    { new: true }
  );

  if (!updatedCategory) {
    throw new ApiError(500, "something went worng");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { categoryInfo: updatedCategory },
        "Category updated successfully"
      )
    );
});

export const removeCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const admin = req.admin;

  if (admin.role != availableUserRoles.ADMIN) {
    throw new ApiError(500, "you don't have access");
  }

  const category = await Category.findById(categoryId);

  if (!category) {
    throw new ApiError(404, `Category with id ${id} not found`);
  }

  await Category.findByIdAndDelete(categoryId);
  return res
    .status(200)
    .json(new ApiResponse(200, "Category deleted successfully"));
});
