import {
  LeadStatus,
  leadStatusStyles,
  leadStatusLabels,
} from "@/types/dashboard/admin/leadTypes";

import { cn } from "@/lib/utils/utils";

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
        `
          inline-flex
          items-center
          gap-1.5
          border
          px-2.5 py-1
          text-[10px]
          font-semibold
          uppercase
          tracking-[0.08em]
        `,
        leadStatusStyles[status],
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70"
      />

      {leadStatusLabels[status]}
    </span>
  );
};
