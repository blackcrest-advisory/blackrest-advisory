import { PaymentStatus } from "@/types/dashboard/client/paymentTypes";
import { cn } from "@/lib/utils/utils";

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
  className?: string;
}

//===== Color mapping that mirrors the existing StatusBadge pattern (using Tailwind color utilities) =====//
const statusStyles: Record<PaymentStatus, string> = {
  paid: "bg-green-500/15 text-green-600 border-green-500/30",
  pending: "bg-yellow-500/15 text-yellow-600 border-yellow-500/30",
  overdue: "bg-red-500/15 text-red-600 border-red-500/30",
  failed: "bg-red-500/15 text-red-600 border-red-500/30",
  refunded: "bg-purple-500/15 text-purple-600 border-purple-500/30",
};

const statusLabels: Record<PaymentStatus, string> = {
  paid: "Paid",
  pending: "Pending",
  overdue: "Overdue",
  failed: "Failed",
  refunded: "Refunded",
};

export const PaymentStatusBadge = ({
  status,
  className = "",
}: PaymentStatusBadgeProps) => {
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
