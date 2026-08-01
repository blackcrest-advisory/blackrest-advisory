"use client";

import { motion } from "framer-motion";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { fadeInUp, hoverScale } from "@/lib/utils/animations";
import type { TeamMember } from "@/types/dashboard/admin/overviewType";

interface TeamWorkloadProps {
  members: TeamMember[];
}

export const TeamWorkload = ({ members }: TeamWorkloadProps) => {
  return (
    //===== Team Workload Card =====//
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      {...hoverScale}
    >
      <Card padding="base" hoverEffect className="rounded-xl">
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          Team Workload
        </h3>
        <ul className="space-y-4">
          {members.map((member) => (
            <li key={member.id} className="flex items-center gap-3">
              <Avatar name={member.name} src={member.avatarUrl} size="sm" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">
                    {member.name}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {member.activeTasks} tasks
                  </span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-muted">
                  <div
                    className="h-1.5 rounded-full bg-secondary"
                    style={{ width: `${member.capacity}%` }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </motion.div>
  );
};
