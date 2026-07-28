"use client";

import { motion } from "framer-motion";
import { Project } from "@/types/dashboard/client/overviewType";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProjectItem } from "@/components/client-dashboard/overview/ProjectItem";
import { fadeInUp, hoverScale } from "@/utils/animations";

interface ActiveProjectsProps {
  projects: Project[];
}

export const ActiveProjects = ({ projects }: ActiveProjectsProps) => {
  return (
    //===== Active Projects Card =====//
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      {...hoverScale}
    >
      <Card padding="base" hoverEffect className="rounded-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Active Projects
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
      </Card>
    </motion.div>
  );
};
