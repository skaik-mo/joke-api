import { generateJoke } from '../utils/joke.service.js';
import { OPENROUTER_API_KEY } from '../config/env.js';
import { USER_NAME } from '../config/env.js'; 

// Arabic Unicode range + common Palestinian/Arabic letters
const ARABIC_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;

// Only symbols/numbers/latin with no Arabic at all
const SYMBOLS_ONLY_REGEX = /^[^a-zA-Z\u0600-\u06FF]+$/;

// Too short to mean anything
const MIN_LENGTH = 2;

export function validateWord(word) {
  const trimmed = word.trim();
  const isOneWord = trimmed.split(/\s+/).length === 1;
  if (!isOneWord) {
    return {
      valid: false,
      message: 'الكلمة لازم تكون كلمة وحدة، بدون مسافات. جرب كلمة زي: سيارة، مطر، كرة.',
    };
  }
  // only symbols, numbers, or special chars — no letters at all
  if (SYMBOLS_ONLY_REGEX.test(trimmed)) {
    return {
      valid: false,
      message: 'الكلمة اللي كتبتها ما إلها معنى، جرب كلمة ثانية.',
    };
  }

  // empty or too short
  if (!trimmed || trimmed.length < MIN_LENGTH) {
    return {
      valid: false,
      message: 'الكلمة قصيرة جداً، اكتب كلمة صح.',
    };
  }

  if (!ARABIC_REGEX.test(trimmed)) {
    return {
      valid: false,
      message: 'الكلمة لازم تحتوي على حروف عربية عشان أقدر أطلع نكتة عنها، جرب كلمة زي: سيارة، مطر، كرة.',
    };
  }

  // has latin letters — allow it (english words are fine)
  // but if it's ONLY random symbols mixed with numbers
  const letters = trimmed.match(/[a-zA-Z\u0600-\u06FF]/g);
  if (!letters || letters.length < 2) {
    return {
      valid: false,
      message: 'الكلمة اللي كتبتها ما إلها معنى، جرب كلمة زي: مدرسة، كهرباء، موبايل.',
    };
  }


  return { valid: true };
}

function parseInvalidWord(text) {
  try {
    // strip markdown code blocks if model wrapped it
    const stripped = text.replace(/```json|```/gi, '').trim();
    // extract first {...} block containing "invalid"
    const match = stripped.match(/\{[^{}]*"invalid"[^{}]*\}/s);
    if (match) {
      const parsed = JSON.parse(match[0]);
      if (parsed.invalid === true) {
        return parsed.message || 'الكلمة اللي كتبتها ما إلها معنى، جرب كلمة زي: مدرسة، كهرباء، موبايل';
      }
    }
  } catch (_) { }
  return null;
}

export async function getJoke(req, res, next) {
  try {
    if (!req.query.word) {
      return res.status(400).json({
        success: false,
        error: "Invalid input: 'word' must be a query string."
      });
    }
    const { word } = req.query;
    const { valid, message } = validateWord(word);
    if (!valid) {
      return res.status(400).json({
        success: false,
        error: message
      });
    }
    if (!word || !word.trim()) {
      return res.status(400).json({
        success: false,
        error: "Missing required query parameter: 'word'",
        example: `/api/${USER_NAME}/joke?word=school`,
      });
    }

    if (!OPENROUTER_API_KEY) {
      return res.status(503).json({
        success: false,
        error: 'Service is not configured. OPENROUTER_API_KEY is missing.',
      });
    }

    const joke = await generateJoke(word.trim());
    console.log('Generated joke:', joke);
    const invalidMessage = parseInvalidWord(joke);
    console.log('Parsed invalid message:', invalidMessage);
    if (invalidMessage) {
      return res.status(400).json(
        {
          success: false,
          error: invalidMessage
        }
      );
    }

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


