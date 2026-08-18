import { cn } from "@/lib/utils/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

//===== Map status → theme‑aware style classes =====//
const statusStyles: Record<string, string> = {
  // ---- Project statuses ----
  active: "bg-secondary/15 text-secondary border-secondary/30",
  completed: "border-success/30 bg-success/15 text-success",
  "on-hold": "border-warning/30 bg-warning/15 text-warning",
  planning: "border-info/30 bg-info/15 text-info",
  "in-review": "bg-purple-500/15 text-purple-600 border-purple-500/30",

  // ---- Brief statuses (exact match) ----
  SUBMITTED: "border-info/30 bg-info/15 text-info",
  REVIEWING: "border-warning/30 bg-warning/15 text-warning",
  APPROVED: "border-success/30 bg-success/15 text-success",
  IN_PROGRESS: "bg-purple-500/15 text-purple-600 border-purple-500/30",
  REJECTED: "border-destructive/30 bg-destructive/15 text-destructive",

  // ---- Brief statuses (lowercase) ----
  submitted: "border-info/30 bg-info/15 text-info",
  reviewing: "border-warning/30 bg-warning/15 text-warning",
  approved: "border-success/30 bg-success/15 text-success",
  in_progress: "bg-purple-500/15 text-purple-600 border-purple-500/30",
  rejected: "border-destructive/30 bg-destructive/15 text-destructive",

  // ---- Alternative spellings ----
  under_review: "border-warning/30 bg-warning/15 text-warning",
  assigned: "bg-purple-500/15 text-purple-600 border-purple-500/30",
  closed: "border-border bg-muted text-body",
};

//===== Human‑readable labels =====//
const statusLabels: Record<string, string> = {
  active: "Active",
  completed: "Completed",
  "on-hold": "On Hold",
  planning: "Planning",
  "in-review": "In Review",

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

  under_review: "Under Review",
  assigned: "Assigned",
  closed: "Closed",
};

export const StatusBadge = ({ status, className = "" }: StatusBadgeProps) => {
  // Use exact match if available, otherwise fallback to lowercase
  const styleKey = statusStyles[status] ? status : status.toLowerCase();
  const labelKey = statusLabels[status] ? status : status.toLowerCase();

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
        statusStyles[styleKey] ?? "bg-muted/15 text-foreground border-muted/30",
        className,
      )}
    >
      {statusLabels[labelKey] ?? status}
    </span>
  );
};
