const Meal = require('../models/meals.model');
const Restaurant = require('../models/restaurants.model');
const catchAsync = require('../utils/catchAsync');

exports.getAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt', 'status'] },
    where: {
      status: true,
    },
    include: [
      {
        model: Restaurant,
        attributes: { exclude: ['createdAt', 'updatedAt', 'status'] },
      },
    ],
  });
  res.status(200).json({
    status: 'success',
    message: 'Meals found successfully',
    meals,
  });
});

exports.getMealById = catchAsync(async (req, res, next) => {
  const { meal } = req;

  return res.status(200).json({
    status: 'success',
    message: 'meal found successfully',
    meal,
  });
});

exports.createMeals = catchAsync(async (req, res, next) => {
  const { name, price, restaurantId } = req.body;

  const newMeal = await Meal.create({
    name: name.toLowerCase(),
    price,
    restaurantId,
  });
  res.status(200).json({
    status: 'success',
    message: 'the meal created successfully',
    newMeal,
  });
});

exports.updateMeal = catchAsync(async (req, res, nexy) => {
  const { meal } = req;
  const { name, price } = req.body;

  const updatedMeal = await meal.update({
    name,
    price,
  });

  res.status(200).json({
    status: 'success',
    message: 'Meal updated successfully',
    updatedMeal,
  });
});

exports.deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await meal.update({ status: false });

  res.status(200).json({
    status: 'success',
    message: 'Meal deleted successfully',
  });
});
