const Review = require('../models/reviews.model');
const User = require('../models/users.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validReviewByIds = catchAsync(async (req, res, next) => {
  const { restaurantId, id } = req.params;

  const review = await Review.findOne({
    where: {
      status: true,
      restaurantId,
      id,
    },
    include: [
      {
        model: User,
      },
    ],
  });

  if (!review) {
    return next(new AppError('Review not found', 404));
  }

  req.user = review.user;
  req.review = review;
  next();
});
