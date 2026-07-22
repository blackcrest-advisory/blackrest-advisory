import { InvoiceStatus } from "@/types/dashboard/client/invoiceTypes";
import { cn } from "@/lib/utils";

interface InvoiceStatusBadgeProps {
  status: InvoiceStatus;
  className?: string;
}

//===== Color mapping consistent with the existing StatusBadge pattern =====//
const statusStyles: Record<InvoiceStatus, string> = {
  paid: "bg-green-500/15 text-green-600 border-green-500/30",
  pending: "bg-yellow-500/15 text-yellow-600 border-yellow-500/30",
  overdue: "bg-red-500/15 text-red-600 border-red-500/30",
  draft: "bg-gray-500/15 text-gray-600 border-gray-500/30",
  cancelled: "bg-purple-500/15 text-purple-600 border-purple-500/30",
};

const statusLabels: Record<InvoiceStatus, string> = {
  paid: "Paid",
  pending: "Pending",
  overdue: "Overdue",
  draft: "Draft",
  cancelled: "Cancelled",
};

export const InvoiceStatusBadge = ({
  status,
  className = "",
}: InvoiceStatusBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium capitalize",
        statusStyles[status],
        className,
      )}
    >
      {statusLabels[status]}
    </span>
  );
};
