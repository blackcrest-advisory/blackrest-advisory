"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { Card } from "@/components/ui/Card";
import { fadeInUp } from "@/lib/utils/animations";
import type { Milestone } from "@/types/dashboard/client/projectsType";

interface ProjectMilestonesProps {
  milestones: Milestone[];
}

//===== Icon + colour mapping per milestone status =====//
const statusConfig = {
  completed: {
    icon: CheckCircle2,
    className: "text-green-500 dark:text-green-400",
  },
  "in-progress": { icon: Clock, className: "text-secondary" },
  pending: { icon: Circle, className: "text-muted-foreground" },
};

export const ProjectMilestones = ({ milestones }: ProjectMilestonesProps) => {
  return (
    //===== Project Milestones Card =====//
    <motion.div variants={fadeInUp} initial="hidden" animate="visible">
      <Card padding="base" hoverEffect>
        <h2 className="mb-4 text-base font-semibold text-foreground">
          Milestones
        </h2>

        <div className="flex flex-col gap-4">
          {milestones.map((milestone) => {
            const { icon: Icon, className } = statusConfig[milestone.status];
            const isCompleted = milestone.status === "completed";

            return (
              <div key={milestone.id} className="flex items-start gap-3">
                <Icon size={18} className={cn("mt-0.5 shrink-0", className)} />
                <div className="flex flex-1 flex-wrap items-center justify-between gap-1">
                  <p
                    className={cn(
                      "text-sm font-medium text-foreground",
                      isCompleted && "line-through opacity-60",
                    )}
                  >
                    {milestone.title}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {milestone.dueDate.toLocaleDateString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
};
