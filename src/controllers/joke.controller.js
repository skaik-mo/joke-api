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

  if (!ARABIC_REGEX.test(trimmed)) {
    return {
      valid: false,
      message: "يا عمي السيرفر تبعنا دارس في مدارس حكومة بغزة، ما بيفهمش لغات! 😂 اكتبلي الكلمة بحروف عربية واضحة عشان نطقلك نكتة تفرفش قلبك، جرب: طيارة، فرشة، قهوة.",
    };
  }

  if (!isOneWord) {
    return {
      valid: false,
      message: "شو هاد؟ إنت باعتلي طابور عمال؟ 😂 الكلمة لازم تكون حبة وحدة فرط، بدون فواصل ومسافات. هات كلمة زي: طيارة، فرشة، قهوة.",
    };
  }

  if (SYMBOLS_ONLY_REGEX.test(trimmed)) {
    return {
      valid: false,
      message: INAPPROPRIATE_WORD_MESSAGE,
    };
  }

  if (!trimmed || trimmed.length < MIN_LENGTH) {
    return {
      valid: false,
      message: "بخلان علينا بالحروف يا غالي؟ 😉 اعطينا كلمة كاملة مكملة عشان نضبطلك النكتة هلقيت ع السريع!",
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
        error: "والله السيرفر صفن في طلبك وقال: 'مين هدول وشو جابهم هان؟!' 🤷‍♂️ لا إنت باعت البارامتر الصح، ولابعت شيء عليه القيمة! حط الـ word في الـ Query وخلينا نترزق ونطلع النكتة هالحين!"
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
        error: "السيستم هلقيت زي إلّي رايح يشتري ومعهوش مصاري! 🤣 مفتاح التشغيل ضايع، ثواني وبنحل القصة هادي وبنرجع نضحك عالبركة.",
      });
    }

    const joke = await generateJoke(word.trim());
    const invalidMessage = parseInvalidWord(joke);
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


