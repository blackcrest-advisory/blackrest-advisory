//===== imports =====//
import { Download, Eye } from "lucide-react";

import { TableCell, TableRow } from "@/components/ui/Table";

import { FileTypeIcon } from "@/components/client-dashboard/files/FileTypeIcon";
import { FileCategoryBadge } from "@/components/client-dashboard/files/FileCategoryBadge";

import type { ProjectFile } from "@/types/dashboard/client/filesType";

import { formatFileDate, formatFileSize } from "@/lib/utils/format";

//===== props =====//
interface FilesTableRowProps {
  file: ProjectFile;
}

//==============================================================//
// FILES TABLE ROW
//==============================================================//

export const FilesTableRow = ({ file }: FilesTableRowProps) => {
  return (
    <TableRow className="group border-b border-border transition-colors hover:bg-secondary/[0.018]">
      {/*===== FILE =====*/}

      <TableCell className="px-4 py-4 first:pl-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="shrink-0">
            <FileTypeIcon category={file.category} />
          </div>

          <div className="min-w-0">
            <span
              className="block max-w-[220px] truncate text-sm font-semibold text-heading"
              title={file.name}
            >
              {file.name}
            </span>

            <span className="mt-1 block font-mono text-[7px] uppercase tracking-[0.12em] text-muted-foreground/35">
              Project document
            </span>
          </div>
        </div>
      </TableCell>

      {/*===== PROJECT =====*/}

      <TableCell className="px-4 py-4">
        <span
          className="block max-w-[180px] truncate text-xs font-medium text-body"
          title={file.projectName}
        >
          {file.projectName}
        </span>
      </TableCell>

      {/*===== TYPE =====*/}

      <TableCell className="px-4 py-4">
        <FileCategoryBadge category={file.category} />
      </TableCell>

      {/*===== SIZE =====*/}

      <TableCell className="px-4 py-4">
        <span className="whitespace-nowrap font-mono text-[10px] font-medium text-muted-foreground">
          {formatFileSize(file.sizeInBytes)}
        </span>
      </TableCell>

      {/*===== UPLOADED BY =====*/}

      <TableCell className="px-4 py-4">
        <span
          className="block max-w-[150px] truncate text-xs text-body"
          title={file.uploadedBy}
        >
          {file.uploadedBy}
        </span>
      </TableCell>

      {/*===== UPLOADED AT =====*/}

      <TableCell className="px-4 py-4">
        <span className="whitespace-nowrap text-xs text-muted-foreground">
          {formatFileDate(file.uploadedAt)}
        </span>
      </TableCell>

      {/*===== ACTIONS =====*/}

      <TableCell className="px-4 py-4 pr-6">
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            aria-label={`Preview ${file.name}`}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-colors hover:border-secondary/15 hover:bg-secondary/[0.05] hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30"
          >
            <Eye className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            aria-label={`Download ${file.name}`}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-colors hover:border-secondary/15 hover:bg-secondary/[0.05] hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30"
          >
            <Download className="h-3.5 w-3.5" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};
