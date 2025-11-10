# 基本的な実装

`streamObject()` はLLMから構造化されたデータオブジェクトをストリーミング生成するための AI SDK Core関数です。<br/>
`generateObject()`と同様に zodスキーマを使用してデータの構造を定義しますが、データをリアルタイムでストリーミングできる点が特徴です。<br/>
複数のアイテムを段階的に生成・表示。streamなのでユーザーが待つ間も結果を見せたい時に有効。

```ts
import { streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const { partialObjectStream } = streamObject({
  model: openai('gpt-4'),
  schema: z.object({
    tasks: z.array(z.object({
      title: z.string(),
      completed: z.boolean(),
    })),
  }),
  prompt: 'タスクリストを5つ生成して',
});

for await (const partialObject of partialObjectStream) {
  console.log(partialObject); // 段階的に更新されるオブジェクト
}
```

```ts
// app/api/recommend-products/route.ts
import { streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

export async function POST(req: Request) {
  const { userPreferences } = await req.json();
  
  const result = streamObject({
    model: openai('gpt-4'),
    schema: z.object({
      recommendations: z.array(z.object({
        productName: z.string(),
        reason: z.string(),
        price: z.number(),
        rating: z.number(),
      })),
    }),
    prompt: `ユーザーの好み: ${userPreferences}\n10個の商品をレコメンドしてください`,
  });
  
  return result.toTextStreamResponse();
}
```

## `streamObject()` の特徴

- **構造化されたオブジェクトをストリーミングで生成する関数**
  - `generateObject()` のストリーミング版として機能します
  - オブジェクトの各フィールドが段階的に生成される様子を監視できます

- **リアルタイムなUI更新が可能**
  - 構造化されたオブジェクトをストリーミング。大きなデータや配列を段階的に処理したい場合に使用
  - 複雑なフォームや長いデータ生成時に、進捗をリアルタイムで表示できます
  - 部分的なオブジェクトを受け取りながら、UIを段階的に更新できます
