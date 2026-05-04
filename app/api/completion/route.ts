import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = streamText({
    model: google("gemini-3-flash-preview"),
    system: `You are a specialized autocomplete engine for a task manager. 
             Your goal is to provide a natural, concise completion for the user's task.
             Rules:
             - Respond ONLY with the completion text.
             - Do not include the original input.
             - No conversational filler, explanations, or quotes.
             - If the input is "Meeting with ", you respond with "team to discuss project X".`,
    prompt: prompt,
  });

  return result.toUIMessageStreamResponse();
}
