import React from "react";
import { Input } from "./ui/input";
import { ChatStatus } from "ai";
import { useCompletion } from "@ai-sdk/react";
import { ArrowUp, Loader2 } from "lucide-react";
import { useDebounceFunc } from "@/hooks/useDebounce";

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
  const { completion, complete, setCompletion, isLoading } = useCompletion({
    api: "/api/completion",
  });

  const debouncedComplete = useDebounceFunc(complete, 500);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // When user presses Tab and there is a suggestion available
    if (e.key === "Tab" && completion) {
      e.preventDefault(); // Stop the focus from jumping
      setPrompt((prev) => prev + completion); // Apply the completion
      setCompletion(""); // Clear the suggestion
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrompt(value);

    // Only trigger autocomplete if the user has typed something
    if (value.length > 12) {
      debouncedComplete(value);
    } else {
      setCompletion("");
    }
  };

  return (
    <div className="relative grow">
      <Input
        value={prompt}
        onChange={handleChange}
        onPaste={handlePasteImage}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Type your message or paste an image..."
        className="flex-1"
        disabled={chatStatus === "streaming" || chatStatus === "submitted"}
      />
      {(completion || isLoading) && (
        <div className="absolute bottom-full left-0 mb-2 w-full animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between px-4 py-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg shadow-black/5">
            <div className="flex items-center gap-2 overflow-hidden mr-4">
              <span className="text-zinc-400 dark:text-zinc-500 shrink-0">
                {isLoading && !completion ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <ArrowUp className="size-4" />
                )}
              </span>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 truncate italic">
                {completion || "Thinking..."}
              </p>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <span className="px-1.5 py-0.5 text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded border border-zinc-200 dark:border-zinc-700">
                TAB
              </span>
              <span className="text-[11px] text-zinc-400">Apply</span>
            </div>
          </div>

          <div className="absolute -bottom-1 left-6 w-2 h-2 bg-white dark:bg-zinc-900 border-r border-b border-zinc-200 dark:border-zinc-800 rotate-45"></div>
        </div>
      )}
    </div>
  );
}

export default ChatInput;
