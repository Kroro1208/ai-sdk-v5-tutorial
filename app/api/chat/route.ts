import { convertToModelMessages, streamText, UIMessage } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  // TODO: AIに持たせたい振る舞いのプロンプトを考えてみよう
  const SYSTEM_PROMPT = ``;

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system: SYSTEM_PROMPT,
    messages: convertToModelMessages(messages),
    // TODO: goo1gle検索ツールを有効化
    
  });

  return result.toUIMessageStreamResponse({
     // TODO: 思考過程を返すオプションを定義
  });
}
