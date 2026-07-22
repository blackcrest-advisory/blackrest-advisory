import { Download, Eye } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { FileTypeIcon } from "@/components/client-dashboard/files/FileTypeIcon";
import { FileCategoryBadge } from "@/components/client-dashboard/files/FileCategoryBadge";
import { ProjectFile } from "@/types/dashboard/client/filesType";
import { formatFileDate, formatFileSize } from "@/utils/format";

interface FilesMobileCardProps {
  file: ProjectFile;
}

export const FilesMobileCard = ({ file }: FilesMobileCardProps) => {
  return (
    <Card padding="sm">
      <div className="flex items-start gap-3">
        <FileTypeIcon category={file.category} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-heading">{file.name}</p>
          <p className="mt-0.5 text-xs text-body">{file.projectName}</p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <FileCategoryBadge category={file.category} />
            <span className="text-xs text-body">
              {formatFileSize(file.sizeInBytes)}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="text-xs text-body">
              <p>{file.uploadedBy}</p>
              <p>{formatFileDate(file.uploadedAt)}</p>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label={`Preview ${file.name}`}
                className="rounded-md p-2 text-body transition-colors hover:bg-muted hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary/40"
              >
                <Eye className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label={`Download ${file.name}`}
                className="rounded-md p-2 text-body transition-colors hover:bg-muted hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary/40"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
