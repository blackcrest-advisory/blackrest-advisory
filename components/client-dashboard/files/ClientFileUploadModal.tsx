"use client";

import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FileUp, FolderKanban, Loader2, Paperclip, Upload, X } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { uploadFile } from "@/api-client/upload/upload.api";
import { saveFileMetadata } from "@/lib/actions/projects/file.action";
import type { ClientFileUploadProject } from "@/lib/actions/projects/file.action";

interface ClientFileUploadModalProps {
  isOpen: boolean;
  projects: ClientFileUploadProject[];
  onClose: () => void;
  onUploadComplete: () => void;
}

function getFileCategory(fileName: string) {
  const extension = fileName.split(".").pop()?.toLowerCase() ?? "";

  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension)) {
    return "image";
  }

  if (["pdf", "doc", "docx", "txt", "md"].includes(extension)) {
    return "document";
  }

  if (["zip", "rar", "7z", "tar", "gz"].includes(extension)) {
    return "archive";
  }

  if (["mp4", "mov", "webm", "avi"].includes(extension)) {
    return "video";
  }

  return "other";
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ClientFileUploadModal({
  isOpen,
  projects,
  onClose,
  onUploadComplete,
}: ClientFileUploadModalProps) {
  const [projectId, setProjectId] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const projectOptions = [
    { value: "", label: "Choose a project" },
    ...projects.map((project) => ({
      value: project.id,
      label: project.title,
    })),
  ];

  const resetAndClose = (force = false) => {
    if (isUploading && !force) return;
    setProjectId("");
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onClose();
  };

  const handleUpload = async () => {
    if (!projectId || !selectedFile) {
      toast.error("Choose a project and file before uploading.");
      return;
    }

    setIsUploading(true);

    try {
      const uploadedFile = await uploadFile(selectedFile);
      const extension = selectedFile.name.split(".").pop()?.toLowerCase() ?? "";

      const result = await saveFileMetadata({
        projectId,
        filePath: uploadedFile.path,
        name: selectedFile.name,
        extension,
        category: getFileCategory(selectedFile.name),
        sizeInBytes: selectedFile.size,
        downloadUrl: uploadedFile.url,
        previewUrl: getFileCategory(selectedFile.name) === "image" ? uploadedFile.url : undefined,
      });

      if (!result.success) {
        toast.error(result.error || "Failed to save file metadata.");
        return;
      }

      toast.success("File uploaded successfully.");
      onUploadComplete();
      resetAndClose(true);
    } catch {
      toast.error("File upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={resetAndClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-navy-deep/70 backdrop-blur-[3px]" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
            <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0 translate-y-2 scale-[0.98]" enterTo="opacity-100 translate-y-0 scale-100" leave="ease-in duration-150" leaveFrom="opacity-100 translate-y-0 scale-100" leaveTo="opacity-0 translate-y-2 scale-[0.98]">
              <Dialog.Panel className="relative w-full max-w-lg overflow-hidden border border-border bg-card shadow-[var(--shadow-overlay)]">
                <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/45 to-transparent" />

                <div className="relative z-10 flex items-start gap-4 border-b border-border px-5 py-5 sm:px-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-secondary/15 bg-secondary/[0.05] text-secondary">
                    <FileUp className="h-4 w-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-secondary">Document exchange</span>
                    <Dialog.Title as="h2" className="mt-1 text-lg font-semibold tracking-[-0.025em] text-heading">Upload project file</Dialog.Title>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">Select the project this document belongs to, then upload it to your secure workspace.</p>
                  </div>

                  <button type="button" onClick={() => resetAndClose()} disabled={isUploading} aria-label="Close upload dialog" className="flex h-8 w-8 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:bg-muted/30 hover:text-heading disabled:cursor-not-allowed disabled:opacity-50">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="relative z-10 space-y-5 px-5 py-5 sm:px-6">
                  {projects.length === 0 ? (
                    <div className="border border-dashed border-border bg-muted/10 px-5 py-8 text-center">
                      <FolderKanban className="mx-auto h-5 w-5 text-secondary" />
                      <p className="mt-3 text-sm font-semibold text-heading">No projects available</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">Files can be uploaded once you have an active project.</p>
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold text-heading">Project</label>
                        <Select options={projectOptions} value={projectId} onChange={setProjectId} />
                      </div>

                      <div>
                        <input ref={fileInputRef} type="file" className="sr-only" onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)} disabled={isUploading} />

                        <button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploading} className="group w-full border border-dashed border-border bg-background/25 px-4 py-5 text-left transition-colors hover:border-secondary/35 hover:bg-secondary/[0.025] disabled:cursor-not-allowed disabled:opacity-60">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-border bg-card text-secondary transition-colors group-hover:border-secondary/20"><Paperclip className="h-4 w-4" /></div>
                            <div className="min-w-0 flex-1">
                              <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">{selectedFile ? "File selected" : "Choose a document"}</span>
                              <p className="mt-1 truncate text-sm font-semibold text-heading">{selectedFile?.name ?? "Browse files from your device"}</p>
                              <p className="mt-1 text-[11px] text-muted-foreground">{selectedFile ? `${formatFileSize(selectedFile.size)} · ${selectedFile.type || "Unknown type"}` : "Documents, images, videos, and archives are supported."}</p>
                            </div>
                            <Upload className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-secondary" />
                          </div>
                        </button>
                      </div>
                    </>
                  )}
                </div>

                <div className="relative z-10 flex flex-col-reverse gap-2 border-t border-border bg-muted/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-6">
                  <Button variant="outline" size="sm" onClick={() => resetAndClose()} disabled={isUploading} className="w-full sm:w-auto">Cancel</Button>
                  <Button variant="primary" size="sm" onClick={handleUpload} disabled={isUploading || projects.length === 0 || !projectId || !selectedFile} className="w-full sm:w-auto">
                    {isUploading ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Uploading...</> : <><Upload className="h-3.5 w-3.5" /> Upload file</>}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
