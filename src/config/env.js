import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const {
    OPENROUTER_API_KEY,
    PORT,
    NODE_ENV,
    USER_NAME = "mohammed-skaik",
    INAPPROPRIATE_WORD_MESSAGE = `الكلمة اللي كتبتها غير لائقة أو ليس لها معنى، جرب كلمة ثانية.`
} = process.env;

if (!OPENROUTER_API_KEY) {
  console.warn('⚠️  WARNING: OPENROUTER_API_KEY is not set. AI calls will fail.');
}