import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import "dotenv/config";

async function main() {
  const result = await streamText({
    model: google("gemini-2.0-flash-exp"),
    system: "あなたはフレンドリーなアシスタントです。",
    prompt: "楽して痩せる方法を教えてください？",
    onError({ error }) {
      console.error("ストリーミングエラー:", error);
      // エラーログの記録やアラートの送信など
    },
  });

  for await (const textPart of result.textStream) {
    process.stdout.write(textPart);
  }

  // ストリーミング完了後の情報取得
  const usage = await result.usage;
  console.log(`\n使用トークン数: ${usage.totalTokens}`);
}

main().catch(console.error);
