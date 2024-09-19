import dotenv from "dotenv";
import app from "./src/app.js";
import { PORT } from "./src/constants.js";
import { connectDB } from "./src/db/connect.js";
import Razorpay from "razorpay";

// dotenv configuration
dotenv.config();

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// database connection promise
connectDB()
  .then(() => {
    app.listen(process.env.PORT || PORT, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT || PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
