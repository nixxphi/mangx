import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

// @route   POST /users/register
// @desc    Register a user
// @access  Public
router.post('/register', userController.register);

// @route   POST /users/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', userController.login);

export default userRouter;
