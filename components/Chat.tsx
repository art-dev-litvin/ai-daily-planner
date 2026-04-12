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
import { Paperclip, Send, Bot, User } from "lucide-react";

export function ChatUI() {
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
            {/* Example AI Message */}
            <div className="flex items-start gap-3">
              <div className="bg-muted p-2 rounded-full">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-muted px-4 py-2 rounded-lg max-w-[80%]">
                <p className="text-sm">
                  Hello! I&apos;m your AI Daily Planner. How can I help you
                  organize your day?
                </p>
              </div>
            </div>

            {/* Example User Message with Image placeholder */}
            <div className="flex items-start gap-3 flex-row-reverse">
              <div className="bg-primary/10 p-2 rounded-full">
                <User className="w-4 h-4" />
              </div>
              <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg max-w-[80%]">
                <p className="text-sm">Can you add these tasks to my list?</p>
                {/* Image Placeholder */}
                <div className="mt-2 w-48 h-32 bg-secondary rounded flex items-center justify-center text-xs text-muted-foreground">
                  [Attached Image]
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="p-4 border-t">
        <div className="flex w-full items-center space-x-2">
          <Button variant="outline" size="icon" className="shrink-0">
            <Paperclip className="w-4 h-4" />
            <span className="sr-only">Attach file</span>
          </Button>
          <Input
            type="text"
            placeholder="Type your message or paste an image..."
            className="flex-1"
          />
          <Button size="icon" className="shrink-0">
            <Send className="w-4 h-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
