const { Router } = require('express');
const { check } = require('express-validator');
const {
  createMeals,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal,
} = require('../controllers/meal.controller');
const { restrictTo, protect } = require('../middlewares/auth.middleware');
const { validMealById } = require('../middlewares/meal.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();
router.use(protect);
router.post(
  '/:id',
  [
    check('name', 'the name must be mandatory').not().isEmpty(),
    check('price', 'The price must be mandatory').not().isEmpty(),
    validateFields,
    restrictTo('admin'),
  ],
  createMeals
);

router.get('', getAllMeals);

router.get('/:id', validMealById, getMealById);

router.patch(
  '/:id',
  validateFields,
  restrictTo('admin'),
  validMealById,
  updateMeal
);

router.delete('/:id', validMealById, restrictTo('admin'), deleteMeal);

module.exports = {
  mealRouter: router,
};
