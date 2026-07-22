import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { FilesTableRow } from "@/components/client-dashboard/files/FilesTableRow";
import { FilesMobileCard } from "@/components/client-dashboard/files/FilesMobileCard";
import { Card } from "@/components/ui/Card";
import { ProjectFile } from "@/types/dashboard/client/filesType";

interface FilesTableProps {
  files: ProjectFile[];
}

const tableColumns = [
  "File",
  "Project",
  "Type",
  "Size",
  "Uploaded By",
  "Uploaded At",
  "Actions",
];

export const FilesTable = ({ files }: FilesTableProps) => {
  return (
    <>
      {/* Desktop / tablet table view */}
      <Card padding="none" className="hidden overflow-hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {tableColumns.map((column) => (
                <TableHead key={column}>{column}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <FilesTableRow key={file.id} file={file} />
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Mobile card list — table markup doesn't survive narrow viewports well */}
      <div className="flex flex-col gap-3 md:hidden">
        {files.map((file) => (
          <FilesMobileCard key={file.id} file={file} />
        ))}
      </div>
    </>
  );
};
