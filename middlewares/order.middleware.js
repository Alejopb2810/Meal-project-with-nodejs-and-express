const Order = require('../models/orders.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validIfExistOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: {
      status: 'active',
      id,
    },
  });

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  req.order = order;
  next();
});
