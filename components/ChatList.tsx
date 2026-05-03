import { ScrollArea } from "@/components/ui/scroll-area";

import Message from "./Message";

import { Skeleton } from "./ui/skeleton";

import EmptyChatContent from "./EmptyChatContent";
import { CardContent } from "./ui/card";
import { ChatStatus, UIDataTypes, UIMessage, UITools } from "ai";
import { Bot } from "lucide-react";
import { Button } from "./ui/button";

interface ChatListProps {
  messages: UIMessage<unknown, UIDataTypes, UITools>[];
  chatStatus: ChatStatus;
  error: Error | undefined;
  handleUploadFiles: (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => void;
  setPromptValue: React.Dispatch<React.SetStateAction<string>>;
  regenerate: () => Promise<void>;
}

function ChatList({
  messages,
  chatStatus,
  error,
  regenerate,
  handleUploadFiles,
  setPromptValue,
}: ChatListProps) {
  return (
    <>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full p-6">
          <div className="flex flex-col gap-4">
            {messages.length === 0 && chatStatus === "ready" && (
              <EmptyChatContent
                chatStatus={chatStatus}
                onUploadFiles={handleUploadFiles}
                setPromptValue={setPromptValue}
              />
            )}

            {messages.map((message) => (
              <Message message={message} key={message.id} />
            ))}

            {chatStatus === "submitted" && (
              <div className="flex items-start gap-3">
                <div className={"bg-primary/10 p-2 rounded-full"}>
                  <Bot className="w-4 h-4" />
                </div>
                <div className="grow flex flex-col gap-2">
                  <Skeleton className="h-4 bg-gray-300 max-w-[80%]" />
                  <Skeleton className="h-4 bg-gray-300 max-w-[70%]" />
                  <Skeleton className="h-4 bg-gray-300 max-w-[50%]" />
                  <Skeleton className="h-4 bg-gray-300 max-w-[60%]" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>

      {error && (
        <div className="px-4 pb-2">
          <div className="bg-destructive/15 border border-destructive text-destructive px-4 py-2 rounded-md text-xs flex justify-between items-center">
            <span>
              <strong>Error:</strong> {error?.message || "Something went wrong"}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => regenerate()}
              className="h-7 px-2 underline hover:bg-red-100 hover:text-destructive">
              Try again
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatList;
