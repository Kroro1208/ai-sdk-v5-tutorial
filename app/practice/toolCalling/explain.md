# 基本的な実装

## コード例

```ts
import { z } from "zod";
import { generateText, tool } from "ai";

const result = await generateText({
  model: "openai/gpt-4o",
  tools: {
    weather: tool({
      // ツールの説明
      description: "Get the weather in a location",
      // ツールの入力パラメータ
      inputSchema: z.object({
        location: z.string().describe("The location to get the weather for"),
      }),
      // ツールの出力パラメータ
      outputSchema: z.object({
        location: z.string().describe("The location to get the weather for"),
        temperature: z.number().describe("The temperature in the location"),
      }),
      // ツールの実行
      execute: async ({ location }) => ({
        location,
        temperature: 72 + Math.floor(Math.random() * 21) - 10,
      }),
    }),
  },
  prompt: "What is the weather in San Francisco?",
});
```

## 主な特徴

### 外部ツールとの連携

- AIが外部のAPIや関数を自動的に呼び出し
- リアルタイムなデータ取得や処理の実行
- 単純なテキスト生成を超えた動的な処理能力

### 型安全なツール定義

- zodスキーマによる入力・出力パラメータの型定義
- コンパイル時とランタイムの両方で型チェック
- ツールの仕様を明確に定義し、AIの理解を促進

### 自動的なツール選択

- AIが状況に応じて適切なツールを自動選択
- 複数ツールの組み合わせによる複雑なタスクの実行
- ユーザーの意図を理解して最適なツールを呼び出し

## 使用場面

Tool Calling は以下のような場面で特に有効
複数使用することも可能

- **データ取得**: 天気情報、株価、ニュースなどのリアルタイムデータ取得
- **計算処理**: 複雑な計算やデータ分析
- **ファイル操作**: ファイルの読み書き、画像処理
- **API連携**: 外部サービスの機能を活用
- **データベース操作**: 情報の検索、更新、削除
