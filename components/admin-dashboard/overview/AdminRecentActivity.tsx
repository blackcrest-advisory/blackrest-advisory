"use client";

import { motion } from "framer-motion";
import {
  UserPlus,
  FolderOpen,
  Receipt,
  MessageSquare,
  CheckSquare,
  Users,
  LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { fadeInUp, hoverScale } from "@/utils/animations";
import type {
  AdminActivity,
  AdminActivityType,
} from "@/types/dashboard/admin/overviewType";

interface AdminRecentActivityProps {
  activities: AdminActivity[];
}

//===== Map activity type to icon =====//
const activityIcon: Record<AdminActivityType, LucideIcon> = {
  lead: UserPlus,
  project: FolderOpen,
  invoice: Receipt,
  message: MessageSquare,
  task: CheckSquare,
  client: Users,
};

export const AdminRecentActivity = ({
  activities,
}: AdminRecentActivityProps) => {
  return (
    //===== Recent Activity Card =====//
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      {...hoverScale}
    >
      <Card padding="base" hoverEffect className="rounded-xl">
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          Recent Activity
        </h3>
        <ul className="space-y-4">
          {activities.map((activity) => {
            const Icon = activityIcon[activity.type];
            return (
              <li key={activity.id} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Icon className="h-4 w-4 text-secondary" />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {activity.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.description}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground/70">
                    {activity.timestamp}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Card>
    </motion.div>
  );
};
