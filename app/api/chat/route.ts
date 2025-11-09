import { convertToModelMessages, streamText, UIMessage } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  // TODO: AIに持たせたい振る舞いのプロンプトを考えてみよう
  const SYSTEM_PROMPT = ``;

  const result = streamText({
    model: google("gemini-2.5-pro"),
    system: SYSTEM_PROMPT,
    messages: convertToModelMessages(messages),
    // TODO: 思考プロセスをレスポンスに含める実装を追加
  });

  return result.toUIMessageStreamResponse();
}
