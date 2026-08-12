"use client";

import { deleteFile } from "@/lib/actions/projects/file.action";
//===== imports =====//
import { format } from "date-fns";
import { Download, File, Image, FileText, Archive, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

interface File {
  id: string;
  name: string;
  extension: string;
  category: string;
  sizeInBytes: number;
  uploadedBy: string;
  uploadedByRole: string;
  downloadUrl: string;
  createdAt: Date;
}

interface FileListProps {
  projectId: string;
  files: File[];
  readonly?: boolean;
}

export function FileList({
  projectId,
  files,
  readonly = false,
}: FileListProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = (fileId: string) => {
    if (!confirm("Delete this file?")) return;
    startTransition(async () => {
      const result = await deleteFile(fileId);
      if (result.success) {
        toast.success("File deleted");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to delete");
      }
    });
  };
  const getIcon = (category: string) => {
    switch (category) {
      case "image":
        return <Image className="h-4 w-4" />;
      case "document":
        return <FileText className="h-4 w-4" />;
      case "archive":
        return <Archive className="h-4 w-4" />;
      default:
        return <File className="h-4 w-4" />;
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  if (files.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No files uploaded yet.</p>
    );
  }

  return (
    <div className="space-y-2">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center gap-3 rounded-lg border border-border p-3"
        >
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded bg-muted">
            {getIcon(file.category)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {file.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatSize(file.sizeInBytes)} •{" "}
              {format(new Date(file.createdAt), "MMM d, yyyy")}
            </p>
          </div>
          <a
            href={file.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Download className="h-4 w-4" />
          </a>
          {!readonly && (
            <button
              onClick={() => handleDelete(file.id)}
              className="text-muted-foreground hover:text-destructive transition-colors"
              disabled={isPending}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
