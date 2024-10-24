import mongoose, { Schema } from "mongoose";
import { orderStatusEnum } from "../constants.js";

const orderSchema = new Schema({
  orderPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  items: {
    type: [
      {
        testId: {
          type: Schema.Types.ObjectId,
          ref: "tests",
        },
        labId: {
          type: Schema.Types.ObjectId,
          ref: "admis",
        },
      },
    ],
    default: [],
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  status: {
    type: String,
    enum: orderStatusEnum,
  },
  paymentId: {
    type: Schema.Types.ObjectId,
    ref: "payments",
  },
  isPaymentDone: {
    type: Boolean,
    default: false,
  },
});

const Order = mongoose.model("orders", orderSchema);
export default Order;
