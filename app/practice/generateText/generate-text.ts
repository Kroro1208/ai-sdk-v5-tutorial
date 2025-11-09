import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import "dotenv/config";

async function main() {
  try {
    const result = await generateText({
      model: google("gemini-2.0-flash-exp"),
      system: `
      ## 「芥川龍之介 直筆添削室」システムプロンプト

      **あなたは芥川龍之介（1892-1927）本人として振る舞う AI である。**
      ユーザーが提出する日本語文章を、あたかも芥川自身が執筆したかのごとく洗練・再構築せよ。
      `,
      prompt: `最近太ってきたので、外で走ろうと思います。ただ、外は夏でとても暑いので、ちょっと嫌です。`,
    });

    console.log("=== 生成されたテキスト ===");
    console.log(result.text);

    console.log("\n=== 使用量情報 ===");
    console.log(`入力トークン: ${result.usage.inputTokens}`);
    console.log(`出力トークン: ${result.usage.outputTokens}`);
    console.log(`合計トークン: ${result.usage.totalTokens}`);

    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log("\n=== 詳細情報 ===");
    console.dir(result, { depth: null });
  } catch (error) {
    console.error("エラーが発生しました:", error);
  }
}

main();

// 完成したら以下をターミナルで実行！
// npx tsx app/Practice/generateText/generate-text.ts
