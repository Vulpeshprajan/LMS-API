import express from "express";
import { insertUser } from "../models/user/UserModel.js";
const router = express.Router();

router.get("/", (req, res) => {
  try {
    console.log(req.body);
    res.json({
      status: "success",
      message: "Connected to user information",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await insertUser(req.body);
    user?._id
      ? res.json({
          status: "success",
          message: "New user has been created successfully",
          user,
        })
      : res.json({
          status: "error",
          message: "Unable to create user, try again later",
          user,
        });
  } catch (error) {
    let msg = error.message;

    if (msg.includes("E11000 duplicate key error collection")) {
      msg = "There is another user who uses the email in the system";
    }
    res.json({
      status: "error",
      message: msg,
    });
  }
});

export default router;
