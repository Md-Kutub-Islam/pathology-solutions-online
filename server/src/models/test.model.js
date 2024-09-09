import mongoose, { Schema } from "mongoose";

const testSchema = new Schema(
  {
    testname: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    mainImage: {
      required: true,
      type: {
        url: String,
        public_id: String,
        secure_url: String,
        width: Number,
        height: Number,
        format: String,
      },
    },
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
  },
  { timestamps: true }
);

const Test = mongoose.model("tests", testSchema);
export default Test;
