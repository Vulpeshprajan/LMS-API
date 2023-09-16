import ReviewSchema from "./ReviewSchema.js";

export const addReview = (obj) => {
  return ReviewSchema(obj).save();
};

// all review transaction for admin user only
export const getReviews = () => {
  return ReviewSchema.find();
};
// all review transaction for individual user of their own
// export const getreviewbyUserId = (userId) => {
//   return reviewSchema.find({ userId });
// };

export const updateReview = (_id, data) => {
  return ReviewSchema.findByIdAndUpdate(_id, data);
};

export const deleteReview = (_id) => {
  return ReviewSchema.findByIdAndDelete(_id);
};
