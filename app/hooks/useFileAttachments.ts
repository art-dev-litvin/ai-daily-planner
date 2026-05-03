import React from "react";

export const useFileAttachments = () => {
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);
  const [filesPreview, setFilesPreview] = React.useState<string[]>([]);

  // watch and clean up removed files from memory
  const filesPreviewRef = React.useRef<string[]>([]);
  React.useEffect(() => {
    filesPreviewRef.current = filesPreview;
  }, [filesPreview]);

  React.useEffect(() => {
    return () => {
      filesPreviewRef.current.forEach((preview) =>
        URL.revokeObjectURL(preview),
      );
    };
  }, []);

  const processFiles = (newFiles: File[]) => {
    if (newFiles.length === 0) return;

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

    setUploadedFiles((prev) => [...prev, ...newFiles]);
    setFilesPreview((prev) => [...prev, ...newPreviews]);
  };

  const handleUploadFiles = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (!files) return;

    processFiles(Array.from(files));

    e.target.value = "";
  };

  const handleRemoveFile = (indexToRemove: number) => {
    URL.revokeObjectURL(filesPreview[indexToRemove]);

    setUploadedFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );

    setFilesPreview((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  const handlePasteImage = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const items = Array.from(e.clipboardData.items);
    const pastedFiles: File[] = [];

    items.forEach((item) => {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) {
          // Prevent the browser from trying to paste the image as text/binary
          e.preventDefault();
          pastedFiles.push(file);
        }
      }
    });

    processFiles(pastedFiles);
  };

  const cleanFilesAndPreviews = () => {
    setUploadedFiles([]);
    setFilesPreview([]);
  };

  return {
    uploadedFiles,
    filesPreview,
    handleUploadFiles,
    handleRemoveFile,
    handlePasteImage,
    cleanFilesAndPreviews,
  };
};
