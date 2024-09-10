import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    items: {
      type: [
        {
          testId: {
            type: Schema.Types.ObjectId,
            ref: "tests",
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Cart = new mongoose.model("carts", cartSchema);
export default Cart;
