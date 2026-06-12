import { NODE_ENV } from '../config/env.js';

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  console.error(`[errorHandler] ${err.message}`);
  if (NODE_ENV !== "production") {
    console.error(err.stack);
  }

  const body = {
    success: false,
    error: "An unexpected error occurred. Please try again later.",
  };

  if (NODE_ENV !== "production") {
    body.debug = err.message;
  }

  return res.status(statusCode).json(body);
}

export default errorHandler;
