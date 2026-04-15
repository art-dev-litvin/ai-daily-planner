import { ListChecks, CalendarPlus, Sparkles, ImagePlus } from "lucide-react";
import { Button } from "./ui/button";

interface EmptyChatContentProps {
  setPromptValue: React.Dispatch<React.SetStateAction<string>>;
  onUploadFiles: (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => void;
}

function EmptyChatContent({
  setPromptValue,
  onUploadFiles,
}: EmptyChatContentProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 py-12 text-center animate-in fade-in duration-500">
      <div className="bg-primary/10 p-4 rounded-full mb-4">
        <Sparkles className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-xl font-bold tracking-tight mb-2">
        Ready to optimize your day?
      </h3>
      <p className="text-muted-foreground text-sm max-w-[320px] mb-8">
        I can help you organize tasks, extract to-dos from photos, or manage
        your schedule.
      </p>

      {/* Suggestion Chips */}
      <div className="grid grid-cols-1 gap-3 w-full max-w-95">
        <Button
          variant="outline"
          className="h-auto py-3 px-4 justify-start text-left bg-background/50"
          onClick={() => setPromptValue("What are my tasks for today?")}>
          <ListChecks className="mr-3 h-4 w-4 text-primary" />
          <span className="text-sm">Check today&apos;s schedule</span>
        </Button>

        <Button
          variant="outline"
          className="h-auto py-3 px-4 justify-start text-left bg-background/50"
          onClick={() => setPromptValue("Add a new task: ")}>
          <CalendarPlus className="mr-3 h-4 w-4 text-primary" />
          <span className="text-sm">Add a new priority task</span>
        </Button>

        <Button
          variant="outline"
          className="h-auto justify-start py-3 px-4 text-left bg-background/50"
          onClick={() => {}}>
          <label className="flex gap-1.5" htmlFor="empty-chat-file-upload">
            <ImagePlus className="mr-3 h-4 w-4 text-primary" />
            <span className="text-sm">Scan image for to-dos</span>
          </label>
        </Button>

        <input
          multiple
          onChange={onUploadFiles}
          disabled={status === "streaming" || status === "submitted"}
          id="empty-chat-file-upload"
          type="file"
          accept="image/png, image/jpeg, image/webp"
          className="sr-only"
          aria-label="Upload image"
        />
      </div>
    </div>
  );
}

export default EmptyChatContent;
