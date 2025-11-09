# 基本的な実装

`generateObject()`LLMから構造化されたデータ（オブジェクト）を生成するためのAI SDK Core関数です。APIレスポンスやデータベースのレコードなど、特定の形式でデータを取得したい場合に使用されます。

```ts
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

const schema = z.object({
  isCorrect: z
    .boolean()
    .describe("英文の文法が正しい場合はtrue、間違っている場合はfalse"),
  fixed: z.string().describe("添削後の正しい英文"),
  explanation: z
    .string()
    .describe("添削内容の詳細説明を日本語で記述してください。"),
});

const result = await generateObject({
  model: openai("gpt-4o"),
  schema,
  prompt: `Yester, I go to school.`,
});
```

## 主な特徴

- **構造化されたデータを生成**: LLMから決まった形式のオブジェクトを一度に取得
- **型安全性を確保**: Zodスキーマを使って、TypeScriptの型チェック
- **自動バリデーション**: スキーマに従ったデータかどうかを自動的に検証
- **実用的な用途**: フォームデータ、設定情報、APIレスポンスなどの場面で活用
