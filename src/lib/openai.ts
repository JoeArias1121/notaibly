import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });

export async function getSummary(text: string) {
  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    instructions:
      "Give very quick summary of the following and also make a bulleted list of the main points.",
    input: text,
  });
  if (response.error) {
    console.error("Error:", response.error.message);
    return null;
  }
  console.log("AI summary:", response.output_text);
  return response.output_text;
}
