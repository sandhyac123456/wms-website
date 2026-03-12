import { GoogleGenAI } from "@google/genai";
import { companyInfo } from "./companyPrompt.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const askGemini = async (question) => {
  try {

   const prompt = `
You are an AI assistant for WhiteMirror Solution Pvt Ltd.

Rules:
- Answer only in English
- Keep the answer clear and professional
- Use one paragraph instead of many short sentences
- Do not use bullet points or markdown

Company Information:
${companyInfo}

User Question:
${question}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;

  } catch (error) {
    console.log("Gemini Error:", error);
    throw new Error("AI response failed");
  }
};