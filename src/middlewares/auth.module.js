import bcrypt from 'bcryptjs';
import { generateToken } from './jwt.module.js';

const registerUser = async (UserService, userData) => {
  const { username, email, password } = userData;

  // Check if user already exists
  const existingUser = await UserService.get({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Encrypt password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = await UserService.create({ username, email, password: hashedPassword });

  // Generate token
  const payload = { user: { id: user.id } };
  return generateToken(payload);
};

const loginUser = async (UserService, userData) => {
  const { email, password } = userData;

  // Check if user exists
  const user = await UserService.get({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // Generate token
  const payload = { user: { id: user.id } };
  return generateToken(payload);
};

export { registerUser, loginUser };
