# 基本的な実装

`generateObject()`LLMから構造化されたデータ（オブジェクト）を生成するためのAI SDK Core関数です。<br/>
 フォームの自動入力/データ抽出に適していて、名刺からの情報抽出、レシート解析、構造化データの生成などに使用

```ts
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const { object } = await generateObject({
  model: openai('gpt-4'),
  schema: z.object({
    name: z.string(),
    age: z.number(),
    hobbies: z.array(z.string()),
  }),
  prompt: '架空の人物プロフィールを生成して',
});

console.log(object); // { name: "太郎", age: 25, hobbies: ["読書", "プログラミング"] }
```

```ts
// app/api/extract-receipt/route.ts
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

export async function POST(req: Request) {
  const { receiptText } = await req.json();
  
  const { object } = await generateObject({
    model: openai('gpt-4'),
    schema: z.object({
      storeName: z.string(),
      date: z.string(),
      items: z.array(z.object({
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
      })),
      total: z.number(),
      tax: z.number(),
    }),
    prompt: `以下のレシート情報から構造化データを抽出してください:\n${receiptText}`,
  });
  
  // objectは型安全で自動補完が効く
  return Response.json({ receipt: object });
}
```

## 主な特徴

- **構造化されたデータを生成**: LLMから決まった形式のオブジェクトを一度に取得
- **型安全性を確保**: Zodスキーマを使って、TypeScriptの型チェック
- **自動バリデーション**: スキーマに従ったデータかどうかを自動的に検証
- **実用的な用途**: フォームデータ、設定情報、APIレスポンスなどの場面で活用
