import express from "express";
import {auth  } from "../middleware/authMiddleware.js";
import { addReview } from "../models/review/ReviewModel.js";

const router = express.Router()

router.post("/", auth, async(req,res) => {
    try {
    console.log(req.body);

    const result = await addReview(req.body)
    if(result?._id){
    return res.json({
            status: "success",
            message: "Your review has been recieved"

           }) 
        }
     res.json({
            status: "error",
            message: "Unable to receive your review, try again"

           }) 



    } catch (error) {
        res.json({
            status: "error",
            message: error.message


        })
    }


})

export default router