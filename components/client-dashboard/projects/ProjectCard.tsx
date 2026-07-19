"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, DollarSign, Clock } from "lucide-react";
import { Project } from "@/types/dashboard/client/projects";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

const statusColorMap: Record<string, string> = {
  active:
    "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  completed:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
  "on-hold":
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
  planning:
    "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800",
  "in-review":
    "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800",
};

const priorityColorMap: Record<string, string> = {
  low: "text-muted-foreground",
  medium: "text-amber-600 dark:text-amber-400",
  high: "text-orange-600 dark:text-orange-400",
  critical: "text-red-600 dark:text-red-400",
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export function ProjectCard({ project }: ProjectCardProps) {
  // Date.now() is impure, so it can't be called directly in the render body.
  // A lazy useState initializer is the sanctioned escape hatch: the function
  // passed to useState runs exactly once, on first render, so React treats
  // it as a one-time read rather than a per-render impure call. This avoids
  // both the "impure function during render" error and the "setState inside
  // an effect causes a cascading render" error that an effect-based fix
  // would introduce.
  const [now] = useState(() => Date.now());

  const daysUntilDue = Math.ceil(
    (project.dueDate.getTime() - now) / (1000 * 60 * 60 * 24),
  );

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-5 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {project.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {project.clientCompany}
          </p>
        </div>
        <span
          className={cn(
            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
            statusColorMap[project.status],
          )}
        >
          {project.status.charAt(0).toUpperCase() +
            project.status.slice(1).replace("-", " ")}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span className="rounded bg-muted px-2 py-0.5">{project.industry}</span>
        <span className="rounded bg-muted px-2 py-0.5">
          {project.serviceType}
        </span>
        <span className={cn("font-medium", priorityColorMap[project.priority])}>
          {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}{" "}
          Priority
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-foreground">
            {project.progress}%
          </span>
        </div>
        <div className="mt-1 h-1.5 w-full rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <DollarSign className="h-3.5 w-3.5" />
          <span>${project.budget.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span>{formatDate(project.dueDate)}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <div className="flex items-center -space-x-1.5">
          {project.assignedTeam.slice(0, 3).map((member) => (
            <div
              key={member.id}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground ring-2 ring-card"
              title={member.name}
            >
              {member.avatar}
            </div>
          ))}
          {project.assignedTeam.length > 3 && (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground ring-2 ring-card">
              +{project.assignedTeam.length - 3}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>
            {daysUntilDue > 0 ? `${daysUntilDue} days left` : "Overdue"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
