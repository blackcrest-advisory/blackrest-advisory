import { Download, Eye } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/Table";
import { FileTypeIcon } from "@/components/client-dashboard/files/FileTypeIcon";
import { FileCategoryBadge } from "@/components/client-dashboard/files/FileCategoryBadge";
import { ProjectFile } from "@/types/dashboard/client/filesType";
import { formatFileDate, formatFileSize } from "@/lib/utils/format";

interface FilesTableRowProps {
  file: ProjectFile;
}

export const FilesTableRow = ({ file }: FilesTableRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <FileTypeIcon category={file.category} />
          <span
            className="max-w-[220px] truncate font-medium text-heading"
            title={file.name}
          >
            {file.name}
          </span>
        </div>
      </TableCell>

      <TableCell>
        <span className="text-body">{file.projectName}</span>
      </TableCell>

      <TableCell>
        <FileCategoryBadge category={file.category} />
      </TableCell>

      <TableCell>
        <span className="text-body">{formatFileSize(file.sizeInBytes)}</span>
      </TableCell>

      <TableCell>
        <span className="text-body">{file.uploadedBy}</span>
      </TableCell>

      <TableCell>
        <span className="text-body">{formatFileDate(file.uploadedAt)}</span>
      </TableCell>

      <TableCell>
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
      </TableCell>
    </TableRow>
  );
};
