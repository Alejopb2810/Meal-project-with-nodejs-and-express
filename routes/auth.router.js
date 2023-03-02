const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, login } = require('../controllers/auth.controller');
const { validIfExitUserEmail } = require('../middlewares/user.middlewares');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.post(
  '/signup',
  [
    check('name', 'the name must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    check('password', 'The password must be mandatory').not().isEmpty(),
    validIfExitUserEmail,
    validateFields,
  ],
  createUser
);

router.post(
  '/login',
  [
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    check('password', 'The password must be mandatory').not().isEmpty(),
    validateFields,
  ],
  login
);

module.exports = {
  authRouter: router,
};
