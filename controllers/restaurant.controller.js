const Restaurant = require('../models/restaurants.model');
const Review = require('../models/reviews.model');
const catchAsync = require('../utils/catchAsync');

exports.getAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: {
      status: 'active',
    },
  });
  res.status(200).json({
    status: 'success',
    message: 'restaurants found successfully',
    restaurants,
  });
});

exports.getRestaurantById = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  return res.status(200).json({
    status: 'success',
    message: 'Product found successfully',
    restaurant,
  });
});

exports.createNewRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const restaurant = await Restaurant.create({
    name: name.toLowerCase(),
    address: address.toLowerCase(),
    rating,
  });

  res.status(200).json({
    status: 'success',
    message: 'restaurant created successfully',
    restaurant,
  });
});

exports.updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { name, address } = req.body;

  await restaurant.update({
    name,
    address,
  });

  res.status(200).json({
    status: 'success',
    message: 'Restaurant updated successfully',
  });
});

exports.deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({ status: 'disabled' });

  res.status(200).json({
    status: 'success',
    message: 'Restaurant deleted',
  });
});

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

exports.updateReviewOfRestaurant = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { comment, rating } = req.body;

  await review.update({ comment, rating });

  res.status(200).json({
    status: 'success',
    message: 'Review updated successfully',
  });
});

exports.updateStatusTodeleted = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({ status: false });

  res.status(200).json({
    status: 'success',
    message: 'Review deleted successfully',
  });
});
