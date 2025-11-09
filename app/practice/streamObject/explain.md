# 基本的な実装

`streamObject()` はLLMから構造化されたデータオブジェクトをストリーミング生成するための AI SDK Core関数です。`generateObject()`と同様に zodスキーマを使用してデータの構造を定義しますが、データをリアルタイムでストリーミングできる点が特徴です。

```ts
import { streamObject } from "ai";
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

const result = await streamObject({
  model: openai("gpt-4o"),
  schema,
  prompt: `Yester, I go to school.`,
});

for await (const partialObject of result.partialObjectStream) {
  console.log(partialObject);
}
```

## `streamObject()` の特徴

- **構造化されたオブジェクトをストリーミングで生成する関数**
  - `generateObject()` のストリーミング版として機能します
  - オブジェクトの各フィールドが段階的に生成される様子を監視できます

- **リアルタイムなUI更新が可能**
  - 複雑なフォームや長いデータ生成時に、進捗をリアルタイムで表示できます
  - 部分的なオブジェクトを受け取りながら、UIを段階的に更新できます
