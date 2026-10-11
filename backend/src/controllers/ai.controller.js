

// import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
// import Groq from "groq-sdk";

// const getAIClient = () => new Groq({ apiKey: process.env.GROQ_API_KEY });

// const MAX_WORDS = 3000;

// const extractTextFromPDF = async (buffer) => {
//   const uint8Array = new Uint8Array(buffer);
//   const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
//   const pdfDoc = await loadingTask.promise;

//   let fullText = "";
//   for (let i = 1; i <= pdfDoc.numPages; i++) {
//     const page = await pdfDoc.getPage(i);
//     const content = await page.getTextContent();
//     const pageText = content.items.map((item) => item.str).join(" ");
//     fullText += pageText + "\n";
//   }
//   return fullText;
// };

// export const analyzeResume = async (req, res) => {
//   try {
//     // single file check
//     if (req.files && req.files.length > 1) {
//       return res.status(400).json({ message: "Only one PDF can be uploaded at a time" });
//     }

//     const file = req.files?.[0];
//     if (!file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     // pdf mimetype check
//     if (file.mimetype !== "application/pdf") {
//       return res.status(400).json({ message: "Only PDF files are allowed" });
//     }

//     const resumeText = await extractTextFromPDF(file.buffer);
//     const cleanedText = resumeText.replace(/\s+/g, " ").trim();

//     // word count check
//     const wordCount = cleanedText.split(" ").filter(Boolean).length;
//     if (wordCount > MAX_WORDS) {
//       return res.status(400).json({
//         message: `PDF exceeds the ${MAX_WORDS} word limit. Your PDF has ${wordCount} words.`,
//       });
//     }

//     const client = getAIClient();

//     const prompt = `
// You are an expert ATS (Applicant Tracking System) resume analyzer with 10+ years of experience in HR and recruiting.

// Analyze the following resume fairly and accurately. Consider these scoring criteria:
// - Relevant work experience and career progression (30 points)
// - Skills and keywords relevant to the candidate's field (25 points)
// - Education and certifications (15 points)
// - Resume formatting and structure (15 points)
// - Achievements and quantifiable results (15 points)

// IMPORTANT SCORING RULES:
// - A working professional with good experience should score 65-85
// - An excellent, well-structured resume should score 85-100
// - Only score below 50 if the resume is genuinely poor or missing major sections
// - Be fair and realistic — do not underScore good resumes

// Return ONLY this valid JSON with no extra text:
// {
//   "score": number,
//   "strengths": ["strength 1", "strength 2", "strength 3"],
//   "weaknesses": ["weakness 1", "weakness 2"],
//   "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
// }

// Resume:
// ${cleanedText}
// `;

// const response = await client.chat.completions.create({
//   model: "llama-3.3-70b-versatile",
//   temperature: 0.3,
//   max_tokens: 1024,  // ← increased from 500
//   messages: [{ role: "user", content: prompt }],
// });
// //     const prompt = `
// // You are a professional ATS resume analyzer.

// // Analyze the following resume and return ONLY valid JSON.

// // {
// //   "score": number,
// //   "strengths": [],
// //   "weaknesses": [],
// //   "suggestions": []
// // }

// // Resume:
// // ${cleanedText}
// // `;

// //     const response = await client.chat.completions.create({
// //       model: "llama-3.3-70b-versatile",
// //       temperature: 0.2,
// //       max_tokens: 500,
// //       messages: [{ role: "user", content: prompt }],
// //     });

//     res.json({ result: response.choices[0].message.content });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "AI Analysis Failed" });
//   }
// };


import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import OpenAI from "openai";

// ── AI client (works with Gemini, OpenRouter, Cerebras, Groq, etc.) ──────────
// Switch providers by changing only the .env values:
//   LLM_API_KEY, LLM_BASE_URL, LLM_MODEL
const getAIClient = () =>
  new OpenAI({
    apiKey: process.env.LLM_API_KEY,
    baseURL: process.env.LLM_BASE_URL,
  });

const MODEL = process.env.LLM_MODEL || "gemini-2.5-flash";
const MAX_WORDS = 3000;
const MIN_WORDS = 30;

// ── PDF text extraction ──────────────────────────────────────────────────────
const extractTextFromPDF = async (buffer) => {
  const uint8Array = new Uint8Array(buffer);
  const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
  const pdfDoc = await loadingTask.promise;

  let fullText = "";
  for (let i = 1; i <= pdfDoc.numPages; i++) {
    const page = await pdfDoc.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(" ");
    fullText += pageText + "\n";
  }
  return fullText;
};

// ── Safe JSON parsing (handles ```json fences or extra text) ────────────────
const parseAIJson = (raw) => {
  if (!raw) throw new Error("Empty response from model");

  const cleaned = raw.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error("Invalid JSON from model");
  }
};

// ── Controller ───────────────────────────────────────────────────────────────
export const analyzeResume = async (req, res) => {

  console.log("analyzeResume hit, files:", req.files?.length);
  try {
    // single file check
    if (req.files && req.files.length > 1) {
      return res
        .status(400)
        .json({ message: "Only one PDF can be uploaded at a time" });
    }

    const file = req.files?.[0];
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // pdf mimetype check
    if (file.mimetype !== "application/pdf") {
      return res.status(400).json({ message: "Only PDF files are allowed" });
    }

    const resumeText = await extractTextFromPDF(file.buffer);
    const cleanedText = resumeText.replace(/\s+/g, " ").trim();

    // word count checks
    const wordCount = cleanedText.split(" ").filter(Boolean).length;

    if (wordCount < MIN_WORDS) {
      return res.status(400).json({
        message:
          "Could not read text from this PDF. It may be a scanned image. Please upload a text-based PDF.",
      });
    }

    if (wordCount > MAX_WORDS) {
      return res.status(400).json({
        message: `PDF exceeds the ${MAX_WORDS} word limit. Your PDF has ${wordCount} words.`,
      });
    }

    const client = getAIClient();

    const prompt = `
You are an expert ATS (Applicant Tracking System) resume analyzer with 10+ years of experience in HR and recruiting.

Analyze the following resume fairly and accurately. Consider these scoring criteria:
- Relevant work experience and career progression (30 points)
- Skills and keywords relevant to the candidate's field (25 points)
- Education and certifications (15 points)
- Resume formatting and structure (15 points)
- Achievements and quantifiable results (15 points)

IMPORTANT SCORING RULES:
- A working professional with good experience should score 65-85
- An excellent, well-structured resume should score 85-100
- Only score below 50 if the resume is genuinely poor or missing major sections
- Be fair and realistic — do not underscore good resumes

Return ONLY this valid JSON with no extra text:
{
  "score": number,
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "weaknesses": ["weakness 1", "weakness 2"],
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
}

Resume:
${cleanedText}
`;

    const response = await client.chat.completions.create({
      model: MODEL,
      temperature: 0.3,
      // Gemini 2.5 models spend part of this budget on internal "thinking",
      // so keep it high or the JSON can get cut off.
      max_tokens: 4096,
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }],
    });

    const raw = response.choices?.[0]?.message?.content;
    const result = parseAIJson(raw);

    // validate / normalize so the frontend always gets the expected shape
    result.score = Math.max(0, Math.min(100, Number(result.score) || 0));
    result.strengths = Array.isArray(result.strengths) ? result.strengths : [];
    result.weaknesses = Array.isArray(result.weaknesses) ? result.weaknesses : [];
    result.suggestions = Array.isArray(result.suggestions) ? result.suggestions : [];

    // Kept as a JSON string so your existing frontend (JSON.parse(data.result)) still works
    res.json({ result: JSON.stringify(result) });
  } catch (error) {
    console.error("Resume analysis error:", error?.status, error?.message);

    if (error?.status === 429) {
      return res.status(429).json({
        message: "AI rate limit reached. Please try again in a minute.",
      });
    }

    res.status(500).json({ message: "AI Analysis Failed" });
  }
};