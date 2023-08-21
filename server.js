import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";

const app = express();

const PORT = process.env.PORT || 8000;

// connect  database
import connectMongoDB from "./src/config/mongoConfig.js";
connectMongoDB();

// middlewares
app.use(morgan("dev"));
app.use(express.json());

// apis
import userRouter from "./src/routers/userRouter.js";

app.use("/api/v1/user", userRouter);

app.use("/", (req, res) => {
  res.json({
    status: "success",
    message: "Server connected",
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error.message)
    : console.log(`Server running at http://localhost:${PORT}`);
});
