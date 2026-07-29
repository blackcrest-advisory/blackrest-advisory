"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { fadeInUp } from "@/utils/animations";
import type { ActivityLog } from "@/types/dashboard/client/projectsType";

interface ProjectActivityLogProps {
  activity: ActivityLog[];
}

export const ProjectActivityLog = ({ activity }: ProjectActivityLogProps) => {
  return (
    //===== Project Activity Log Card =====//
    <motion.div variants={fadeInUp} initial="hidden" animate="visible">
      <Card padding="base" hoverEffect>
        <h2 className="mb-4 text-base font-semibold text-foreground">
          Recent Activity
        </h2>

        <div className="flex flex-col gap-5">
          {activity.map((log) => (
            <div key={log.id} className="relative pl-4">
              {/*===== Timeline dot =====*/}
              <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-secondary" />
              <p className="text-sm text-foreground">{log.action}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {log.performedBy} &middot; {log.timestamp.toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};
