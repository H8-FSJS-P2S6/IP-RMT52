const OpenAI = require("openai"); // Gunakan require jika menggunakan CommonJS
require("dotenv").config();

module.exports = async function openAI(card) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `Give a hint about this Yu-Gi-Oh card based on its description:\n\nCard Name: ${card.name}\nDescription: ${card.desc}\nCardType: ${card.cardtype}\nRace: ${card.race}\nAttribute: ${card.attribute}\nAttack: ${card.atk}\bDefense: ${card.def}\nLevel: ${card.level}\n\nGenerate a hint without revealing the card name. But you can reveal a partial of the name`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const hint = completion.choices[0].message.content.trim();
    return hint;
  } catch (error) {
    console.error(
      "Error generating hint:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
