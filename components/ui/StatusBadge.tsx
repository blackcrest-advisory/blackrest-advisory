import { ProjectStatus } from "@/types/dashboard/client/projectsType";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

//===== Map each status to a color style using theme tokens =====//
const statusStyles: Record<ProjectStatus, string> = {
  active: "bg-secondary/15 text-secondary border-secondary/30",
  completed: "bg-green-500/15 text-green-600 border-green-500/30",
  "on-hold": "bg-yellow-500/15 text-yellow-600 border-yellow-500/30",
  planning: "bg-blue-500/15 text-blue-600 border-blue-500/30",
  "in-review": "bg-purple-500/15 text-purple-600 border-purple-500/30",
};

const statusLabels: Record<ProjectStatus, string> = {
  active: "Active",
  completed: "Completed",
  "on-hold": "On Hold",
  planning: "Planning",
  "in-review": "In Review",
};

export const StatusBadge = ({ status, className = "" }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        statusStyles[status],
        className,
      )}
    >
      {statusLabels[status]}
    </span>
  );
};
