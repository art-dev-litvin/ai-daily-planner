"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Paperclip, Send, Bot } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import React from "react";
import Message from "./Message";
import { Skeleton } from "./ui/skeleton";

export function ChatUI() {
  const [promptValue, setPromptValue] = React.useState("");

  const { messages, status, sendMessage } = useChat();

  const handleSendMessage = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (promptValue.trim()) {
      sendMessage({ files: [], text: promptValue }).catch((error) =>
        console.log(error),
      );

      setPromptValue("");
    }
  };
  console.log(JSON.stringify(messages));

  return (
    <Card className="flex flex-col h-full shadow-sm">
      <CardHeader className="border-b px-6 py-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bot className="w-5 h-5" />
          AI Planner Assistant
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full p-6">
          <div className="flex flex-col gap-4">
            {messages.map((message) => (
              <Message message={message} key={message.id} />
            ))}

            {status === "submitted" && (
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

      <CardFooter className="p-4 border-t">
        <form
          onSubmit={handleSendMessage}
          className="flex w-full items-center space-x-2">
          <Button variant="outline" size="icon" className="shrink-0">
            <Paperclip className="w-4 h-4" />
            <span className="sr-only">Attach file</span>
          </Button>
          <Input
            value={promptValue}
            onChange={(e) => setPromptValue(e.target.value)}
            type="text"
            placeholder="Type your message or paste an image..."
            className="flex-1"
          />
          <Button
            disabled={!promptValue.trim()}
            size="icon"
            className="shrink-0">
            <Send className="w-4 h-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
