"use client";

import { motion } from "framer-motion";
import { ActivityItem } from "@/components/client-dashboard/overview/ActivityItem";
import { Card } from "@/components/ui/Card";
import { Activity } from "@/types/dashboard/client/overviewType";
import { fadeInUp, hoverScale } from "@/utils/animations";

interface RecentActivityProps {
  activities: Activity[];
}

export const RecentActivity = ({ activities }: RecentActivityProps) => {
  return (
    //===== Recent Activity Card =====//
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      {...hoverScale}
    >
      <Card padding="base" hoverEffect className="rounded-xl">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Recent Activity
        </h2>
        <ul className="divide-y divide-border">
          {activities.map((item, idx) => (
            <ActivityItem key={idx} activity={item} />
          ))}
        </ul>
      </Card>
    </motion.div>
  );
};
