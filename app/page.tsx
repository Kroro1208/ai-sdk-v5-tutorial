"use client";

import { useChat } from "@ai-sdk/react";
import Messages from "../components/Messages";
import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

export default function Home() {
  const { messages, sendMessage } = useChat();
  const [inputText, setInputText] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const submitMessage = async () => {
    if (inputText.trim() === "") return;
    const text = inputText;
    setInputText("");
    await sendMessage({ text });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (e.nativeEvent.isComposing) {
        return;
      }
      if (e.shiftKey) {
        return;
      }
      // Enterのみは送信
      e.preventDefault();
      submitMessage();
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="shrink-0 py-10 text-center">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
          Welcome to AI SDK v5 Practice
        </h1>
      </div>
      <div
        className="flex-1 shrink-0 overflow-y-auto pb-4 w-full"
        ref={scrollAreaRef}
      >
        {/* ここにMessagesコンポーネントを */}
        <Messages messages={messages} messagesEndRef={messagesEndRef} />
      </div>
      <div className="shrink-0 border-t border-zinc-700 bg-black mb-5">
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
          <TextareaAutosize
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            minRows={1}
            maxRows={10}
            className="mt-4 w-full rounded border border-zinc-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 resize-none"
          />
        </form>
      </div>
    </div>
  );
}
