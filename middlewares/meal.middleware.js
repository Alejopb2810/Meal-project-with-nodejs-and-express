const Meal = require('../models/meals.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validMealById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const meal = await Meal.findOne({
    where: {
      id,
      status: true,
    },
  });
  if (!meal) {
    return next(new AppError('meal not found', 404));
  }

  req.meal = meal;
  next();
});

exports.validMealByIdBody = catchAsync(async (req, res, next) => {
  const { mealId } = req.body;

  const meal = await Meal.findOne({
    where: {
      id: mealId,
      status: true,
    },
  });
  if (!meal) {
    return next(new AppError('meal not found', 404));
  }
  req.meal = meal;
  next();
});
