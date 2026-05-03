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
import { Paperclip, Send, Bot, XIcon } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import React from "react";
import Message from "./Message";
import { Skeleton } from "./ui/skeleton";
import EmptyChatContent from "./EmptyChatContent";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "radix-ui";
import { useFileAttachments } from "@/app/hooks/useFileAttachments";
//import { mockedMessages } from "@/app/mock/mockedMessages";

export function ChatUI() {
  const [promptValue, setPromptValue] = React.useState("");

  const [selectedImagePreview, setSelectedImagePreview] = React.useState<
    string | null
  >(null);
  const [imagePreviewModalOpen, setImagePreviewModalOpen] =
    React.useState(false);

  const {
    uploadedFiles,
    filesPreview,
    handleUploadFiles,
    handleRemoveFile,
    handlePasteImage,
    cleanFilesAndPreviews,
  } = useFileAttachments();

  const { messages, status, error, sendMessage, regenerate } = useChat();

  const handleSendMessage = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasText = promptValue.trim().length > 0;
    const hasFiles = uploadedFiles.length > 0;

    if (hasText || hasFiles) {
      let files: FileList | undefined = undefined;

      if (hasFiles) {
        const dataTransfer = new DataTransfer();
        uploadedFiles.forEach((file) => dataTransfer.items.add(file));
        files = dataTransfer.files;
      }

      sendMessage({ files: files, text: promptValue }).catch((error) =>
        console.log(error),
      );

      filesPreview.forEach((preview) => URL.revokeObjectURL(preview));
      setPromptValue("");
      cleanFilesAndPreviews();
    }
  };

  const onOpenPreviewModal = (preview: string) => {
    setSelectedImagePreview(preview);
    setImagePreviewModalOpen(true);
  };
  const onClosePreviewModal = () => {
    setSelectedImagePreview(null);
    setImagePreviewModalOpen(false);
  };

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
            {messages.length === 0 && status === "ready" && (
              <EmptyChatContent
                chatStatus={status}
                onUploadFiles={handleUploadFiles}
                setPromptValue={setPromptValue}
              />
            )}

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

      <CardFooter className="relative p-4 border-t">
        <form
          onSubmit={handleSendMessage}
          className="flex w-full items-center space-x-2">
          <Button
            type="button"
            disabled={status === "streaming" || status === "submitted"}
            variant="outline"
            size="icon"
            className="shrink-0">
            <label
              className="size-full flex justify-center items-center"
              htmlFor="chat-file-upload">
              <Paperclip className="w-4 h-4" />
            </label>
          </Button>
          <input
            multiple
            onChange={handleUploadFiles}
            disabled={status === "streaming" || status === "submitted"}
            id="chat-file-upload"
            type="file"
            accept="image/png, image/jpeg, image/webp"
            className="sr-only"
            aria-label="Upload image"
          />

          <div className="flex gap-2 absolute -translate-y-full -top-1 left-4">
            {filesPreview.map((preview, i) => (
              <div
                key={preview}
                className="group rounded-sm size-14 overflow-hidden relative">
                <Button
                  onClick={() => handleRemoveFile(i)}
                  variant="ghost"
                  className="group-hover:opacity-100 z-10 opacity-0 rounded-full bg-black/70 hover:bg-black size-6 absolute right-0.5 top-0.5">
                  <XIcon className="text-white" />
                </Button>
                <Image
                  onClick={() => onOpenPreviewModal(preview)}
                  className="cursor-pointer w-full object-cover"
                  src={preview}
                  fill
                  alt={"preview-" + i}
                />
              </div>
            ))}
          </div>

          <Dialog
            onOpenChange={onClosePreviewModal}
            open={imagePreviewModalOpen}>
            <VisuallyHidden.Root>
              <DialogTitle>Uploaded image preview</DialogTitle>
              <DialogDescription>
                View the image before sending it to the chat.
              </DialogDescription>
            </VisuallyHidden.Root>
            <DialogContent
              closeButtonClassName="[&_svg]:size-10! bg-black/70 [&_svg]:text-white hover:[&_svg]:text-black size-auto top-5 right-5"
              className="h-11/12 max-w-175!">
              {selectedImagePreview && (
                <Image
                  className="size-full object-cover rounded-md"
                  src={selectedImagePreview}
                  alt="Image preview"
                  width={100}
                  height={100}
                />
              )}
            </DialogContent>
          </Dialog>

          <Input
            value={promptValue}
            onChange={(e) => setPromptValue(e.target.value)}
            onPaste={handlePasteImage}
            type="text"
            placeholder="Type your message or paste an image..."
            className="flex-1"
            disabled={status === "streaming" || status === "submitted"}
          />
          <Button
            type="submit"
            disabled={
              (!promptValue.trim() && uploadedFiles.length === 0) ||
              status === "streaming" ||
              status === "submitted"
            }
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
