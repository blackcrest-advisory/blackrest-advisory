import { cn } from "@/lib/utils/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

//===== Map status → theme‑aware style classes =====//
const statusStyles: Record<string, string> = {
  // ---- Project statuses ----
  active: "bg-secondary/15 text-secondary border-secondary/30",
  completed: "bg-green-500/15 text-green-600 border-green-500/30",
  "on-hold": "bg-yellow-500/15 text-yellow-600 border-yellow-500/30",
  planning: "bg-blue-500/15 text-blue-600 border-blue-500/30",
  "in-review": "bg-purple-500/15 text-purple-600 border-purple-500/30",

  // ---- Brief statuses (exact match) ----
  SUBMITTED: "bg-blue-500/15 text-blue-600 border-blue-500/30",
  REVIEWING: "bg-yellow-500/15 text-yellow-600 border-yellow-500/30",
  APPROVED: "bg-green-500/15 text-green-600 border-green-500/30",
  IN_PROGRESS: "bg-purple-500/15 text-purple-600 border-purple-500/30",
  REJECTED: "bg-red-500/15 text-red-600 border-red-500/30",

  // ---- Brief statuses (lowercase) ----
  submitted: "bg-blue-500/15 text-blue-600 border-blue-500/30",
  reviewing: "bg-yellow-500/15 text-yellow-600 border-yellow-500/30",
  approved: "bg-green-500/15 text-green-600 border-green-500/30",
  in_progress: "bg-purple-500/15 text-purple-600 border-purple-500/30",
  rejected: "bg-red-500/15 text-red-600 border-red-500/30",

  // ---- Alternative spellings ----
  under_review: "bg-yellow-500/15 text-yellow-600 border-yellow-500/30",
  assigned: "bg-purple-500/15 text-purple-600 border-purple-500/30",
  closed: "bg-slate-500/15 text-slate-700 border-slate-500/30",
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
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        statusStyles[styleKey] ?? "bg-muted/15 text-foreground border-muted/30",
        className,
      )}
    >
      {statusLabels[labelKey] ?? status}
    </span>
  );
};
