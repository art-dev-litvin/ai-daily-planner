import React from "react";
import { Input } from "./ui/input";

interface ChatInputProps {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  handlePasteImage: (e: React.ClipboardEvent<HTMLInputElement>) => void;
}

function ChatInput({ prompt, setPrompt, handlePasteImage }: ChatInputProps) {
  return (
    <Input
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      onPaste={handlePasteImage}
      type="text"
      placeholder="Type your message or paste an image..."
      className="flex-1"
      disabled={status === "streaming" || status === "submitted"}
    />
  );
}

export default ChatInput;
