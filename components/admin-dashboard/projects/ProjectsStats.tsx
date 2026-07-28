import {
  AlertTriangle,
  CircleDollarSign,
  FolderKanban,
  Timer,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { AdminProject } from "@/types/dashboard/admin/projectsType";

export const ProjectsStats = ({ projects }: { projects: AdminProject[] }) => {
  const active = projects.filter(
    (project) => project.status === "active",
  ).length;
  const attention = projects.filter(
    (project) => project.health !== "on-track",
  ).length;
  const totalBudget = projects.reduce(
    (total, project) => total + project.budget,
    0,
  );
  const averageProgress = Math.round(
    projects.reduce((total, project) => total + project.progress, 0) /
      projects.length,
  );
  const stats = [
    {
      label: "Active projects",
      value: active,
      detail: `${projects.length} total engagements`,
      icon: FolderKanban,
    },
    {
      label: "Needs attention",
      value: attention,
      detail: "At risk or overdue",
      icon: AlertTriangle,
    },
    {
      label: "Portfolio budget",
      value: `€${totalBudget.toLocaleString()}`,
      detail: "Across all projects",
      icon: CircleDollarSign,
    },
    {
      label: "Average progress",
      value: `${averageProgress}%`,
      detail: "Across all projects",
      icon: Timer,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} padding="base">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-body">{stat.label}</p>
              <p className="mt-2 text-2xl font-semibold text-heading">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-body">{stat.detail}</p>
            </div>
            <div className="rounded-lg bg-secondary/10 p-2.5 text-secondary">
              <stat.icon className="h-5 w-5" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
