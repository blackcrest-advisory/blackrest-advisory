"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import { ActivityLog } from "@/types/dashboard/client/projectsType";

interface ProjectActivityLogProps {
  activity: ActivityLog[];
}

export const ProjectActivityLog = ({ activity }: ProjectActivityLogProps) => {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-6 shadow-sm"
    >
      <h2 className="mb-4 text-base font-semibold text-[var(--color-heading)]">
        Recent Activity
      </h2>

      <div className="flex flex-col gap-5">
        {activity.map((log) => (
          <div key={log.id} className="relative pl-4">
            {/* Timeline dot */}
            <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-secondary" />
            <p className="text-sm text-[var(--color-heading)]">{log.action}</p>
            <p className="mt-0.5 text-xs text-[var(--color-body)]">
              {log.performedBy} &middot; {log.timestamp.toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
