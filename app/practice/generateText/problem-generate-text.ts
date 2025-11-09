import { generateText } from "ai";
import "dotenv/config";

async function main() {
  try {
    const result = await generateText({
      // TODO: ここにコードを記述してください
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

// 完成したら `npx tsx ファイル名` コマンドで実行してみよう
