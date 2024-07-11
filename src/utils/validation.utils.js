import { body, validationResult } from 'express-validator';

const validateRegister = [
  body('username').not().isEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Please enter a password with 6 or more characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateLogin = [
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').exists().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { validateRegister, validateLogin };
