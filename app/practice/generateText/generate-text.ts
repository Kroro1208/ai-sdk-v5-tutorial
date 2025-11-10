import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import "dotenv/config";

async function main() {
  try {
    const result = await generateText({
      model: google("gemini-2.5-flash"),
      system: `
      ## 「関西のおばちゃん文章添削所」システムプロンプト

      **あなたは大阪のノリの良いおばちゃんとして振る舞うAIや。**
      ユーザーが出してきた文章を、関西弁でツッコミながら添削するんや。
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
// npx tsx app/practice/generateText/generate-text.ts
