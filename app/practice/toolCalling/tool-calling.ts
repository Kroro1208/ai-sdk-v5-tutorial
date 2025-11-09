import { google } from "@ai-sdk/google";
import { generateText, stepCountIs, tool } from "ai";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

async function main() {
  try {
    const result = await generateText({
      model: google("gemini-2.0-flash-exp"),
      stopWhen: stepCountIs(5),
      tools: {
        getWeatherTool: tool({
          description: "指定された都市の現在の天気情報を取得するツール",
          inputSchema: z.object({
            city: z.string().describe("天気情報を取得する都市名"),
          }),
          outputSchema: z.object({
            city: z.string().describe("都市名"),
            temperature: z.number().describe("気温（摂氏）"),
            humidity: z.number().describe("湿度（%）"),
            description: z.string().describe("天気の状態"),
            windSpeed: z.number().describe("風速（m/s）"),
          }),
          execute: async ({ city }) => {
            console.log(`🌤️ ${city}の天気情報を取得中...`);

            // 都市名を英語に変換（LLMを使用）
            const { generateText } = await import("ai");
            const { google } = await import("@ai-sdk/google");

            const cityTranslation = await generateText({
              model: google("gemini-2.0-flash-exp"),
              prompt: `以下の都市名を英語に変換してください。OpenWeather APIで使用するため、一般的な英語表記で答えてください。都市名のみを返してください。

              都市名: ${city}`,
            });

            const englishCity = cityTranslation.text.trim();

            // OpenWeather APIのエンドポイント
            const apiKey = process.env.OPENWEATHER_API_KEY;
            if (!apiKey) {
              throw new Error("OPENWEATHER_API_KEYが設定されていません");
            }

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${englishCity}&appid=${apiKey}&units=metric&lang=ja`;

            try {
              const response = await fetch(url);
              if (!response.ok) {
                throw new Error(
                  `天気情報の取得に失敗しました: ${response.status}`
                );
              }

              const data = await response.json();

              return {
                city: data.name,
                temperature: Math.round(data.main.temp),
                humidity: data.main.humidity,
                description: data.weather[0].description,
                windSpeed: data.wind.speed,
              };
            } catch (error) {
              console.error("API呼び出しエラー:", error);
              // エラー時はダミーデータを返す
              return {
                city,
                temperature: 22,
                humidity: 65,
                description: "晴れ",
                windSpeed: 3.2,
              };
            }
          },
        }),
      },
      system: `あなたは天気情報を提供するエージェントです。
        天気情報取得ツールを使用して、ユーザーが指定した都市の現在の天気情報を取得してください。
        取得した情報を分かりやすく説明してください。
      `,
      prompt: `東京の現在の天気を教えてください`,
      // もし複数のツールがある場合、最初のステップで使用するツールを指定したり、使用できるツールを制限したりもできる
      prepareStep: async ({ stepNumber, messages }) => {
        if (stepNumber === 0) {
          return {
            // ここで最初のステップで使用するツールを指定
            toolChoice: { type: "tool", toolName: "getWeatherTool" },
            // このステップで使用できるツールを制限
            activeTools: ["getWeatherTool"],
          };
        }
        // 会話履歴が長くなりすぎたら、直近のメッセージだけにすることも可能
        if (messages.length > 20) {
          return {
            messages: messages.slice(-10),
          };
        }

        return {}; // デフォルトの動作
      },
    });

    console.log("\n=== 最終結果 ===");
    console.log(result.text);

    console.log("\n=== ステップ情報 ===");
    console.log(`実行ステップ数: ${result.steps.length}`);
    result.steps.forEach((step, index) => {
      console.log(`ステップ ${index + 1}: ${step.finishReason}`);
      console.log(`  入力トークン: ${step.usage.inputTokens}`);
      console.log(`  出力トークン: ${step.usage.outputTokens}`);
      console.log(`  合計トークン: ${step.usage.totalTokens}`);
      console.log(`  終了理由: ${step.finishReason}`);
    });

    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log("\n=== 詳細情報 ===");
    console.dir(result, { depth: null });
  } catch (error) {
    console.error("エラーが発生しました:", error);
  }
}

main();
