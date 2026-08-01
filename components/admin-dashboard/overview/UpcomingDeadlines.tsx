"use client";

import { motion } from "framer-motion";
import {
  CalendarClock,
  FolderOpen,
  CheckSquare,
  Receipt,
  LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { fadeInUp, hoverScale } from "@/lib/utils/animations";
import type {
  DeadlineItem,
  DeadlineType,
} from "@/types/dashboard/admin/overviewType";

interface UpcomingDeadlinesProps {
  deadlines: DeadlineItem[];
}

//===== Map deadline type to icon =====//
const typeIcon: Record<DeadlineType, LucideIcon> = {
  project: FolderOpen,
  task: CheckSquare,
  invoice: Receipt,
};

export const UpcomingDeadlines = ({ deadlines }: UpcomingDeadlinesProps) => {
  return (
    //===== Upcoming Deadlines Card =====//
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      {...hoverScale}
    >
      <Card padding="base" hoverEffect className="rounded-xl">
        <div className="mb-4 flex items-center gap-2">
          <CalendarClock className="h-5 w-5 text-secondary" />
          <h3 className="text-lg font-semibold text-foreground">
            Upcoming Deadlines
          </h3>
        </div>
        <ul className="space-y-4">
          {deadlines.map((item) => {
            const Icon = typeIcon[item.type];
            return (
              <li key={item.id} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/10">
                  <Icon className="h-4 w-4 text-secondary" />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.clientName} · Due {item.dueDate}
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
