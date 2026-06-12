const JOKE_STYLES = [
  "group joke: assign tasks to people from different Palestinian cities, punchline reveals the Gazan's twisted logic",
  "running gag: repeat a pattern 3-4 times then shatter it with an absurd Gazan punchline",
  "flirting or social situation gone wrong — Gazan misreads the context hilariously",
  "Gazan does something completely wrong but with perfect internal logic",
  "Gazan gives an answer that is technically correct but completely misses the point",
];

const SYSTEM_MESSAGE = `You are a Palestinian joke writer specializing in Gazan humor.
You write SHORT punchy jokes in Palestinian Arabic dialect (Gazan accent).
The joke MUST have a real punchline — a surprising twist, a logical reversal, or absurd Gazan reasoning that makes people laugh out loud.
DO NOT write a story. DO NOT explain the joke. DO NOT add a moral.
Output the joke text only. No intro. No commentary. No quotation marks.
The punchline must land in the LAST sentence and feel unexpected.`;

export function buildMessages(word) {
  const style = JOKE_STYLES[Math.floor(Math.random() * JOKE_STYLES.length)];

  const userMessage = `STEP 1 — VALIDATE THE WORD:
First, check if the word "${word}" is a real meaningful word in Arabic, English, or any known language.
- if the word "${word}" is a bad word / Sexual word / inappropriate language. respond with ONLY this JSON and nothing else:
{"invalid": true, "message": "الكلمة اللي كتبتها غير لائقة جرب كلمة زي: مدرسة، كهرباء، موبايل"}
- If it is NOT a real word (random symbols, gibberish, keyboard spam like "asdfgh", "!!!!", "123abc", etc.) respond with ONLY this JSON and nothing else:
{"invalid": true, "message": "الكلمة اللي كتبتها ما إلها معنى، جرب كلمة زي: مدرسة، كهرباء، موبايل"}

STEP 2 — IF THE WORD IS VALID, write a joke:
Study these jokes carefully. This is EXACTLY the style, structure, and punchline quality required:

JOKE 1:
قررت غزة ونابلس والخليل يبنوا جسر.
الخلايلة: مسؤولين عالاسمنت. النابلسية: مسؤولين عالحجار. الغزاوية: مسؤولين عالحديد.
بعد أسبوع الجسر وقع فوق روس الناس.
قال الخلايلة: يا خسارة، راحوا الاسمنتات.
قال النابلسية: يا خسارة، راحوا الحجار.
قال الغزاوية: منيح ما حطينا الحديد... كان راح هو كمااان.

JOKE 2:
غزاوية طبخت لجوزها:
أول يوم: ملوخية. تاني يوم: خبيزة. تالت يوم: سبانخ.
رابع يوم قالتله: إيش أطبخ لك حبيبي؟
قالها: بلاش اليوم، برعى لحالي.

JOKE 3:
غزاوي يغازل لبنانية.
اللبنانية طفشت وقالت: لك حل عني!
قال الغزاوي: وين؟ الأسئلة يا بعد عمري!

JOKE 4:
غزاوي راح عالحج، شاف العالم عم يرمي الجمرات.
قام جاب عجل سيارة وشعلوا.

JOKE 5:
غزاوي برمي إبليس بالحج وهو ملثم.
سألوه: ليش ملثم؟
قال: يمكن احتاجوا.

JOKE 6:
واحد قام يساوي شاي لربع قام لاقى السكر خالص فاضطر يعمل الشاي بدون سكر وقدمه لهم وقال فيه كاسة بدون سكر اللي بتطلعله العشاء عليه الليلة فكلهم شربوا الشاي وما حدا تكلم أبدا.

JOKE 7:
محشش طالع من محل بيع للجوالات يكلم نفسه: تويكس اسلم؟ لا لا
سنكرز كافر؟ لا لا — مارس مرتد؟ لا لا — كندر فاسق؟ لا لا
رجع للمحل وسأله: وش قلت لي اسم الجهاز اللي كان كافر وصار مسلم؟
رد راعي المحل: ياخي للمرة المليون اقولك — جالكسي تااااب.

---
What makes these jokes work:
- Short setup, ONE unexpected punchline at the end
- Gazan logic that is wrong but internally consistent
- The punchline reframes everything before it
- No explanation after the punchline — it ends there

Now write ONE new joke about the word: "${word}"
Style hint: ${style}

RULES:
- Gazan Palestinian dialect only
- Must have a real surprising punchline in the last line
- Keep it short (3-6 lines maximum)
- End on the punchline — never explain it`;

  return [
    { role: "system", content: SYSTEM_MESSAGE },
    { role: "user", content: userMessage },
  ];
}


// const JOKE_STYLES = [
//   "group joke: assign tasks to people from different Palestinian cities, punchline reveals the Gazan's twisted logic",
//   "running gag: repeat a pattern 3-4 times then shatter it with an absurd Gazan punchline",
//   "flirting or social situation gone wrong — Gazan misreads the context hilariously",
//   "Gazan does something completely wrong but with perfect internal logic",
//   "Gazan gives an answer that is technically correct but completely misses the point",
// ];

// const SYSTEM_MESSAGE = `You are a Palestinian joke writer specializing in Gazan humor.
// You write SHORT punchy jokes in Palestinian Arabic dialect (Gazan accent).
// The joke MUST have a real punchline — a surprising twist, a logical reversal, or absurd Gazan reasoning that makes people laugh out loud.
// DO NOT write a story. DO NOT explain the joke. DO NOT add a moral.
// Output the joke text only. No intro. No commentary. No quotation marks.
// The punchline must land in the LAST sentence and feel unexpected.`;

// export function buildMessages(word) {
//   const style = JOKE_STYLES[Math.floor(Math.random() * JOKE_STYLES.length)];

//   const userMessage = `Study these jokes carefully. This is EXACTLY the style, structure, and punchline quality required:

// JOKE 1:
// قررت غزة ونابلس والخليل يبنوا جسر.
// الخلايلة: مسؤولين عالاسمنت. النابلسية: مسؤولين عالحجار. الغزاوية: مسؤولين عالحديد.
// بعد أسبوع الجسر وقع فوق روس الناس.
// قال الخلايلة: يا خسارة، راحوا الاسمنتات.
// قال النابلسية: يا خسارة، راحوا الحجار.
// قال الغزاوية: منيح ما حطينا الحديد... كان راح هو كمااان.

// JOKE 2:
// غزاوية طبخت لجوزها:
// أول يوم: ملوخية. تاني يوم: خبيزة. تالت يوم: سبانخ.
// رابع يوم قالتله: إيش أطبخ لك حبيبي؟
// قالها: بلاش اليوم، برعى لحالي.

// JOKE 3:
// غزاوي يغازل لبنانية.
// اللبنانية طفشت وقالت: لك حل عني!
// قال الغزاوي: وين؟ الأسئلة يا بعد عمري!

// JOKE 4:
// غزاوي راح عالحج، شاف العالم عم يرمي الجمرات.
// قام جاب عجل سيارة وشعلوا.

// JOKE 5:
// غزاوي برمي إبليس بالحج وهو ملثم.
// سألوه: ليش ملثم؟
// قال: يمكن احتاجوا.

// JOKE 6:
// واحد قام يساوي  شاي لربع قام لاقى السكر خالص فاضطر يعمل  الشاي بدون سكر وقدمه لهم وقال فيه كاسة بدون سكر اللي بتطلعله العشاء عليه الليلة فكلهم شربوا الشاي وما حدا تكلم أبدا.

// JOKE 7:
// محشش طالع من محل بيع للجوالات يكلم نفسه: تويكس اسلم ؟ :/لا لا
// سنكرز كافر ؟:/لا لا
// مارس 
// مرتد ؟:/لا لا 
// كندر فاسق ؟ :/لا لا
// رجع للمحل وسأله :وش قلت لي اسم الجهاز الي كان كافر
// وصار مسلم:/
// رد راعي المحل 

// :ياخي للمره ألمليوووووون اقولك .
 
// جالكسي تااااب 


// ---
// What makes these jokes work:
// - Short setup, ONE unexpected punchline at the end
// - Gazan logic that is wrong but internally consistent
// - The punchline reframes everything before it
// - No explanation after the punchline — it ends there

// Now write ONE new joke about the word: "${word}"
// Style hint: ${style}

// RULES:
// - Gazan Palestinian dialect only
// - Must have a real surprising punchline in the last line
// - Keep it short (3-6 lines maximum)
// - End on the punchline — never explain it`;

//   return [
//     { role: "system", content: SYSTEM_MESSAGE },
//     { role: "user", content: userMessage },
//   ];
// }


// // const JOKE_STYLES = [
// //   "حوار بين شخصين — الضحكة في رد الفعل المفاجئ",
// //   "موقف يومي فلسطيني ينتهي بـ twist غير متوقع",
// //   "تورية أو لعبة ألفاظ — معنيين للكلمة في نفس الجملة",
// //   "تعليق ساخر من شخص عادي على موقف مبالغ فيه",
// //   "قصة قصيرة جداً — سطرين فقط — والضربة في السطر الثاني",
// // ];

// // function pickRandomStyle() {
// //   return JOKE_STYLES[Math.floor(Math.random() * JOKE_STYLES.length)];
// // }

// // const SYSTEM_MESSAGE = `أنت كوميديان فلسطيني من نابلس اسمك أبو العبد.
// // أسلوبك ذكي وظريف، وبتحكي بالعامية الفلسطينية 100%.
// // ما بتقول شي مسيء أو جارح.
// // بتحكي النكتة بس، بدون مقدمات أو شرح أو تعليق.`;

// // export function buildMessages(word) {
// //   const style = pickRandomStyle();

// //   const userMessage = `هاي ثلاث أمثلة على نكت فلسطينية بالأسلوب المطلوب:

// // مثال 1 (كلمة: مدرسة):
// // معلمة سألت التلميذ: "ليش ما عملت الواجب؟"
// // قاللها: "لأنو في الكتاب مكتوب — وفّر الورق وانقذ الغابة."

// // مثال 2 (كلمة: طبيب):
// // روحت عند الدكتور وقتلو: "كل ما صحيت الصبح حسيت بدوخة لمدة ساعة."
// // قاللي: "اصحى بالظهر."

// // مثال 3 (كلمة: كهرباء):
// // قطعت الكهرباء لحظة ما حطيت الأكل بالميكروييف.
// // يعني الكهرباء فلسطينية هي كمان — بتغيب لما أكثر حدا محتاجها.

// // هلق اكتب نكتة جديدة عن كلمة: "${word}"
// // الأسلوب المطلوب: ${style}
// // اكتب النكتة بس، بدون أي شي ثاني.`;

// //   return [
// //     { role: "system", content: SYSTEM_MESSAGE },
// //     { role: "user", content: userMessage },
// //   ];
// // }


