import { cn } from "@/lib/utils";
import { ChatStatus, UIDataTypes, UIMessage, UITools } from "ai";
import { Bot, User } from "lucide-react";

interface MessageProps {
  message: UIMessage<unknown, UIDataTypes, UITools>;
}

function Message({ message }: MessageProps) {
  return message.parts.map((part, i) => {
    switch (part.type) {
      case "text":
        return (
          <div
            key={`${message.id}-part-${i}`}
            className={cn("flex items-start gap-3", {
              "flex-row-reverse": message.role === "user",
            })}>
            <div
              className={cn("p-2 rounded-full", {
                "bg-primary/10": message.role === "assistant",
                "bg-muted": message.role === "user",
              })}>
              {message.role === "user" && <User className="w-4 h-4" />}
              {message.role === "assistant" && <Bot className="w-4 h-4" />}
            </div>
            <div
              className={cn("px-4 py-2 rounded-lg max-w-[80%]", {
                "bg-muted ": message.role === "assistant",
                "bg-primary text-primary-foreground": message.role === "user",
              })}>
              <p className="text-sm">{part.text}</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  });
}

export default Message;
