"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Pencil } from "lucide-react";
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
    //===== Project Details Header =====//
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-start md:justify-between"
    >
      <div className="flex flex-col gap-3">
        {/*===== Back navigation =====*/}
        <button
          onClick={onBack}
          className="flex w-fit cursor-pointer items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-secondary"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </button>

        {/*===== Title and badges =====*/}
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold text-foreground md:text-3xl">
            {project.name}
          </h1>
          <StatusBadge status={project.status} />
          <PriorityBadge priority={project.priority} />
        </div>

        {/*===== Metadata =====*/}
        <p className="text-sm text-muted-foreground">
          {project.clientCompany} &middot; {project.industry} &middot;{" "}
          {project.serviceType}
        </p>
      </div>

      <Button variant="outline" size="base" className="shrink-0">
        <Pencil size={16} />
        Edit Project
      </Button>
    </motion.div>
  );
};
