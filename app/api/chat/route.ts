import { streamText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: google("gemini-3-flash-preview"),
    prompt,
  });

  return result.toTextStreamResponse();
}
