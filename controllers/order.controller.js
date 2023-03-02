const Meal = require('../models/meals.model');
const Order = require('../models/orders.model');
const Restaurant = require('../models/restaurants.model');
const catchAsync = require('../utils/catchAsync');

exports.getOrdersUser = catchAsync(async (req, res, next) => {
  const orderUser = await Order.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt', 'status'] },
    where: {
      status: 'active',
    },
    include: [
      {
        model: Meal,
        attributes: { exclude: ['createdAt', 'updatedAt', 'status'] },
        include: [
          {
            model: Restaurant,
            attributes: { exclude: ['createdAt', 'updatedAt', 'status'] },
          },
        ],
      },
    ],
  });
  res.status(200).json({
    status: 'success',
    message: 'orders found successfully',
    orderUser,
  });
});

exports.createOrder = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;
  const { meal, sessionUser } = req;

  const totalPrice = meal.price * quantity;
  const newOrder = await Order.create({
    quantity,
    mealId,
    userId: sessionUser.id,
    totalPrice,
  });
  res.status(200).json({
    status: 'success',
    message: 'Order created successfully',
    newOrder,
  });
});

exports.updateStatusToCompleted = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'completed' });

  res.status(200).json({
    status: 'success',
    message: 'order updated successfully',
  });
});

exports.deletedOrderToCancelled = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'cancelled' });

  res.status(200).json({
    status: 'success',
    message: 'Order deleted successfully',
  });
});
