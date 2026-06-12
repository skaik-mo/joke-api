import { generateJoke } from '../utils/joke.service.js';
import { OPENROUTER_API_KEY } from '../config/env.js';

export async function getJoke(req, res, next) {
  try {
    const { word } = req.query;
    if (!word || !word.trim()) {
      const userName = "mohammed-skaik";
      return res.status(400).json({
        success: false,
        error: "Missing required query parameter: 'word'",
        example: `/api/${userName}/joke?word=school`,
      });
    }

    if (!OPENROUTER_API_KEY) {
      return res.status(503).json({
        success: false,
        error: 'Service is not configured. OPENROUTER_API_KEY is missing.',
      });
    }

    const joke = await generateJoke(word.trim());
    return res.status(200).json(
      {
        success: true,
        joke
      }
    );
  } catch (error) {
    next(error);
  }
}


