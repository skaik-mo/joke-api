import app from "./src/app.js";
import { PORT } from "./src/config/env.js";
import { USER_NAME } from "./src/config/env.js";  
// const app  = require("./src/app.js");
// const { PORT } = require("./src/config/env.js");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}/api/${USER_NAME}/joke?word=school`);
});



// // ============================================================
// //  Joke API — powered by OpenRouter AI
// //  Author : YourName
// //  Endpoint: GET /api/yourname/joke?word=<any_word>
// // ============================================================

// require("dotenv").config();

// const express = require("express");
// const cors    = require("cors");
// const axios   = require("axios");

// // ── App setup ─────────────────────────────────────────────────
// const app  = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors());
// app.use(express.json());

// // ── OpenRouter config ─────────────────────────────────────────
// const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// if (!OPENROUTER_API_KEY) {
//   console.error(
//     "❌  OPENROUTER_API_KEY is missing. " +
//     "Add it to your .env file locally, or to Render's Environment Variables in production."
//   );
//   process.exit(1);
// }

// const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

// // Fallback chain — if the first model returns 404/unavailable,
// // the code automatically retries with the next one.
// // All verified free on OpenRouter as of June 2026.
// const MODELS = [
//   "meta-llama/llama-3.3-70b-instruct:free",   // best for Arabic, very reliable
//   "google/gemma-4-31b-it:free",                // Google, good quality
//   "nvidia/nemotron-3-super-120b-a12b:free",    // NVIDIA, 1M context
//   "openrouter/free",                           // OpenRouter auto-selects any free model
// ];

// // ── Prompt builder ────────────────────────────────────────────
// function buildPrompt(word) {
//   const randomizers = [
//     "استخدم زاوية غير متوقعة تماماً",
//     "فكّر بطريقة خارج الصندوق",
//     "اجعل الفكاهة مبنية على موقف يومي مضحك",
//     "استخدم توريةً أو لعبة ألفاظ ذكية",
//     "ابنِ الطرفة على مفارقة مفاجئة",
//     "استلهم الطرفة من الحياة الفلسطينية اليومية",
//   ];
//   const hint = randomizers[Math.floor(Math.random() * randomizers.length)];

//   return `أنت كوميدي محترف من فلسطين، أسلوبك ذكي وخفيف الظل.

// مهمتك: اكتب طرفة واحدة فقط باللهجة الفلسطينية العامية، مبنية على الكلمة: "${word}".

// قواعد صارمة:
// 1. اكتب الطرفة باللهجة الفلسطينية الدارجة (مثل: هيك، يزاك الله خير، والله، شو، هلق، وين، بدّك، مش هيك؟ إلخ).
// 2. ${hint} — غيّر الأسلوب في كل مرة حتى لا تتكرر نفس الفكرة أبداً.
// 3. يجب أن تكون الطرفة مضحكة فعلاً، وليس مجرد جملة عادية.
// 4. الكلمة "${word}" يجب أن تكون محور الطرفة أو جزءاً أساسياً منها.
// 5. ممنوع تماماً: أي محتوى عنصري، مسيء، جنسي، أو يحط من أحد.
// 6. اكتب الطرفة فقط — بدون مقدمات، بدون شرح، بدون أرقام.`;
// }

// // ── Call OpenRouter with automatic model fallback ─────────────
// async function generateJoke(prompt) {
//   const errors = [];

//   for (const model of MODELS) {
//     try {
//       console.log(`Trying model: ${model}`);

//       const response = await axios.post(
//         OPENROUTER_URL,
//         {
//           model,
//           messages: [{ role: "user", content: prompt }],
//           max_tokens: 300,
//           temperature: 1.0,
//         },
//         {
//           headers: {
//             "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
//             "Content-Type":  "application/json",
//             "HTTP-Referer":  "https://github.com/yourname/joke-api",
//             "X-Title":       "Joke API",
//           },
//           timeout: 25000,
//         }
//       );

//       const raw  = response.data?.choices?.[0]?.message?.content?.trim();
//       const joke = raw?.replace(/^["'""'']|["'""'']$/g, "").trim();

//       if (!joke) throw new Error("Empty response from model");

//       console.log(`✅ Success with model: ${model}`);
//       console.log(`✅ Success joke: ${joke}`);

//       return { joke, model };

//     } catch (err) {
//       const reason = err.response?.data?.error?.message || err.message;
//       console.warn(`⚠️  Model ${model} failed: ${reason}`);
//       errors.push({ model, reason });
//       // continue to next model in the list
//     }
//   }

//   // All models failed
//   throw new Error(`All models failed: ${JSON.stringify(errors)}`);
// }

// // ── Main route ────────────────────────────────────────────────
// // GET /api/yourname/joke?word=school
// app.get("/api/yourname/joke", async (req, res) => {
//   const { word } = req.query;

//   if (!word || word.trim() === "") {
//     return res.status(400).json({
//       success: false,
//       error: "Missing required query parameter: 'word'",
//       example: "/api/yourname/joke?word=school",
//     });
//   }

//   const sanitizedWord = word.trim();

//   try {
//     const { joke, model } = await generateJoke(buildPrompt(sanitizedWord));

//     return res.status(200).json({ joke });

//   } catch (error) {
//     console.error("All models failed:", error.message);

//     return res.status(500).json({
//       success: false,
//       error:  "Failed to generate joke. Please try again later.",
//       detail: error.message,
//     });
//   }
// });

// // ── Health check ──────────────────────────────────────────────
// app.get("/", (req, res) => {
//   res.status(200).json({
//     status:  "ok",
//     message: "Joke API is running 🎉",
//     usage:   "GET /api/yourname/joke?word=<your_word>",
//     models:  MODELS,
//   });
// });

// // ── 404 ───────────────────────────────────────────────────────
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     error: `Route '${req.originalUrl}' not found.`,
//     hint:  "Try GET /api/yourname/joke?word=school",
//   });
// });

// // ── Start ─────────────────────────────────────────────────────
// app.listen(PORT, () => {
//   console.log(`✅  Server running on port ${PORT}`);
//   console.log(`🎯  http://localhost:${PORT}/api/yourname/joke?word=school`);
// });
