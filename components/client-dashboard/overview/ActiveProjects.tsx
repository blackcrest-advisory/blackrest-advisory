"use client";

import { motion } from "framer-motion";
import { Project } from "@/types/dashboard/client/overviewType";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProjectItem } from "@/components/client-dashboard/overview/ProjectItem";
import { fadeInUp, hoverScale } from "@/lib/utils/animations";

interface ActiveProjectsProps {
  projects: Project[];
}

export const ActiveProjects = ({ projects }: ActiveProjectsProps) => {
  const showFirstFourProjects = projects.slice(0, 4);
  return (
    //===== Active Projects Card =====//
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      {...hoverScale}
    >
      <Card padding="base" className="rounded-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Active Projects
          </h2>
          <Button
            variant="ghost"
            size="sm"
            disabled={projects.length === 0}
            className="text-sm"
          >
            View All →
          </Button>
        </div>
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
            <p className="text-sm text-muted-foreground">
              No active projects at the moment.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {showFirstFourProjects.map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>
        )}
      </Card>
    </motion.div>
  );
};
