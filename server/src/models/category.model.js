import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: {
        url: String,
        public_id: String,
        secure_url: String,
        width: Number,
        height: Number,
        format: String,
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "admin",
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("categories", categorySchema);

export default Category;
