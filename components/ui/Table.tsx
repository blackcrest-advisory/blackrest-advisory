import {
  HTMLAttributes,
  ReactNode,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils/utils";

interface TableProps extends HTMLAttributes<HTMLTableElement> {
  children: ReactNode;
}

export const Table = ({ children, className = "", ...props }: TableProps) => (
  <div className="w-full overflow-x-auto">
    <table
      className={cn("w-full border-collapse text-left text-sm", className)}
      {...props}
    >
      {children}
    </table>
  </div>
);

export const TableHeader = ({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={cn("border-b border-border", className)} {...props}>
    {children}
  </thead>
);

export const TableBody = ({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className={cn("divide-y divide-border", className)} {...props}>
    {children}
  </tbody>
);

export const TableRow = ({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLTableRowElement>) => (
  <tr
    className={cn("transition-colors hover:bg-muted/50", className)}
    {...props}
  >
    {children}
  </tr>
);

export const TableHead = ({
  children,
  className = "",
  ...props
}: ThHTMLAttributes<HTMLTableCellElement>) => (
  <th
    scope="col"
    className={cn(
      "whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-body",
      className,
    )}
    {...props}
  >
    {children}
  </th>
);

export const TableCell = ({
  children,
  className = "",
  ...props
}: TdHTMLAttributes<HTMLTableCellElement>) => (
  <td
    className={cn("px-4 py-3 align-middle text-foreground", className)}
    {...props}
  >
    {children}
  </td>
);
