"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, File, Image, FileText, Archive } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  getUploadUrl,
  saveFileMetadata,
} from "@/lib/actions/projects/file.action";
import { supabaseAnon } from "@/lib/supabase/client";
import toast from "react-hot-toast";

interface FileUploaderProps {
  projectId: string;
  onUploadComplete?: () => void;
}

export function FileUploader({
  projectId,
  onUploadComplete,
}: FileUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      // 1. Get signed upload URL
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

      // 2. Upload to Supabase using the signed URL
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

      // 3. Get public URL (using supabaseAnon)
      const { data: publicUrlData } = supabaseAnon.storage
        .from("projects")
        .getPublicUrl(filePath);

      const downloadUrl = publicUrlData.publicUrl;

      // 4. Determine category
      const extension = selectedFile.name.split(".").pop()?.toLowerCase() || "";
      let category = "other";
      if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension))
        category = "image";
      else if (["pdf", "doc", "docx", "txt", "md"].includes(extension))
        category = "document";
      else if (["zip", "rar", "7z", "tar", "gz"].includes(extension))
        category = "archive";

      // 5. Save metadata
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

  const clearSelected = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          disabled={isUploading}
          className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-secondary file:text-white file:cursor-pointer hover:file:bg-secondary/90"
        />
        {selectedFile && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearSelected}
            disabled={isUploading}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {selectedFile && (
        <div className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
          <div className="flex items-center gap-3">
            {getFileIcon(selectedFile)}
            <div>
              <p className="text-sm font-medium text-foreground">
                {selectedFile.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={handleUpload}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-1 h-4 w-4" />
                Upload
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
