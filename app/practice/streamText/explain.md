# 基本的な実装

```ts
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

const result = await streamText({
  model: openai("gpt-4o"),
  system: "あなたはフレンドリーなアシスタントです。",
  prompt: "今日の天気はどうですか？",
});

for await (const textPart of result.textStream) {
  process.stdout.write(textPart);
}

// ストリーミング完了後の情報取得
console.log(`\n使用トークン数: ${result.usage.totalTokens}`);
```
