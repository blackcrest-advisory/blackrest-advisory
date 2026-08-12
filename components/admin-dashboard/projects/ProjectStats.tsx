"use client";

//===== imports =====//
import { Folder, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface ProjectStatsProps {
  total: number;
  active: number;
  completed: number;
  onHold: number;
}

export function ProjectStats({
  total,
  active,
  completed,
  onHold,
}: ProjectStatsProps) {
  const stats = [
    {
      label: "Total Projects",
      value: total,
      icon: Folder,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950/20",
    },
    {
      label: "Active",
      value: active,
      icon: Clock,
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-950/20",
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-950/20",
    },
    {
      label: "On Hold",
      value: onHold,
      icon: AlertCircle,
      color: "text-yellow-600",
      bg: "bg-yellow-50 dark:bg-yellow-950/20",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="p-5">
            <div className="flex items-center gap-4">
              <div className={`rounded-full p-2.5 ${stat.bg}`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
