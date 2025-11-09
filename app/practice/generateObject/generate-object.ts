import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import "dotenv/config";
import { z } from "zod";

async function main() {
  try {
    const schema = z.object({
      isCorrect: z
        .boolean()
        .describe("英文の文法が正しい場合はtrue、間違っている場合はfalse"),
      fixed: z.string().describe("添削後の正しい英文"),
      explanation: z
        .string()
        .describe(
          "添削内容または正しい英文の詳細説明は必ず日本語で記述してください。"
        ),
    });

    const result = await generateObject({
      model: google("gemini-2.0-flash-exp"),
      schema,
      system: `あなたは厳格な英語文法チェッカーです。以下のルールを厳密に適用してください:
      1. 間接話法(reported speech)では、主節の動詞が過去形の場合、従属節の動詞も過去形にする必要があります
        - 例: "He said he lives in Tokyo" → 間違い
        - 正しい: "He said he lived in Tokyo"
      2. 現在でも真実であっても、主節が過去形なら従属節も過去形にするのが正式なルールです
      3. その他、少しでも文法規則に反する箇所があれば、isCorrectをfalseにしてください`,
      prompt: `以下の英文の文法をチェックしてください。時制の一致、冠詞、前置詞、主語と動詞の一致など、すべての文法項目を厳密にチェックしてください。

      文法が完全に正しければisCorrectをtrueにし、少しでも間違いがあればfalseにして、正しい英文に添削してください。説明は必ず日本語で記述してください。

      英文:
      Yesterday, I met my old friend at the shopping mall. 
      I asked her where she lives now and what job she does. 
      She told me she lives in Osaka and works for a big company.
      Then I asked her when she moved to Osaka and why she decided to change her job.`,
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
