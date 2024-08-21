import dotenv from "dotenv";
import app from "./src/app.js";
import { PORT } from "./src/constants.js";
import { connectDB } from "./src/db/connect.js";

// dotenv configuration
dotenv.config();

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
