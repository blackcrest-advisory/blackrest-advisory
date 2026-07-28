import { cn } from "@/lib/utils";
import type { ProjectHealth } from "@/types/dashboard/admin/projectsType";

const styles: Record<ProjectHealth, string> = {
  "on-track": "border-emerald-500/30 bg-emerald-500/10 text-emerald-600",
  "at-risk": "border-secondary/30 bg-secondary/10 text-secondary",
  overdue: "border-red-500/30 bg-red-500/10 text-red-600",
};

export const ProjectHealthBadge = ({ health }: { health: ProjectHealth }) => (
  <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-medium", styles[health])}>
    {health.replace("-", " ")}
  </span>
);
