"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { fadeInUp } from "@/lib/utils/animations";
import type { Project } from "@/types/dashboard/client/projectsType";

interface ProjectTimelineCardProps {
  timeline: Project["timeline"];
  progress: number;
}

export const ProjectTimelineCard = ({
  timeline,
  progress,
}: ProjectTimelineCardProps) => {
  return (
    //===== Project Timeline Card =====//
    <motion.div variants={fadeInUp} initial="hidden" animate="visible">
      <Card padding="base" hoverEffect>
        <h2 className="mb-4 text-base font-semibold text-foreground">
          Timeline
        </h2>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{timeline.start.toLocaleDateString()}</span>
          <span>{timeline.end.toLocaleDateString()}</span>
        </div>

        {/*===== Progress track =====*/}
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full rounded-full bg-secondary"
          />
        </div>

        <p className="mt-2 text-right text-xs font-medium text-muted-foreground">
          {progress}% complete
        </p>
      </Card>
    </motion.div>
  );
};
