# 基本的な実装

テキストをリアルタイムでストリーミングする。リアルタイムでユーザーに応答を表示する


```ts
// app/api/chat/route.ts
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { messages } = await req.json();
  
  const result = streamText({
    model: openai('gpt-4'),
    messages,
    system: 'あなたは親切なカスタマーサポート担当です',
  });
  
  return result.toDataStreamResponse();
}
```
