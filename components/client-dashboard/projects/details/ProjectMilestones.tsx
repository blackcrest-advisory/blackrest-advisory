"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { fadeInUp } from "@/utils/animations";
import { Milestone } from "@/types/dashboard/client/projectsType";
import { cn } from "@/lib/utils";

interface ProjectMilestonesProps {
  milestones: Milestone[];
}

//===== Icon + color mapping per milestone status =====//
const statusConfig = {
  completed: { icon: CheckCircle2, className: "text-green-500" },
  "in-progress": { icon: Clock, className: "text-secondary" },
  pending: { icon: Circle, className: "text-[var(--color-body)]" },
};

export const ProjectMilestones = ({ milestones }: ProjectMilestonesProps) => {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-6 shadow-sm"
    >
      <h2 className="mb-4 text-base font-semibold text-[var(--color-heading)]">
        Milestones
      </h2>

      <div className="flex flex-col gap-4">
        {milestones.map((milestone) => {
          const { icon: Icon, className } = statusConfig[milestone.status];
          return (
            <div key={milestone.id} className="flex items-start gap-3">
              <Icon size={18} className={cn("mt-0.5 shrink-0", className)} />
              <div className="flex flex-1 flex-wrap items-center justify-between gap-1">
                <p
                  className={cn(
                    "text-sm font-medium text-[var(--color-heading)]",
                    milestone.status === "completed" &&
                      "line-through opacity-60",
                  )}
                >
                  {milestone.title}
                </p>
                <span className="text-xs text-[var(--color-body)]">
                  {milestone.dueDate.toLocaleDateString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
