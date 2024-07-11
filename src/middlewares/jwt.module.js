import jwt from 'jsonwebtoken';
import config from 'config';

const jwtSecret = config.get('jwtSecret');

const generateToken = (payload) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export { generateToken, verifyToken };
