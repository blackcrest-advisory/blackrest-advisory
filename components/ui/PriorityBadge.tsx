import { ProjectPriority } from "@/types/dashboard/client/projectsType";
import { cn } from "@/lib/utils/utils";

interface PriorityBadgeProps {
  priority: ProjectPriority;
  className?: string;
}

const priorityStyles: Record<ProjectPriority, string> = {
  low: "border-border bg-muted/70 text-body",
  medium: "border-info/30 bg-info/15 text-info",
  high: "border-warning/30 bg-warning/15 text-warning",
  critical: "border-destructive/30 bg-destructive/15 text-destructive",
};

export const PriorityBadge = ({
  priority,
  className = "",
}: PriorityBadgeProps) => {
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
        priorityStyles[priority],
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="
          h-1.5 w-1.5
          shrink-0
          rounded-full
          bg-current
          opacity-70
        "
      />

      {priority}
    </span>
  );
};
