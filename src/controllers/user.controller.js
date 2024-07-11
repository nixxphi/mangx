import UserService from '../services/user.service.js';
import { registerUser, loginUser } from '../middleware/auth.module.js';
import { createHttpError, handleError, catchAsync } from '../utils/error.utils.js';

class UserController {
  register = catchAsync(async (req, res) => {
    const token = await registerUser(UserService, req.body);
    res.json({ token });
  });

  login = catchAsync(async (req, res) => {
    const token = await loginUser(UserService, req.body);
    res.json({ token });
  });
}

export default new UserController();
