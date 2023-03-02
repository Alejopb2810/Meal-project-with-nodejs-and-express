const Restaurant = require('../models/restaurants.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validRestaurantById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: {
      status: 'active',
      id,
    },
  });

  if (!restaurant) {
    return next(new AppError('Restaurant not found', 404))();
  }

  req.restaurant = restaurant;
  next();
});
