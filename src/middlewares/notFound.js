import { USER_NAME } from "../config/env.js";

function notFound(req, res) {
  return res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`,
    message:`you can use valid rounte: /api/${USER_NAME}/joke?word=your-word`,
  });
}

export default notFound;
