import OpenAI from "openai";
const client = new OpenAI();


export async function getResponse(text: string) {

  const response = await client.responses.create({
    model: "gpt-4.1",
    instructions: "Give very quick summary of the following and also make a bulleted list of the main points.",
    input: text,
  });
  if (response.error) {
    console.error("Error:", response.error.message);
    return null;
  }
  return response.output_text;
}
