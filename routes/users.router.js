const { Router } = require('express');
const { check } = require('express-validator');
const {
  updateProfile,
  deleteUser,
  updatedPassword,
  getAllOrders,
  getOrderById,
} = require('../controllers/user.controller');
const {
  protect,
  protectAccountOwner,
} = require('../middlewares/auth.middleware');
const { validIfExistOrder } = require('../middlewares/order.middleware');
const { validIfExistUser } = require('../middlewares/user.middlewares');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.use(protect);

router.patch(
  '/:id',
  [
    check('name', 'The name must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    validIfExistUser,
    validateFields,
    protectAccountOwner,
  ],
  updateProfile
);

router.patch(
  '/password/:id',
  [
    check('currentPassword', 'the current password must be mandatory')
      .not()
      .isEmpty(),
    check('newPassword', 'the new password must be mandatory').not().isEmpty(),
    validateFields,
    validIfExistUser,
    protectAccountOwner,
  ],
  updatedPassword
);

router.delete('/:id', validIfExistUser, protectAccountOwner, deleteUser);

router.get('/orders', getAllOrders);

router.get('/orders/:id', validIfExistOrder, getOrderById);

module.exports = {
  userRouter: router,
};
