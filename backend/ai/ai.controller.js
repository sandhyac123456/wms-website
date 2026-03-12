import { askGemini } from "./gemini.service.js";

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const aiReply = await askGemini(message);

    res.status(200).json({
      success: true,
      reply: aiReply,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "AI error",
    });
  }
};