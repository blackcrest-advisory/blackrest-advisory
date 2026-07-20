"use client";

import { ArrowLeft, Pencil } from "lucide-react";
import { motion } from "framer-motion";
import { Project } from "@/types/dashboard/client/projectsType";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { Button } from "@/components/ui/Button";
import { fadeInUp } from "@/utils/animations";

interface ProjectDetailsHeaderProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetailsHeader = ({
  project,
  onBack,
}: ProjectDetailsHeaderProps) => {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-6 md:flex-row md:items-start md:justify-between"
    >
      <div className="flex flex-col gap-3">
        {/* Back navigation */}
        <button
          onClick={onBack}
          className="flex w-fit items-center gap-1.5 text-sm text-[var(--color-body)] transition-colors hover:text-secondary cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold text-[var(--color-heading)] md:text-3xl">
            {project.name}
          </h1>
          <StatusBadge status={project.status} />
          <PriorityBadge priority={project.priority} />
        </div>

        <p className="text-sm text-[var(--color-body)]">
          {project.clientCompany} &middot; {project.industry} &middot;{" "}
          {project.serviceType}
        </p>
      </div>

      <Button variant="outline" size="md" className="shrink-0">
        <Pencil size={16} />
        Edit Project
      </Button>
    </motion.div>
  );
};
