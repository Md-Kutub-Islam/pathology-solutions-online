import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import Payment from "../models/payment.model.js";
import crypto from "crypto";
import { razorpay } from "../../index.js";
import Admin from "../models/admin.model.js";
import Order from "../models/order.model.js";

export const getRazorpayAPIKey = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { razorpayKeyId: process.env.RAZORPAY_KEY_ID },
        "Razorpay Api key"
      )
    );
});

export const checkout = asyncHandler(async (req, res) => {
  const user = req.user;
  const { amount } = req.body;
  const { labId, orderId } = req.params;

  const findUser = await User.findById(user._id);
  const findLab = await Admin.findById(labId);
  const findOrder = await Order.findById(orderId);

  if (!findUser) {
    throw new ApiError(404, "User not found");
  }

  if (!findLab && !findOrder) {
    throw new ApiError(404, "Lab and order not found");
  }

  const options = {
    amount: Number(amount * 100),
    currency: "INR",
  };

  const order = await razorpay.orders.create(options);

  if (!order) {
    throw new ApiError("Failed to create order, please try again", 500);
  }

  findLab.order = orderfindOrder._id;

  await findLab.save();

  return res
    .status(200)
    .json(new ApiResponse(200, { orderInfo: order }, "Order successfully"));
});

export const paymentVerification = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const user = req.user;

  const findUser = await User.findById(user._id);

  if (!findUser) {
    throw new ApiError(404, "User not found");
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    const paymentInfo = await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, { paymentInfo: paymentInfo }, "Payment sucessful")
      );
  }
});

export const cancelSubscription = asyncHandler(async (req, res) => {
  const { id } = req.user;

  // Finding the user
  const user = await User.findById(id);

  // Checking the user role
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Finding subscription ID from subscription
  const subscriptionId = user.subscription.id;

  // Creating a subscription using razorpay that we imported from the server
  const subscription = await razorpay.subscriptions.cancel(
    subscriptionId // subscription id
  );

  // Adding the subscription status to the user account
  user.subscription.status = subscription.status;

  // Saving the user object
  await user.save();

  return res.status(200).ApiResponse(200, {}, "Subscripton cancel sucessfully");
});

export const allPayments = asyncHandler(async (req, res) => {
  const { count, skip } = req.query;

  // Find all subscriptions from razorpay
  const allPayments = await razorpay.subscriptions.all({
    count: count ? count : 10, // If count is sent then use that else default to 10
    skip: skip ? skip : 0, // // If skip is sent then use that else default to 0
  });

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const finalMonths = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  };

  const monthlyWisePayments = allPayments.items.map((payment) => {
    // We are using payment.start_at which is in unix time, so we are converting it to Human readable format using Date()
    const monthsInNumbers = new Date(payment.start_at * 1000);

    return monthNames[monthsInNumbers.getMonth()];
  });

  monthlyWisePayments.map((month) => {
    Object.keys(finalMonths).forEach((objMonth) => {
      if (month === objMonth) {
        finalMonths[month] += 1;
      }
    });
  });

  const monthlySalesRecord = [];

  Object.keys(finalMonths).forEach((monthName) => {
    monthlySalesRecord.push(finalMonths[monthName]);
  });

  const allPaymentInfo = {
    allPayments,
    finalMonths,
    monthlySalesRecord,
  };

  res
    .status(200)
    .ApiResponse(200, { allPaymentsInfo: allPaymentInfo }, "All payments");
});
