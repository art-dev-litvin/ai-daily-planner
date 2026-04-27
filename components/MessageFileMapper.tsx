import {
  FileIcon,
  FileText,
  Download,
  FileArchive,
  FileCode,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FileUIPart } from "ai";
import Image from "next/image";

interface MessageFileMapperProps {
  part: FileUIPart;
}

export function MessageFileMapper({ part }: MessageFileMapperProps) {
  const { mediaType, url, filename } = part;

  const isImage = mediaType.startsWith("image/");
  const isPDF = mediaType === "application/pdf";
  const isArchive = mediaType.includes("zip") || mediaType.includes("tar");
  const isCode =
    mediaType.includes("javascript") ||
    mediaType.includes("typescript") ||
    mediaType.includes("json");

  const getFileIcon = () => {
    if (isPDF) return <FileText className="h-5 w-5 text-red-500" />;
    if (isArchive) return <FileArchive className="h-5 w-5 text-amber-500" />;
    if (isCode) return <FileCode className="h-5 w-5 text-blue-500" />;
    return <FileIcon className="h-5 w-5 text-slate-500" />;
  };

  const containerClasses =
    "mt-2 overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md";

  if (isImage) {
    return (
      <div
        className={cn(
          containerClasses,
          "max-w-sm border-none shadow-none group relative",
        )}>
        <Image
          width={100}
          height={100}
          src={url}
          alt={filename ?? "Uploaded image"}
          className="h-auto w-full rounded-lg object-cover"
        />
        {/* Subtle overlay with filename on hover if it exists */}
        {filename && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 opacity-0 transition-opacity group-hover:opacity-100">
            <p className="truncate text-xs text-white">{filename}</p>
          </div>
        )}
      </div>
    );
  }

  // --- Document/File View ---
  return (
    <div
      className={cn(
        containerClasses,
        "flex items-center gap-3 p-3 min-w-60 max-w-md",
      )}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted/50">
        {getFileIcon()}
      </div>

      <div className="flex flex-col overflow-hidden flex-1">
        <span className="truncate text-sm font-medium leading-none mb-1">
          {filename ?? "Untitled File"}
        </span>
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">
          {mediaType.split("/")[1]}
        </span>
      </div>

      <a
        href={url}
        download={filename ?? true}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-2 p-2 hover:bg-muted rounded-md transition-colors text-muted-foreground hover:text-foreground">
        <Download className="h-4 w-4" />
      </a>
    </div>
  );
}
