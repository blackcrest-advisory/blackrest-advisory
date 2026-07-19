// components/dashboard/ActiveProjects/ActiveProjects.tsx
"use client";

import { Project } from "@/types/dashboard/DemoType";
import { Button } from "@/components/ui/Button";
import { ProjectItem } from "@/components/client-dashboard/main/ProjectItem";

interface ActiveProjectsProps {
  projects: Project[];
}

export const ActiveProjects = ({ projects }: ActiveProjectsProps) => {
  return (
    <div className="bg-[var(--color-card-bg)] border border-[var(--color-card-border)] rounded-xl p-4 md:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[var(--color-heading)]">
          📋 Active Projects
        </h2>
        <Button variant="ghost" size="sm">
          View All →
        </Button>
      </div>
      <div className="space-y-4">
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};
