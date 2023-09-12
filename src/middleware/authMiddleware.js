import { getUserById } from "../models/user/UserModel.js";

export const auth = async (req, res, next) => {
  try {
    // every request have userId
    const { authorization } = req.headers;

    //get the user from database,

    const user = await getUserById(authorization);

    if (user?._id) {
      //check the role
      user.password = undefined;

      req.userInfo = user;
      // let it go to next router
      return next();
    }

    // stop here and response to client

    res.json({
      status: "error",
      message: "sorry , you do not have permission to this api",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

export const adminAuth = async (req, res, next) => {
  try {
    const { role } = req.userInfo;
    console.log(role);

    role === "admin"
      ? next()
      : res.json({
          status: "error",
          message: "Not allowed becasue you are not admin. ",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};
