import express from "express";
import { getUserByEmail, insertUser } from "../models/user/UserModel.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
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
    const { password } = req.body;
    req.body.password = hashPassword(password);

    const user = await insertUser(req.body);
    user?._id
      ? res.json({
          status: "success",
          message: "New user has been created successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to create user, try again later",
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

router.post("/login", async (req, res) => {
  try {
    // get the data
    console.log(req.body);

    const { email, password } = req.body;
    // check if the user exit with received email and get user from db

    const user = await getUserByEmail(email);
    if (user?._id) {
      // use bcrypt to check if password is matching

      const isMatch = comparePassword(password, user.password);
      console.log(isMatch);
    }

    res.json({
      status: "success",
      message: "login successfully",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
