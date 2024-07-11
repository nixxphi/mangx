import pkg from 'http-errors';
import statuses from 'statuses';

const { STATUS_CODES } = statuses;

export const ERROR_CODES = {
  INVALID_INPUT: 400,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  USER_EXISTS: 409,
  INVALID_CREDENTIALS: 401,
  STORY_NOT_FOUND: 404,
  STORY_UPDATE_FAILED: 500,
  DATABASE_ERROR: 500,
  VALIDATION_ERROR: 400,
};

export const getStatusCode = (errorCode) => {
  return ERROR_CODES[errorCode] || 500; // Default to 500 if errorCode is not found
};

export const getStatusName = (statusCode) => {
  if (statusCode === undefined || statusCode === null) {
    return 'Unknown Status Code';
  }
  return STATUS_CODES[statusCode] || 'Unknown Status Code'; // Default to 'Unknown Status Code' if statusCode is not found
};

export const createHttpError = (errorCode, message) => {
  if (!ERROR_CODES[errorCode]) {
    throw new Error(`Invalid error code: ${errorCode}`);
  }
  const statusCode = getStatusCode(errorCode);
  const statusName = getStatusName(statusCode);
  const error = new pkg.HttpError(statusCode, message);
  error.statusName = statusName;
  error.errorCode = errorCode;
  return error;
};

// Middleware for handling errors
export const handleError = (err, res) => {
  const { statusCode, message } = err;
  res.status(statusCode || 500).json({
    status: 'error',
    statusCode: statusCode || 500,
    statusName: getStatusName(statusCode),
    message: message || 'Internal Server Error',
  });
};

// Middleware for catching async errors
export const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(createHttpError('INTERNAL_ERROR', err.message)));
  };
};
