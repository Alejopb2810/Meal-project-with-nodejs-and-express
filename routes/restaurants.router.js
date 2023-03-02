const { Router } = require('express');
const { check } = require('express-validator');
const {
  createNewRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  createReviewOfRestaurant,
  updateReviewOfRestaurant,
  updateStatusTodeleted,
} = require('../controllers/restaurant.controller');
const {
  restrictTo,
  protect,
  protectAccountOwner,
} = require('../middlewares/auth.middleware');
const { validRestaurantById } = require('../middlewares/restaurant.middleware');
const { validReviewByIds } = require('../middlewares/review.middleware');

// const { check } = require('express-validator');

const router = Router();
router.use(protect);
router.post(
  '/',
  [
    check('name', 'the name must be mandatory').not().isEmpty(),
    check('address', 'The address must be mandatory').not().isEmpty(),
    check('rating', 'The rating must be mandatory').not().isEmpty(),
    restrictTo('admin'),
  ],
  createNewRestaurant
);

router.get('/', getAllRestaurants);

router.get('/:id', validRestaurantById, getRestaurantById);

router.patch(
  '/:id',
  validRestaurantById,
  restrictTo('admin'),
  updateRestaurant
);

router.delete(
  '/:id',
  validRestaurantById,
  restrictTo('admin'),
  deleteRestaurant
);

router.post('/reviews/:id', createReviewOfRestaurant);

router.patch(
  '/reviews/:restaurantId/:id',
  validReviewByIds,
  protectAccountOwner,
  updateReviewOfRestaurant
);

router.delete(
  '/reviews/:restaurantId/:id',
  validReviewByIds,
  protectAccountOwner,
  updateStatusTodeleted
);

module.exports = {
  restaurantRouter: router,
};
