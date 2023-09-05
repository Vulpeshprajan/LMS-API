import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  try {
    console.log(req.body);

    res.json({
      status: "success",
      message: "Your book has been burrowed and updated in the system",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
