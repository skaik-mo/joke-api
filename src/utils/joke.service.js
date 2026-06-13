import axios from 'axios';
import { OPENROUTER_API_KEY } from '../config/env.js';
import { buildMessages } from './prompt.builder.js';

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

const MODELS = [
  'meta-llama/llama-3.3-70b-instruct:free',
  'google/gemma-3-27b-it:free',
  'nvidia/nemotron-super-49b-v1:free',
  'openrouter/auto',
];

function cleanJoke(text) {
  return text
    .trim()
    .replace(/^["'"«»"]+|["'"«»"]+$/gu, '')
    .replace(/\\"/g, '')
    .replace(/"/g, '')
    .replace(/\\n/g, '\n')
    .replace(/\n+/g, ' — ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}


async function callModel(model, messages) {
  const response = await axios.post(
    OPENROUTER_URL,
    { model, messages, max_tokens: 400, temperature: 0.95 },
    {
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://github.com/chance-world-cup',
        'X-Title': 'The Chance World Cup Joke API',
      },
      timeout: 20000,
    }
  );

  const content = response?.data?.choices?.[0]?.message?.content;
  if (!content?.trim()) throw new Error(`الموديل ${model} شكله أكل وجبة فخارّة وهلقيت مأنتخ ونايم في العسل! 😂 باعتلي رد فاضي وصامت، استهدى بالله واضغط تاني عشان نصحّيه يطقطق نكت سوا!`);
  return content;
}

export async function generateJoke(word) {
  const messages = buildMessages(word);
  const errors = [];

  for (const model of MODELS) {
    try {
      console.log(`[joke.service] Trying model: ${model}`);
      const raw = await callModel(model, messages);
      console.log(`[joke.service] Success with model: ${model}`);
      return cleanJoke(raw);
    } catch (err) {
      const reason = err?.response?.data?.error?.message || err.message || "أخ يا حظنا! صار معنا خطأ مش معروف قرعة أبوه من وين! 😂 شكلنا انحسدنا والسيرفر أكل عين فجرت فيوزاته، ثواني بنبخر الكيبورد وبنرجع نضبطك!";
      console.warn(`[joke.service] Model ${model} failed: ${reason}`);
      errors.push({ model, reason });
    }
  }

  const summary = errors.map((e) => `${e.model}: ${e.reason}`).join(' | ');
  const finalError = new Error(`يا غالي، الذكاء الاصطناعي بكل هيبته سكرت معه اليوم وأعلن الإضراب! 😂 الموديلات كلها ضربت فيوزاتها وقالتلك: 'فش نكت اليوم، روحوا ناموا!'.. التفاصيل المهببة: ${summary}`);
  finalError.statusCode = 500;
  throw finalError;
}
