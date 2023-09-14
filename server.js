import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 8000;

// connect database
import connectMongoDB from "./src/config/mongoConfig.js";
connectMongoDB();

//middlewares

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// apis
import useRouter from "./src/routers/userRouter.js";
import bookRouter from "./src/routers/bookRouter.js";
import burrowRouter from "./src/routers/burrowRouter.js";
import reviewRouter from "./src/routers/reviewRouter.js";
import { auth } from "./src/middleware/authMiddleware.js";
app.use("/api/v1/user", useRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/burrow", auth, burrowRouter);
app.use("/api/v1/review", reviewRouter);

app.use("/", (req, res) => {
  res.json({
    status: "success",
    message: "Server running well",
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error.message)
    : console.log(`Server running at http://localhost:${PORT}`);
});
