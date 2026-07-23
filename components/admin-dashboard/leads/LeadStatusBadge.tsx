import {
  LeadStatus,
  leadStatusStyles,
  leadStatusLabels,
} from "@/types/dashboard/admin/leadTypes";
import { cn } from "@/lib/utils";

interface LeadStatusBadgeProps {
  status: LeadStatus;
  className?: string;
}

export const LeadStatusBadge = ({
  status,
  className = "",
}: LeadStatusBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        leadStatusStyles[status],
        className,
      )}
    >
      {leadStatusLabels[status]}
    </span>
  );
};
