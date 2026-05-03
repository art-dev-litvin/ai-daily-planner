import React from "react";
import { Input } from "./ui/input";
import { ChatStatus } from "ai";

interface ChatInputProps {
  prompt: string;
  chatStatus: ChatStatus;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  handlePasteImage: (e: React.ClipboardEvent<HTMLInputElement>) => void;
}

function ChatInput({
  prompt,
  setPrompt,
  handlePasteImage,
  chatStatus,
}: ChatInputProps) {
  return (
    <Input
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      onPaste={handlePasteImage}
      type="text"
      placeholder="Type your message or paste an image..."
      className="flex-1"
      disabled={chatStatus === "streaming" || chatStatus === "submitted"}
    />
  );
}

export default ChatInput;
