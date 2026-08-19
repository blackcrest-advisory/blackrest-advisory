"use client";

//===== imports =====//
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Archive,
  File,
  FileText,
  Image,
  Loader2,
  Paperclip,
  Upload,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/Button";

import {
  getUploadUrl,
  saveFileMetadata,
} from "@/lib/actions/projects/file.action";

import { supabaseAnon } from "@/lib/supabase/client";

//===== types =====//
interface FileUploaderProps {
  projectId: string;
  onUploadComplete?: () => void;
}

export function FileUploader({
  projectId,
  onUploadComplete,
}: FileUploaderProps) {
  //===== state =====//
  const [isUploading, setIsUploading] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  //===== file selection =====//
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  //===== upload =====//
  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    try {
      //===== 1. get signed upload URL =====//
      const urlResult = await getUploadUrl(
        projectId,
        selectedFile.name,
        selectedFile.type,
      );

      if (!urlResult.success) {
        toast.error(urlResult.error || "Failed to get upload URL");

        return;
      }

      const { uploadUrl, filePath } = urlResult.data;

      //===== 2. upload to Supabase =====//
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        body: selectedFile,
        headers: {
          "Content-Type": selectedFile.type,
        },
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();

        toast.error(`Upload failed: ${errorText}`);

        return;
      }

      //===== 3. get public URL =====//
      const { data: publicUrlData } = supabaseAnon.storage
        .from("projects")
        .getPublicUrl(filePath);

      const downloadUrl = publicUrlData.publicUrl;

      //===== 4. determine category =====//
      const extension = selectedFile.name.split(".").pop()?.toLowerCase() || "";

      let category = "other";

      if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension)) {
        category = "image";
      } else if (["pdf", "doc", "docx", "txt", "md"].includes(extension)) {
        category = "document";
      } else if (["zip", "rar", "7z", "tar", "gz"].includes(extension)) {
        category = "archive";
      }

      //===== 5. save metadata =====//
      const saveResult = await saveFileMetadata({
        projectId,
        filePath,
        name: selectedFile.name,
        extension,
        category,
        sizeInBytes: selectedFile.size,
        downloadUrl,
      });

      if (!saveResult.success) {
        toast.error(saveResult.error || "Failed to save file metadata");

        return;
      }

      toast.success("File uploaded successfully");

      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      router.refresh();

      onUploadComplete?.();
    } catch (error: any) {
      console.error("Upload error:", error);

      toast.error(error.message || "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  //===== clear selection =====//
  const clearSelected = () => {
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  //===== open file picker =====//
  const openFilePicker = () => {
    if (isUploading) return;

    fileInputRef.current?.click();
  };

  //===== file icon =====//
  const getFileIcon = (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase() || "";

    if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext)) {
      return <Image className="h-4 w-4" />;
    }

    if (["pdf", "doc", "docx", "txt", "md"].includes(ext)) {
      return <FileText className="h-4 w-4" />;
    }

    if (["zip", "rar", "7z", "tar", "gz"].includes(ext)) {
      return <Archive className="h-4 w-4" />;
    }

    return <File className="h-4 w-4" />;
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

  return (
    <div className="space-y-3">
      {/* ====================================================== */}
      {/* HIDDEN INPUT                                           */}
      {/* ====================================================== */}

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        disabled={isUploading}
        className="sr-only"
      />

      {/* ====================================================== */}
      {/* EMPTY / PICKER STATE                                   */}
      {/* ====================================================== */}

      {!selectedFile && (
        <button
          type="button"
          onClick={openFilePicker}
          disabled={isUploading}
          className="
            group
            relative
            w-full
            overflow-hidden
            border border-dashed border-border
            bg-background/20
            px-4 py-5
            text-left
            transition-colors
            hover:border-secondary/30
            hover:bg-secondary/[0.025]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {/* top signal */}
          <div
            aria-hidden="true"
            className="
              absolute
              left-0 top-0
              h-[2px] w-16
              bg-secondary/50
              transition-all
              duration-300
              group-hover:w-24
            "
          />

          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            {/* icon */}
            <div
              className="
                flex h-10 w-10
                shrink-0
                items-center
                justify-center
                rounded-md
                border border-border
                bg-card
                text-secondary
                transition-colors
                group-hover:border-secondary/20
                group-hover:bg-secondary/[0.05]
              "
            >
              <Upload className="h-4 w-4" />
            </div>

            {/* copy */}
            <div className="min-w-0 flex-1">
              <span
                className="
                  font-mono
                  text-[7px]
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-secondary
                "
              >
                Document upload
              </span>

              <p
                className="
                  mt-1
                  text-sm
                  font-semibold
                  text-heading
                "
              >
                Choose a project file
              </p>

              <p
                className="
                  mt-1
                  text-[11px]
                  leading-4
                  text-muted-foreground
                "
              >
                Select a document, image, or archive from your device.
              </p>
            </div>

            <div
              className="
                hidden
                shrink-0
                items-center
                gap-2
                sm:flex
              "
            >
              <span
                className="
                  font-mono
                  text-[7px]
                  font-semibold
                  uppercase
                  tracking-[0.13em]
                  text-muted-foreground/35
                "
              >
                Browse
              </span>

              <Paperclip
                className="
                  h-3.5 w-3.5
                  text-muted-foreground
                  transition-colors
                  group-hover:text-secondary
                "
              />
            </div>
          </div>
        </button>
      )}

      {/* ====================================================== */}
      {/* SELECTED FILE                                          */}
      {/* ====================================================== */}

      {selectedFile && (
        <div
          className="
            relative
            overflow-hidden
            border border-border
            bg-background/25
          "
        >
          {/* top signal */}
          <div
            aria-hidden="true"
            className="
              absolute
              left-0 top-0
              h-[2px] w-full
              bg-gradient-to-r
              from-secondary/70
              via-secondary/20
              to-transparent
            "
          />

          {/* ================================================== */}
          {/* FILE PREVIEW                                       */}
          {/* ================================================== */}

          <div
            className="
              flex
              items-start
              gap-3
              px-4 py-4
            "
          >
            <div
              className="
                flex h-10 w-10
                shrink-0
                items-center
                justify-center
                rounded-md
                border border-secondary/15
                bg-secondary/[0.05]
                text-secondary
              "
            >
              {getFileIcon(selectedFile)}
            </div>

            <div className="min-w-0 flex-1">
              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-3
                "
              >
                <div className="min-w-0">
                  <span
                    className="
                      font-mono
                      text-[7px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-muted-foreground/40
                    "
                  >
                    Selected file
                  </span>

                  <p
                    className="
                      mt-1
                      truncate
                      text-sm
                      font-semibold
                      text-heading
                    "
                    title={selectedFile.name}
                  >
                    {selectedFile.name}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={clearSelected}
                  disabled={isUploading}
                  aria-label="Clear selected file"
                  className="
                    flex h-7 w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-md
                    text-muted-foreground
                    transition-colors
                    hover:bg-muted/40
                    hover:text-heading
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* metadata */}
              <div
                className="
                  mt-2
                  flex
                  flex-wrap
                  items-center
                  gap-x-2
                  gap-y-1
                  text-[10px]
                  text-muted-foreground
                "
              >
                <span>{formatSize(selectedFile.size)}</span>

                <span className="h-1 w-1 rounded-full bg-border" />

                <span className="uppercase">
                  {selectedFile.name.split(".").pop() || "FILE"}
                </span>

                {selectedFile.type && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-border" />

                    <span className="max-w-[150px] truncate">
                      {selectedFile.type}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ================================================== */}
          {/* ACTION BAR                                         */}
          {/* ================================================== */}

          <div
            className="
              flex
              flex-col-reverse
              gap-2
              border-t border-border
              bg-muted/10
              px-4 py-3
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <button
              type="button"
              onClick={openFilePicker}
              disabled={isUploading}
              className="
                text-left
                text-[11px]
                font-medium
                text-muted-foreground
                transition-colors
                hover:text-secondary
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Choose another file
            </button>

            <Button
              variant="primary"
              size="sm"
              onClick={handleUpload}
              disabled={isUploading}
              className="
                w-full
                !rounded-md
                sm:w-auto
              "
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />

                  <span className="ml-1.5">Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="h-3.5 w-3.5" />

                  <span className="ml-1.5">Upload File</span>
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* ====================================================== */}
      {/* STATUS FOOTER                                         */}
      {/* ====================================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-3
        "
      >
        <div className="flex items-center gap-2">
          <span
            className={`
              h-1.5 w-1.5
              rounded-full

              ${
                isUploading
                  ? "animate-pulse bg-warning"
                  : selectedFile
                    ? "bg-secondary"
                    : "bg-success"
              }
            `}
          />

          <span
            className="
              font-mono
              text-[7px]
              uppercase
              tracking-[0.13em]
              text-muted-foreground/40
            "
          >
            {isUploading
              ? "Upload in progress"
              : selectedFile
                ? "File ready"
                : "Uploader ready"}
          </span>
        </div>

        <span
          className="
            font-mono
            text-[7px]
            uppercase
            tracking-[0.13em]
            text-muted-foreground/30
          "
        >
          Project files
        </span>
      </div>
    </div>
  );
}
