import { cn } from "@/lib/utils/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

//==============================================================//
// STATUS STYLES
//==============================================================//

const statusStyles: Record<string, string> = {
  //===== project statuses =====//
  active: "border-secondary/25 bg-secondary/[0.08] text-secondary",

  completed: "border-success/25 bg-success/[0.08] text-success",

  "on-hold": "border-warning/25 bg-warning/[0.08] text-warning",

  planning: "border-info/25 bg-info/[0.08] text-info",

  "in-review":
    "border-purple-500/25 bg-purple-500/[0.08] text-purple-600 dark:text-purple-400",

  //===== brief statuses - exact =====//
  SUBMITTED: "border-info/25 bg-info/[0.08] text-info",

  REVIEWING: "border-warning/25 bg-warning/[0.08] text-warning",

  APPROVED: "border-success/25 bg-success/[0.08] text-success",

  IN_PROGRESS:
    "border-purple-500/25 bg-purple-500/[0.08] text-purple-600 dark:text-purple-400",

  REJECTED: "border-destructive/25 bg-destructive/[0.08] text-destructive",

  //===== brief statuses - lowercase =====//
  submitted: "border-info/25 bg-info/[0.08] text-info",

  reviewing: "border-warning/25 bg-warning/[0.08] text-warning",

  approved: "border-success/25 bg-success/[0.08] text-success",

  in_progress:
    "border-purple-500/25 bg-purple-500/[0.08] text-purple-600 dark:text-purple-400",

  rejected: "border-destructive/25 bg-destructive/[0.08] text-destructive",

  //===== invoice statuses =====//
  draft: "border-border bg-muted/30 text-muted-foreground",

  sent: "border-info/25 bg-info/[0.08] text-info",

  paid: "border-success/25 bg-success/[0.08] text-success",

  overdue: "border-destructive/25 bg-destructive/[0.08] text-destructive",

  cancelled: "border-border bg-muted/25 text-muted-foreground",

  //===== alternative spellings =====//
  under_review: "border-warning/25 bg-warning/[0.08] text-warning",

  assigned:
    "border-purple-500/25 bg-purple-500/[0.08] text-purple-600 dark:text-purple-400",

  closed: "border-border bg-muted/30 text-body",
};

//==============================================================//
// STATUS LABELS
//==============================================================//

const statusLabels: Record<string, string> = {
  //===== projects =====//
  active: "Active",
  completed: "Completed",
  "on-hold": "On Hold",
  planning: "Planning",
  "in-review": "In Review",

  //===== briefs =====//
  SUBMITTED: "Submitted",
  REVIEWING: "Reviewing",
  APPROVED: "Approved",
  IN_PROGRESS: "In Progress",
  REJECTED: "Rejected",

  submitted: "Submitted",
  reviewing: "Reviewing",
  approved: "Approved",
  in_progress: "In Progress",
  rejected: "Rejected",

  //===== invoices =====//
  draft: "Draft",
  sent: "Sent",
  paid: "Paid",
  overdue: "Overdue",
  cancelled: "Cancelled",

  //===== alternatives =====//
  under_review: "Under Review",
  assigned: "Assigned",
  closed: "Closed",
};

//==============================================================//
// STATUS BADGE
//==============================================================//

export const StatusBadge = ({ status, className = "" }: StatusBadgeProps) => {
  //===== resolve keys =====//
  const normalizedStatus = statusStyles[status] ? status : status.toLowerCase();

  const normalizedLabel = statusLabels[status] ? status : status.toLowerCase();

  return (
    <span
      className={cn(
        `
          inline-flex
          w-fit
          items-center
          gap-1.5
          whitespace-nowrap
          rounded-md
          border
          px-2.5
          py-1
          font-mono
          text-[8px]
          font-semibold
          uppercase
          tracking-[0.1em]
        `,
        statusStyles[normalizedStatus] ??
          "border-border bg-muted/20 text-muted-foreground",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="
          h-1.5
          w-1.5
          shrink-0
          rounded-full
          bg-current
          opacity-70
        "
      />

      {statusLabels[normalizedLabel] ?? status}
    </span>
  );
};
