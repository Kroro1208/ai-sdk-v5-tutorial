# 基本的な実装

`generateObject()`LLMから構造化されたデータ（オブジェクト）を生成するためのAI SDK Core関数です。APIレスポンスやデータベースのレコードなど、特定の形式でデータを取得したい場合に使用されます。

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

## 主な特徴

- **構造化されたデータを生成**: LLMから決まった形式のオブジェクトを一度に取得
- **型安全性を確保**: Zodスキーマを使って、TypeScriptの型チェック
- **自動バリデーション**: スキーマに従ったデータかどうかを自動的に検証
- **実用的な用途**: フォームデータ、設定情報、APIレスポンスなどの場面で活用
