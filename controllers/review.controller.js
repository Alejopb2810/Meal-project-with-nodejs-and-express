const Review = require('../models/reviews.model');
const catchAsync = require('../utils/catchAsync');

exports.createReviewOfRestaurant = catchAsync(async (req, res, next) => {
  const { comment, rating, restaurantId, userId } = req.body;
  const { sessionUser } = req;
  const newReview = await Review.create({
    comment: comment.toLowerCase(),
    rating,
    restaurantId,
    userId: sessionUser.id,
  });

  res.status(200).json({
    status: 'success',
    message: 'Review created successfully',
    newReview,
  });
});

exports.updateReviewOfRestaurant = catchAsync(async (req, res, next) => {});
