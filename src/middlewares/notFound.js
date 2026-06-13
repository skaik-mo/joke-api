import { USER_NAME } from "../config/env.js";

function notFound(req, res) {
  return res.status(404).json({
    success: false,
    error: `شو هاد؟ باعتلي طلب ${req.method} على الـ ${req.originalUrl}؟ 🧐 السيرفر هلقيت بيلف حوالين حاله وبيحكي: 'مين هاد وشو بده منا؟!' ثبت بوصلتك يا غالي!`,
    message:`دبّر حالك يا غالي وخذ الوصفة الصح: خُش دغري على الرابط هاد وضبط أمورك: /api/${USER_NAME}/joke?word=الكلمة وعالبركة بنبلش نكت 🤣`,
  });
}

export default notFound;
