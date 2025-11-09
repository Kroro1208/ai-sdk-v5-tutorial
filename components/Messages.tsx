import { RefObject } from "react";

type MessagesProps = {
  messagesEndRef: RefObject<HTMLDivElement | null>;
  // TODO: messagesの型を定義
};

const Messages = ({ messages, messagesEndRef }: MessagesProps) => {
  // TODO: messagesを出力して中身を確認してみよう

  return (
    <div className="flex flex-col gap-4 w-full max-w-3xl mx-auto px-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              msg.role === "user"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-zinc-800 dark:text-white"
            }`}
          >
            <div>
              {/* TODO:  メッセージ送信者を判定して適切な表示名に変換*/}
              <strong>{"ここに実装"}</strong>
              {msg.parts.map((part, index) => {
                switch (part.type) {
                  case "text":
                    return (
                      <div key={`${msg.id}-${index}`} className="mt-5">
                        {/* TODO: 送信者がAIの場合はmarkdownで出力して見やすくする */}
                        <p>{part.text}</p>
                      </div>
                    );
                  // TODO: route.tsで設定した思考プロセスを表示させる実装を追加
                  default:
                    return null;
                }
              })}
            </div>
          </div>
          <div ref={messagesEndRef} />
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
