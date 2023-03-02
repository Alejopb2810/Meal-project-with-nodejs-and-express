const Meal = require('../models/meals.model');
const Order = require('../models/orders.model');
const Restaurant = require('../models/restaurants.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.updateProfile = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;
  const { user } = req;

  await user.update({ name, email });

  res.status(200).json({
    status: 'success',
    message: 'user updated successfully',
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: false });

  res.status(200).json({
    status: 'success',
    message: 'user deleted successfully',
  });
});

exports.updatedPassword = catchAsync(async (req, res, next) => {
  const { user } = req;

  const { currentPassword, newPassword } = req.body;

  if (!(await bcrypt.compare(currentPassword, user.password))) {
    return next(new AppError('incorrect password', 401));
  }

  const salt = await bcrypt.gensalt(10);
  const encriptedPassword = await bcrypt.hash(newPassword, salt);

  await user.update({
    password: encriptedPassword,
    passwordChangedAt: new Date(),
  });

  res.status(200).json({
    status: 'success',
    message: 'user password was updated successfully',
  });
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const usersorder = await Order.findAll({
    where: {
      status: 'active',
    },
    include: [
      {
        model: Meal,
        include: [
          {
            model: Restaurant,
          },
        ],
      },
    ],
  });
  res.status(200).json({
    status: 'success',
    message: 'Orders found successfully',
    usersorder,
  });
});

exports.getOrderById = catchAsync(async (req, res, next) => {
  const { order } = req;

  return res.status(200).json({
    status: 'success',
    message: 'order found successfully',
    order,
  });
});
