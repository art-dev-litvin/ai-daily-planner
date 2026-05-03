"use client";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Bot } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "radix-ui";
import { useFileAttachments } from "@/app/hooks/useFileAttachments";
import ChatList from "./ChatList";
import AttachmentBar from "./AttachmentBar";
import ChatInput from "./ChatInput";
//import { mockedMessages } from "@/app/mock/mockedMessages";

export function ChatUI() {
  const [prompt, setPrompt] = React.useState("");

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

    const hasText = prompt.trim().length > 0;
    const hasFiles = uploadedFiles.length > 0;

    if (hasText || hasFiles) {
      let files: FileList | undefined = undefined;

      if (hasFiles) {
        const dataTransfer = new DataTransfer();
        uploadedFiles.forEach((file) => dataTransfer.items.add(file));
        files = dataTransfer.files;
      }

      sendMessage({ files: files, text: prompt }).catch((error) =>
        console.log(error),
      );

      filesPreview.forEach((preview) => URL.revokeObjectURL(preview));
      setPrompt("");
      cleanFilesAndPreviews();
    }
  };

  const handleOpenPreviewModal = (preview: string) => {
    setSelectedImagePreview(preview);
    setImagePreviewModalOpen(true);
  };
  const onClosePreviewModal = () => {
    setSelectedImagePreview(null);
    setImagePreviewModalOpen(false);
  };

  return (
    <>
      <Card className="flex flex-col h-full shadow-sm">
        <CardHeader className="border-b px-6 py-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="w-5 h-5" />
            AI Planner Assistant
          </CardTitle>
        </CardHeader>

        <ChatList
          chatStatus={status}
          error={error}
          messages={messages}
          regenerate={regenerate}
          handleUploadFiles={handleUploadFiles}
          setPrompt={setPrompt}
        />

        <CardFooter className="relative p-4 border-t">
          <form
            onSubmit={handleSendMessage}
            className="flex w-full items-center space-x-2">
            <AttachmentBar
              chatStatus={status}
              filesPreview={filesPreview}
              handleOpenPreviewModal={handleOpenPreviewModal}
              handleRemoveFile={handleRemoveFile}
              handleUploadFiles={handleUploadFiles}
            />

            <ChatInput
              prompt={prompt}
              setPrompt={setPrompt}
              handlePasteImage={handlePasteImage}
            />

            <Button
              type="submit"
              disabled={
                (!prompt.trim() && uploadedFiles.length === 0) ||
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

      <Dialog onOpenChange={onClosePreviewModal} open={imagePreviewModalOpen}>
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
    </>
  );
}
