import { orderStatus, availablePaymentMethod } from "../constants.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ObjectId } from "mongodb";
import Order from "../models/order.model.js";
import Test from "../models/test.model.js";
import Payment from "../models/payment.model.js";
import { getOrderInfoPipeline } from "../utils/pipeline/orderInfo.js";
import { getItemsPipeline } from "../utils/pipeline/orderIteminfo.js";

export const getAllOrder = asyncHandler(async (req, res) => {
  const { labId } = req.params;
  const admin = await req.admin;

  if (!labId) {
    throw new ApiError(500, "Please provide a lab id in params");
  }

  if (!admin && admin._id !== labId) {
    throw new ApiError(500, "you don't have access");
  }

  const order = await Order.find({ lab: labId }).sort({
    createdAt: -1,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { ordersInfo: order },
        "All orders retrieved successfully"
      )
    );
});

export const getOrder = asyncHandler(async (req, res) => {
  const user = await req.user;
  const admin = await req.admin;
  const { userId, orderId } = await req.params;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  if (!userId && !orderId && !admin) {
    throw new ApiError(500, "you don't have access");
  }

  if (!user) {
    throw new ApiError(500, "you don't have access");
  }

  if (userId && user._id != userId) {
    throw new ApiError(500, "you don't have access");
  }

  const orderPipeline = [...getOrderInfoPipeline];
  if (userId && !orderId) {
    orderPipeline.unshift({
      $match: {
        customer: new ObjectId(userId),
      },
    });
  }

  if (userId && orderId) {
    orderPipeline.unshift({
      $match: {
        _id: new ObjectId(orderId),
        customer: new ObjectId(userId),
      },
    });
  }

  orderPipeline.push({ $skip: skip }, { $limit: limit });

  const data = await Order.aggregate(orderPipeline);
  if (!data) {
    throw new ApiError(500, `failed to retrieve order data - ${data}`);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { orderInfo: data }, "order data retrieved"));
});

export const addOrder = asyncHandler(async (req, res) => {
  const user = req.user;
  const { labId, userId } = req.params;
  const { items, addressId, paymentMethod } = req.body;

  if (!labId && !userId) {
    throw new ApiError(404, "please provide user id and lab id in params");
  }

  if (userId != user._id) {
    throw new ApiError(500, "you don't have access");
  }

  if (!items || !addressId || !paymentMethod) {
    throw new ApiError(404, "please provide required fields");
  }

  if (!Array.isArray(items)) {
    return res
      .status(400)
      .json({ error: "items must be provided in an array" });
  }

  for (const item of items) {
    if (!item.testId) {
      throw new ApiError(400, "each item must have a valid productId");
    }
  }

  const itemsPipeline = await getItemsPipeline(items);
  const itemProductData = await Test.aggregate(itemsPipeline);

  if (!itemProductData) {
    throw new ApiError(500, "something went worng");
  }

  const orderData = {
    items: items,
    customer: userId,
    lab: labId,
    address: addressId,
    status: orderStatus.PENDING,
  };

  const newOrder = await Order.create(orderData);
  if (!newOrder) {
    throw new ApiError(500, "order not created");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        orderInfo: newOrder,
      },
      "order created successfully"
    )
  );
});

export const updateOrder = asyncHandler(async (req, res) => {
  const user = await req.user;
  const { userId, orderId } = await req.params;
  const { status, paymentStatus } = await req.body;

  if (!userId || !orderId) {
    throw new ApiError(404, "please provide params");
  }

  if (!status && !paymentStatus) {
    throw new ApiError(404, "please provide update data");
  }

  if (!user) {
    throw new ApiError(500, "you don't have access");
  }

  const updateData = {};
  if (status) {
    updateData.status = status;
  }

  if (paymentStatus) {
    updateData.isPaymentDone = paymentStatus;
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { $set: updateData },
    { new: true }
  );

  const orderPipeline = [...getOrderInfoPipeline];
  orderPipeline.unshift({
    $match: {
      _id: new ObjectId(updatedOrder._id),
    },
  });

  const orderInfo = await Order.aggregate(orderPipeline);
  if (!orderInfo) {
    throw new ApiError(500, "something went worng");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { orderInfo: orderInfo[0] },
        "order data updated successfully"
      )
    );
});

export const deleteOrder = asyncHandler(async (req, res) => {
  const user = await req.user;
  const { userId, orderId } = await req.params;

  if (!user) {
    throw new ApiError(500, "you don't have access");
  }

  if (!userId || !orderId) {
    throw new ApiError(404, "please provide param");
  }

  if (orderId) {
    const deleteOrder = await Order.findByIdAndDelete(orderId);
    if (!deleteOrder) {
      throw new ApiError(500, "failed to delete order");
    }
  }

  if (!orderId && userId) {
    const deleteOrder = await Order.deleteMany({ customer: userId });
    if (!deleteOrder) {
      throw new ApiError(500, "failed to delete order");
    }
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "order deleted successfully"));
});
