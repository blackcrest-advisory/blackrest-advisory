//===== imports =====//
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

import { FilesTableRow } from "@/components/client-dashboard/files/FilesTableRow";
import { FilesMobileCard } from "@/components/client-dashboard/files/FilesMobileCard";

import type { ProjectFile } from "@/types/dashboard/client/filesType";

//===== props =====//
interface FilesTableProps {
  files: ProjectFile[];
}

//==============================================================//
// TABLE COLUMNS
//==============================================================//

const tableColumns = [
  "File",
  "Project",
  "Type",
  "Size",
  "Uploaded By",
  "Uploaded At",
  "Actions",
];

//==============================================================//
// FILES TABLE
//==============================================================//

export const FilesTable = ({ files }: FilesTableProps) => {
  return (
    <>
      {/* ====================================================== */}
      {/* DESKTOP / TABLET REGISTER                             */}
      {/* ====================================================== */}

      <div
        className="
          hidden
          min-w-0
          max-w-full
          overflow-x-auto
          md:block
        "
      >
        <Table className="min-w-[860px]">
          <TableHeader>
            <TableRow
              className="
                border-b border-border
                bg-muted/15
                hover:bg-muted/15
              "
            >
              {tableColumns.map((column) => (
                <TableHead
                  key={column}
                  className="
                      h-11
                      whitespace-nowrap
                      px-4
                      font-mono
                      text-[7px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-muted-foreground/45
                      first:pl-6
                      last:pr-6
                      last:text-right
                    "
                >
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {files.map((file) => (
              <FilesTableRow key={file.id} file={file} />
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ====================================================== */}
      {/* MOBILE DOCUMENT RECORDS                              */}
      {/* ====================================================== */}

      <div
        className="
          divide-y divide-border
          md:hidden
        "
      >
        {files.map((file) => (
          <div
            key={file.id}
            className="
              px-4 py-4
              sm:px-5
            "
          >
            <FilesMobileCard file={file} />
          </div>
        ))}
      </div>
    </>
  );
};
