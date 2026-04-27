import { cn } from "@/lib/utils";
import { UIDataTypes, UIMessage, UITools } from "ai";
import { Bot, User } from "lucide-react";
import { MessageFileMapper } from "./MessageFileMapper";

interface MessageProps {
  message: UIMessage<unknown, UIDataTypes, UITools>;
}

/**
 * Shared Layout Wrapper to handle direction and Avatars
 */
function MessagePartContainer({
  role,
  children,
  isText = false,
}: {
  role: "system" | "user" | "assistant";
  children: React.ReactNode;
  isText?: boolean;
}) {
  const isUser = role === "user";
  const isAssistant = role === "assistant";

  return (
    <div
      className={cn("flex items-start gap-3 w-full mb-4", {
        "flex-row-reverse": isUser,
      })}>
      {/* Avatar Icon */}
      <div
        className={cn("p-2 rounded-full shrink-0", {
          "bg-primary/10": isAssistant,
          "bg-muted": isUser,
        })}>
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      {/* Content Bubble */}
      <div
        className={cn("max-w-[80%]", {
          // Only apply standard bubble styling if it's a text part
          // Files usually have their own specialized borders/padding
          "px-4 py-2 rounded-lg": isText,
          "bg-muted": isText && isAssistant,
          "bg-primary text-primary-foreground": isText && isUser,
        })}>
        {children}
      </div>
    </div>
  );
}

function Message({ message }: MessageProps) {
  return message.parts.map((part, i) => {
    const key = `${message.id}-part-${i}`;

    switch (part.type) {
      case "text":
        return (
          <MessagePartContainer key={key} role={message.role} isText>
            <p className="text-sm whitespace-pre-wrap">{part.text}</p>
          </MessagePartContainer>
        );

      case "file":
        return (
          <MessagePartContainer key={key} role={message.role}>
            <MessageFileMapper part={part} />
          </MessagePartContainer>
        );

      default:
        return null;
    }
  });
}

export default Message;
