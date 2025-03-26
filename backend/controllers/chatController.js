const { Anthropic } = require("@anthropic-ai/sdk");
require("dotenv").config(); // Load environment variables

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY, // Ensure this is not undefined
});

if (!anthropic || !anthropic.messages) {
  console.error("❌ Anthropic SDK failed to initialize.");
}

exports.handleChatRequest = async (req, res) => {
  try {
    console.log("Received request body:", req.body);

    if (!req.body.prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Verify if SDK object is valid
    if (!anthropic || typeof anthropic.messages.create !== "function") {
      throw new Error("Anthropic SDK not initialized properly");
    }

    const completion = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 500,
      temperature: 0.7,
      messages: [{ role: "user", content: req.body.prompt }],
    });

    res.status(200).json({ message: completion.content, sessionId: req.body.sessionId });

  } catch (error) {
    console.error("Error in chat request:", error);
    res.status(500).json({ error: "An error occurred", details: error.message });
  }
};
