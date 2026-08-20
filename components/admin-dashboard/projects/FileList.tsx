"use client";

//===== imports =====//
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Archive, Download, File, FileText, Image, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import ConfirmationModal from "@/components/ui/ConfirmationModal";
import { deleteFile } from "@/lib/actions/projects/file.action";

//===== types =====//
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

interface DeleteTarget {
  id: string;
  name: string;
}

export function FileList({
  projectId,
  files,
  readonly = false,
}: FileListProps) {
  //===== state =====//
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  //===== request delete =====//
  const handleDelete = (fileId: string, fileName: string) => {
    setDeleteTarget({
      id: fileId,
      name: fileName,
    });
  };

  //===== confirm delete =====//
  const confirmDelete = () => {
    if (!deleteTarget) return;

    startTransition(async () => {
      const result = await deleteFile(deleteTarget.id);

      if (result.success) {
        toast.success("File deleted");

        setDeleteTarget(null);

        router.refresh();
      } else {
        toast.error(result.error || "Failed to delete");
      }
    });
  };

  //===== close delete modal =====//
  const closeDeleteModal = () => {
    if (isPending) return;

    setDeleteTarget(null);
  };

  //===== icon =====//
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

  //===== file size =====//
  const formatSize = (bytes: number) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1048576) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  //===== empty state =====//
  if (files.length === 0) {
    return (
      <div
        className="flex min-h-[140px] flex-col items-center justify-center border border-dashed border-border bg-background/20 px-5 py-7 text-center"
      >
        <div
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground"
        >
          <File className="h-4 w-4" />
        </div>

        <p
          className="mt-3 text-sm font-semibold text-heading"
        >
          No files yet
        </p>

        <p
          className="mt-1 text-xs leading-5 text-muted-foreground"
        >
          Uploaded project documents will appear here.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className="overflow-hidden border border-border bg-background/15"
      >
        {/* ==================================================== */}
        {/* DOCUMENT LIST                                       */}
        {/* ==================================================== */}

        <div
          className="max-h-[340px] divide-y divide-border overflow-y-auto overscroll-contain"
        >
          {files.map((file) => (
            <div
              key={file.id}
              className="group flex items-center gap-3 px-3 py-3 transition-colors hover:bg-secondary/[0.025]"
            >
              {/* ================================================= */}
              {/* FILE ICON                                         */}
              {/* ================================================= */}

              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-card text-secondary"
              >
                {getIcon(file.category)}
              </div>

              {/* ================================================= */}
              {/* FILE INFO                                         */}
              {/* ================================================= */}

              <div className="min-w-0 flex-1">
                <p
                  className="truncate text-xs font-semibold text-heading"
                  title={file.name}
                >
                  {file.name}
                </p>

                <div
                  className="mt-1 flex min-w-0 items-center gap-1.5 text-[10px] text-muted-foreground"
                >
                  <span className="shrink-0">
                    {formatSize(file.sizeInBytes)}
                  </span>

                  <span
                    aria-hidden="true"
                    className="h-1 w-1 shrink-0 rounded-full bg-border"
                  />

                  <span className="truncate">
                    {format(new Date(file.createdAt), "MMM d, yyyy")}
                  </span>
                </div>
              </div>

              {/* ================================================= */}
              {/* ACTIONS                                           */}
              {/* ================================================= */}

              <div
                className="flex shrink-0 items-center gap-0.5"
              >
                <a
                  href={file.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Download ${file.name}`}
                  title="Download file"
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-colors hover:border-secondary/20 hover:bg-secondary/[0.05] hover:text-secondary"
                >
                  <Download className="h-3.5 w-3.5" />
                </a>

                {!readonly && (
                  <button
                    type="button"
                    onClick={() => handleDelete(file.id, file.name)}
                    disabled={isPending}
                    aria-label={`Delete ${file.name}`}
                    title="Delete file"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-colors hover:border-destructive/20 hover:bg-destructive/[0.06] hover:text-destructive disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ==================================================== */}
        {/* FOOTER                                              */}
        {/* ==================================================== */}

        <div
          className="flex items-center justify-between gap-3 border-t border-border bg-muted/10 px-3 py-2.5"
        >
          <div className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full bg-success"
            />

            <span
              className="font-mono text-[7px] uppercase tracking-[0.13em] text-muted-foreground/40"
            >
              Documents
            </span>
          </div>

          <span
            className="text-[11px] text-muted-foreground"
          >
            <span
              className="font-semibold text-heading"
            >
              {files.length}
            </span>{" "}
            {files.length === 1 ? "file" : "files"}
          </span>
        </div>
      </div>

      {/* ====================================================== */}
      {/* DELETE CONFIRMATION                                    */}
      {/* ====================================================== */}

      <ConfirmationModal
        isOpen={deleteTarget !== null}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Delete File"
        description={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.name}"? This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete File"
        cancelLabel="Cancel"
        isPending={isPending}
        tone="danger"
      />
    </>
  );
}
