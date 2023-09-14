import ReviewSchema from "./ReviewSchema.js";

export const addReview = (obj) => {
  return ReviewSchema(obj).save();
};

// all burrow transaction for admin user only
export const getReviews = () => {
  return ReviewSchema.find();
};
// all burrow transaction for individual user of their own
// export const getBurrowbyUserId = (userId) => {
//   return BurrowSchema.find({ userId });
// };

export const updateReview = (_id, data) => {
  return ReviewSchema.findByIdAndUpdate(_id, data);
};

export const deleteReview =(_id) => {
  return ReviewSchema.findByIdAndDelete(_id);
};
