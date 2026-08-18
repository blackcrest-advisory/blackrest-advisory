import { ProjectPriority } from "@/types/dashboard/client/projectsType";
import { cn } from "@/lib/utils/utils";

interface PriorityBadgeProps {
  priority: ProjectPriority;
  className?: string;
}

const priorityStyles: Record<ProjectPriority, string> = {
  low: "border-border bg-muted/70 text-body",
  medium: "bg-blue-500/15 text-blue-600 border-blue-500/30",
  high: "bg-orange-500/15 text-orange-600 border-orange-500/30",
  critical: "bg-red-500/15 text-red-600 border-red-500/30",
};

export const PriorityBadge = ({
  priority,
  className = "",
}: PriorityBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize",
        priorityStyles[priority],
        className,
      )}
    >
      {priority}
    </span>
  );
};
