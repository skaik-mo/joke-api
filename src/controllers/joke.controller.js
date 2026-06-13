import { generateJoke } from '../utils/joke.service.js';
import { USER_NAME, OPENROUTER_API_KEY, INAPPROPRIATE_WORD_MESSAGE } from '../config/env.js';

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
      message: 'الكلمة لازم تكون كلمة وحدة، بدون مسافات. جرب كلمة زي: طيارة، فرشة، قهوة.',
    };
  }
  // only symbols, numbers, or special chars — no letters at all
  if (SYMBOLS_ONLY_REGEX.test(trimmed)) {
    return {
      valid: false,
      message: INAPPROPRIATE_WORD_MESSAGE,
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
      message: 'الكلمة لازم تحتوي على حروف عربية عشان أقدر أطلع نكتة عنها، جرب كلمة زي: طيارة، فرشة، قهوة.',
    };
  }

  // has latin letters — allow it (english words are fine)
  // but if it's ONLY random symbols mixed with numbers
  const letters = trimmed.match(/[a-zA-Z\u0600-\u06FF]/g);
  if (!letters || letters.length < 2) {
    return {
      valid: false,
      message: INAPPROPRIATE_WORD_MESSAGE,
    };
  }


  return { valid: true };
}

function parseInvalidWord(text) {
  if (!text || !text.includes('invalid')) return null;

  const cleanText = text.replace(/```json|```/gi, '').trim();

  try {
    const match = cleanText.match(/\{([\s\S]*)\}/);
    if (!match) return null;

    const parsed = new Function(`return ${match[0]};`)();

    if (parsed && (parsed.invalid === true || parsed.invalid === 'true')) {
      return parsed.message?.trim() || INAPPROPRIATE_WORD_MESSAGE;
    }
  } catch (_) {
    const messageMatch = cleanText.match(/message\s*:\s*["']?([^"'},}\n]+)/);
    if (messageMatch) return messageMatch[1].trim();
  }

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


