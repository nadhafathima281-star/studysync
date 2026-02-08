const AiChat = require("../models/AiChat");

// node-fetch for Gemini API
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

/**
 * ===============================
 * GENERAL AI CHAT (WORKING)
 * ===============================
 * Route: POST /api/ai/chat
 */
exports.askAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini error:", data);
      return res.status(500).json({ message: "AI service failed" });
    }

    const aiReply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "AI could not generate a response.";

    const chat = await AiChat.create({
      user: req.user.id,
      prompt,
      response: aiReply,
      model: "gemini-2.5-flash",
    });

    res.status(200).json(chat);
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ message: "AI error" });
  }
};

/**
 * ===============================
 * NOTES AI (STUBS – FUTURE)
 * ===============================
 * Route: POST /api/ai/notes/explain
 */
exports.explainNote = async (req, res) => {
  res.status(501).json({
    message: "Explain note feature coming soon",
  });
};

/**
 * Route: POST /api/ai/notes/questions
 */
exports.generateQuestions = async (req, res) => {
  res.status(501).json({
    message: "Question generation coming soon",
  });
};

/**
 * ===============================
 * FLASHCARDS AI (STUB – FUTURE)
 * ===============================
 * Route: POST /api/ai/flashcards
 */
exports.generateFlashcards = async (req, res) => {
  res.status(501).json({
    message: "Flashcard generation coming soon",
  });
};


// save chat history
exports.getChatHistory=async(req,res)=>{
  try{
    const chats=await AiChat.find({user:req.user.id})
    .sort({createdAt:1});//oldest→newest

    res.status(200).json(chats);
  }catch(error){
    console.error(error);
    res.status(500).json({message:"Failed to fetch chat history."})
    
  }
}