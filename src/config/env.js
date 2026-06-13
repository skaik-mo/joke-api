import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const {
    OPENROUTER_API_KEY,
    PORT,
    NODE_ENV,
    USER_NAME = "mohammed-skaik",
    INAPPROPRIATE_WORD_MESSAGE = "يا غالي كلمتك يا إما بدها غسيل فم بـِ ليفة، يا إما طلاسم سحر مش فاهمينها! هاتلك كلمة تفتح النفس عشان ننزلك النكتة هلقيت 😉"
} = process.env;

if (!OPENROUTER_API_KEY) {
  console.warn('⚠️  WARNING: OPENROUTER_API_KEY is not set. AI calls will fail.');
}