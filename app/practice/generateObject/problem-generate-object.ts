import { generateObject } from "ai";
import "dotenv/config";
import { z } from "zod";

async function main() {
  try {
    // TODO: スキーマを定義
    const schema = z.object({
      // ここにスキーマを定義
    });

    const result = await generateObject({
      // TODO
    });

    console.log("=== 生成されたオブジェクト ===");
    console.log(JSON.stringify(result.object, null, 2));

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

// 完成したら `npx tsx ファイル名` コマンドで実行してみよう
