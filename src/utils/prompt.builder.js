import { INAPPROPRIATE_WORD_MESSAGE } from '../config/env.js';

const JOKE_STYLES = [
  "Wordplay Pun: Turn the word itself into a hilarious Gazan pun or a double entendre.",
  "Absurd Situation: Personify the object/word, or put a Gazan in an instant 1-line conflict with it.",
  "Literal vs Metaphorical: A Gazan takes a common expression about this word 100% literally."
];

const SYSTEM_MESSAGE = `You are a legendary Palestinian comedy writer specializing exclusively in Gazan humor.
Your job is to write a short, punchy joke in authentic Gazan dialect (اللهجة الغزاوية).

CRITICAL OUTPUT FORMAT RULES:
1. If the user's word is INVALID or INAPPROPRIATE, you MUST respond with a VALID, strictly formatted JSON block. 
   - Every key and every string value MUST be wrapped in double quotes (").
   - Example of valid output: {"invalid": true, "message": "${INAPPROPRIATE_WORD_MESSAGE}"}
   - NEVER output key names or string values without double quotes.
2. If the word is VALID, you MUST output ONLY the raw joke text. 
3. NEVER use quotation marks (like " or ') around the successful joke. 
4. NEVER include introductions, explanations, or commentary.`;

export function buildMessages(word) {
  const style = JOKE_STYLES[Math.floor(Math.random() * JOKE_STYLES.length)];

  const userMessage = `[STEP 1: INPUT VALIDATION]
Analyze the input word: "${word}"
- If it is a bad word, sexual, or highly inappropriate, return ONLY this JSON:
{"invalid": true, "message": "${INAPPROPRIATE_WORD_MESSAGE}"}

- If it is gibberish, keyboard smash, numbers, or meaningless symbols, return ONLY this JSON:
{"invalid": true, "message": "${INAPPROPRIATE_WORD_MESSAGE}"}

---

[STEP 2: SHORT JOKE GENERATION]
Write a 1-2 line quick pun/joke where the word "${word}" is the absolute punchline or core of the joke. 

Study these exact examples for length, structure, and style:

مثال 1 (الكلمة: ساندي):
واحدة اسمها ساندي دخلت كلية هندسة بقت ساندي متر مربع 🤣

مثال 2 (الكلمة: قهوة):
مرة قهوة راحت تتقدم لشاي، قالها أبوها: لسه بدري عليكي تغلي! 😂

مثال 3 (الكلمة: فرشة):
مرة فرشة اتخانقت مع فرشة قالتلها أنا بفرشيكي 🤣

مثال 4 (الكلمة: طيارة):
غزاوي شاف طيارة بالسمة قال يا رب تقع.. سألوه ليش؟ قال عشان آخد بطاريتها للجوال 😂

---

JOKE REQUIREMENTS FOR THE WORD "${word}":
- Style: ${style}
- Dialect: Gazan Arabic / Palestinian (Short and conversational).
- STRICT LENGTH: Maximum 1 to 2 short sentences. Absolutely no long stories or paragraphs.
- Focus: Make a smart wordplay or a funny quick scenario out of "${word}".

Generate the short 1-2 line joke now:`;

  return [
    { role: "system", content: SYSTEM_MESSAGE },
    { role: "user", content: userMessage },
  ];
}