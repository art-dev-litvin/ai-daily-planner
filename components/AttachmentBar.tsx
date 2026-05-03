import { Paperclip, XIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { ChatStatus } from "ai";
import Image from "next/image";

interface AttachmentBarProps {
  chatStatus: ChatStatus;
  handleUploadFiles: (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => void;
  filesPreview: string[];
  handleRemoveFile: (indexToRemove: number) => void;
  handleOpenPreviewModal: (preview: string) => void;
}

function AttachmentBar({
  chatStatus,
  handleUploadFiles,
  filesPreview,
  handleRemoveFile,
  handleOpenPreviewModal,
}: AttachmentBarProps) {
  return (
    <>
      <Button
        type="button"
        disabled={chatStatus === "streaming" || chatStatus === "submitted"}
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
        disabled={chatStatus === "streaming" || chatStatus === "submitted"}
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
              onClick={() => handleOpenPreviewModal(preview)}
              className="cursor-pointer w-full object-cover"
              src={preview}
              fill
              alt={"preview-" + i}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default AttachmentBar;
