# AI SDK V5 チャットアプリケーション - Hands-on 開発ガイド

このガイドでは、AI SDK V5を使用したストリーミング対応のチャットアプリケーションを構築する手順を解説します。

## Demo

![demo](demo.gif)

## 目次

1. [プロジェクト概要](#プロジェクト概要)
2. [前提条件](#前提条件)
3. [セットアップ](#セットアップ)
4. [Hands-on 開発手順](#hands-on-開発手順)
5. [実行方法](#実行方法)
6. [カスタマイズ](#カスタマイズ)

## プロジェクト概要

このプロジェクトは以下の技術を使用したリアルタイムチャットアプリケーションです：

- **Next.js 16.0**
- **AI SDK V5** - Vercel提供のAI統合ライブラリ
- **Google Gemini / OpenAI** - AIモデル（自分が使用したいモデルでOK）
- **TypeScript**
- **Tailwind CSS**

### 主な機能

- ✅ ストリーミングレスポンス対応
- ✅ ユーザーとAIのメッセージ履歴表示
- ✅ テキスト、Reasoning、ファイル、ツール実行に対応

## 前提条件

- Node.js 20.x 以上
- pnpm（または npm/yarn）
- Google Gemini または OpenAI の APIキー

## セットアップ

### 1. プロジェクトの作成

```bash
pnpm create next-app@latest ai-sdk-v5-ati
cd ai-sdk-v5-ati
```

セットアップ時の選択肢：

- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: No
- App Router: Yes
- Turbopack: お好みで

### 2. 依存関係のインストール

```bash
pnpm add ai @ai-sdk/react @ai-sdk/google @ai-sdk/openai zod
```

### 3. 環境変数の設定

```bash
touch .env
```

`.env` に以下を追加：

```env
# Google Gemini を使用する場合
GOOGLE_GENERATIVE_AI_API_KEY=your-api-key-here

# OpenAI を使用する場合
OPENAI_API_KEY=your-api-key-here
```

### 各ファイルで.env読むこむため下記コマンド実行

```
 pnpm add -D dotenv
```

## Hands-on 開発手順

### ステップ1: API ルートの作成

チャット機能を提供するバックエンドAPIを作成します。

#### 1-1. ファイル作成

```bash
mkdir -p app/api/chat
touch app/api/chat/route.ts
```

#### 1-2. APIルートの実装

`app/api/chat/route.ts`にAPIを実装：

**ポイント:**

- `streamText()` でAIからのレスポンスをストリーミング取得
- `convertToModelMessages()` でUI用メッセージをAIモデル用に変換
- `toUIMessageStreamResponse()` でストリーミングレスポンスを返す

### ステップ2: メッセージ表示コンポーネントの作成

チャットメッセージを表示するコンポーネントを作成します。

#### 2-1. ファイル作成

```bash
mkdir -p app/_components
touch app/_components/Messages.tsx
```

#### 2-2. Messages コンポーネントの実装

`app/_components/Messages.tsx`を実装：

**ポイント:**

- `UIMessage`型を使用してメッセージを表示
- `parts`配列で複数のコンテンツタイプに対応（text, reasoning, file, tool）
- ユーザーとAIでスタイルを分けるてわかりやすく

### ステップ3: メインページの作成

チャットUIのメインページを実装します。

#### 3-1. ページの実装

- `app/page.tsx` にMessagesコンポーネントをimportして配置
- formを実装してAPIを叩く

**ポイント:**

- `useChat()` フックでチャット機能を簡単に実装
- `sendMessage()` でメッセージ送信
- 必要なハンドラーを実装

## 実行方法

### 開発サーバーの起動

```bash
pnpm dev
```

ブラウザで `http://localhost:3000` を開くと、チャットUIが表示されます。

## カスタマイズ

### AIモデルの変更

`app/api/chat/route.ts` で使用するモデルを変更できます：

```typescript
// Google Gemini を使用
import { google } from "@ai-sdk/google";
model: google("gemini-2.0-flash-exp");

// OpenAI を使用
import { openai } from "@ai-sdk/openai";
model: openai("gpt-4o");
```

### 機能の拡張

AI SDK V5では以下のような機能も追加可能です：

- **ツール呼び出し**: AIが外部APIを実行
- **ファイルアップロード**: 画像や文書の送信
- **Reasoning表示**: AIの思考過程を表示

## 参考リンク

- [AI SDK Documentation](https://sdk.vercel.ai/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Google AI Studio](https://makersuite.google.com/app/apikey)
- [OpenAI API Keys](https://platform.openai.com/api-keys)
- [AI Elements](https://ai-sdk.dev/elements)

## 補足

### 使用するLLMのAPI Keyを取得しておく

**取得先のリンク**

- [Open AI](https://platform.openai.com/api-keys)
- [Google](https://aistudio.google.com/app/apikey)
- [API Gateway Key][https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%2Fapi-keys&title=Get%20your%20AI%20Gateway%20key]

### CSSモジュール型エラー解消

```ts
// global.d.ts
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}
```
