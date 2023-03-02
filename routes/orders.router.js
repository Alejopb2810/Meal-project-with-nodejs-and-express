const { Router } = require('express');
const {
  createOrder,
  getOrdersUser,
  updateStatusToCompleted,
  deletedOrderToCancelled,
} = require('../controllers/order.controller');
const { protect } = require('../middlewares/auth.middleware');
const { validMealByIdBody } = require('../middlewares/meal.middleware');
const { validIfExistOrder } = require('../middlewares/order.middleware');
// const { check } = require('express-validator');

const router = Router();

router.use(protect);

router.post('/', validMealByIdBody, createOrder);
router.get('/me', getOrdersUser);
router.patch('/:id', validIfExistOrder, updateStatusToCompleted);
router.delete('/:id', validIfExistOrder, deletedOrderToCancelled);

module.exports = {
  orderRouter: router,
};
