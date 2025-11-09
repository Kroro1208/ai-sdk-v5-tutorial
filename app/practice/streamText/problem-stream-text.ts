import { streamText } from "ai";
import "dotenv/config";

const result = await streamText({
  // TODO: ここに必要なパラメータを追加
});

// TODO: ストリームの各部分を処理
// ここにストリーム処理のコードを追加します

// ストリーミング完了後の情報取得
const usage = await result.usage;
console.log(`\n使用トークン数: ${usage.totalTokens}`);
