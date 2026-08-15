"use client";

//===== imports =====//
import { useRef } from "react";
import { Upload, X, File, Image, FileText, Archive } from "lucide-react";

interface BriefAttachmentsProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  disabled?: boolean;
  accept?: string;
}

const MAX_FILE_SIZE = 10; // 10 MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

export function BriefAttachments({
  files,
  onFilesChange,
  maxFiles = 5,
  maxSizeMB = MAX_FILE_SIZE,
  disabled = false,
  accept = ".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.txt",
}: BriefAttachmentsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext))
      return <Image className="h-5 w-5" />;
    if (["pdf", "doc", "docx", "txt", "md"].includes(ext))
      return <FileText className="h-5 w-5" />;
    if (["zip", "rar", "7z", "tar", "gz"].includes(ext))
      return <Archive className="h-5 w-5" />;
    return <File className="h-5 w-5" />;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected || selected.length === 0) return;

    // Check max files
    if (files.length + selected.length > maxFiles) {
      alert(`You can upload a maximum of ${maxFiles} files.`);
      e.target.value = "";
      return;
    }

    const newFiles = Array.from(selected).filter((file) => {
      // Validate size
      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`${file.name} is too large. Max size is ${maxSizeMB}MB.`);
        return false;
      }
      // Validate type (if accept is provided)
      if (accept && !file.type.match(accept.replace(/\*/g, ".*"))) {
        // Simple check – we could do more robust validation
        const ext = file.name.split(".").pop()?.toLowerCase() || "";
        const allowedExts = accept
          .split(",")
          .map((s) => s.trim().toLowerCase());
        if (!allowedExts.some((a) => a === `.${ext}` || a === ext)) {
          alert(`${file.name} has an unsupported file type.`);
          return false;
        }
      }
      return true;
    });

    if (newFiles.length > 0) {
      onFilesChange([...files, ...newFiles]);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      {/* Upload area */}
      <div
        className={`relative rounded-lg border-2 border-dashed border-border p-6 text-center transition-colors ${
          disabled || files.length >= maxFiles
            ? "opacity-50 pointer-events-none"
            : "hover:border-secondary/50"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          disabled={disabled || files.length >= maxFiles}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">
            Drop files here or click to browse
          </p>
          <p className="text-xs text-muted-foreground">
            {files.length} / {maxFiles} files • Max {maxSizeMB}MB each
          </p>
        </div>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border border-border bg-background p-3"
            >
              <div className="flex items-center gap-3">
                {getFileIcon(file)}
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-muted-foreground hover:text-destructive transition-colors"
                disabled={disabled}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
