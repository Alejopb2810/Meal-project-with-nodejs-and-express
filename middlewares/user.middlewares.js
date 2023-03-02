const User = require('../models/users.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validIfExistUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      status: true,
      id,
    },
  });

  if (!user) {
    return next(new AppError('User not found'), 404);
  }

  req.user = user;
  next();
});

exports.validIfExitUserEmail = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
      status: true,
    },
  });

  if (user && !user.status) {
    return next(
      new AppError(
        'the user has a account, but it is desactivated please talk to the administrator to activate it',
        404
      )
    );
  }

  if (user) {
    return next(new AppError('the email user already exists', 404));
  }

  next();
});
