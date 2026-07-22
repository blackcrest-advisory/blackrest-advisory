"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import { Project } from "@/types/dashboard/client/projectsType";

interface ProjectTimelineCardProps {
  timeline: Project["timeline"];
  progress: number;
}

export const ProjectTimelineCard = ({
  timeline,
  progress,
}: ProjectTimelineCardProps) => {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-6 shadow-sm"
    >
      <h2 className="mb-4 text-base font-semibold text-[var(--color-heading)]">
        Timeline
      </h2>

      <div className="flex items-center justify-between text-xs text-[var(--color-body)]">
        <span>{timeline.start.toLocaleDateString()}</span>
        <span>{timeline.end.toLocaleDateString()}</span>
      </div>

      {/* Progress track */}
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[var(--color-muted)]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full bg-secondary"
        />
      </div>

      <p className="mt-2 text-right text-xs font-medium text-[var(--color-body)]">
        {progress}% complete
      </p>
    </motion.div>
  );
};
