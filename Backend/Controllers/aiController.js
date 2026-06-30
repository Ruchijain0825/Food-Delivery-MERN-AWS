import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const foodAssistant = async (req, res) => {
  try {
    const { message, foodList } = req.body;

    

    const menuText = foodList
      ?.map(
        (item) =>
          `${item.name} - ₹${item.price} (${item.category})`
      )
      .join("\n");

    const prompt = `
You are a food recommendation assistant.

Available Food Items:

${menuText}

User Query:
${message}

Rules:
1. Suggest only available items.
2. Mention prices.
3. Keep response short.
4. Use bullet points.
5. If the item exists, tell its price.
6. If the item does not exist, say "Item not available".
`;

    console.log("PROMPT =", prompt);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const reply = response.text;

    console.log("REPLY =", reply);

    res.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.log("FULL ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};