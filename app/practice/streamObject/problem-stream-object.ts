import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import "dotenv/config";
import { z } from "zod";

async function main() {
  try {
    const schema = z.object({
     // TODO: スキーマ定義をここに記述しよう
    });

    const result = await streamObject({
      model: google("gemini-2.0-flash-exp"),
      schema,
      // TODO: プロンプトをここに記述しよう
      prompt: ``,
      onError({ error }) {
        console.error("ストリーミングエラー:", error);
      },
      onFinish({ object, usage }) {
        // TODO: Tokenを出力してみよう
      },
    });

    console.log("=== ストリーミング開始 ===");
    // TODO: 部分オブジェクトをコンソールに出力してみよう

    console.log(`終了理由: ${await result.finishReason}`);

    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log("\n=== 詳細情報 ===");
    console.dir(result, { depth: null });
  } catch (error) {
    console.error("エラーが発生しました:", error);
  }
}

main();
