// components/dashboard/ActiveProjects/ProjectItem.tsx
"use client";

import { motion } from "framer-motion";
import { Project } from "@/types/dashboard/DemoType";

interface ProjectItemProps {
  project: Project;
}

export const ProjectItem = ({ project }: ProjectItemProps) => {
  return (
    <div className="border-b border-[var(--color-border)] pb-4 last:border-0 last:pb-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <p className="font-medium text-[var(--color-heading)]">
            {project.name}
          </p>
          <p className="text-sm text-[var(--color-body)]">{project.service}</p>
        </div>
        <span className="text-sm text-[var(--color-body)]">
          {project.daysLeft} days left
        </span>
      </div>
      <div className="mt-2 flex items-center gap-3">
        <div className="flex-1 h-2 bg-[var(--color-muted)] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            transition={{ duration: 0.8 }}
            className="h-full rounded-full"
            style={{ backgroundColor: "var(--color-secondary)" }}
          />
        </div>
        <span className="text-sm font-medium text-[var(--color-heading)]">
          {project.progress}%
        </span>
      </div>
    </div>
  );
};
