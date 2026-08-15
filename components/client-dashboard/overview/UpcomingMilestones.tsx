"use client";

import { motion } from "framer-motion";
import { Milestone } from "@/types/dashboard/client/overviewType";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MilestoneItem } from "./MilestoneItem";
import { fadeInUp, hoverScale } from "@/lib/utils/animations";

interface UpcomingMilestonesProps {
  milestones: Milestone[];
}

export const UpcomingMilestones = ({ milestones }: UpcomingMilestonesProps) => {
  return (
    //===== Upcoming Milestones Card =====//
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      {...hoverScale}
    >
      <Card padding="base" className="rounded-xl">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Upcoming Milestones
        </h2>
        <ul className="space-y-3">
          {milestones.map((item, idx) => (
            <MilestoneItem key={idx} milestone={item} index={idx} />
          ))}
        </ul>
        <div className="mt-4 border-t border-border pt-4">
          <Button variant="outline" size="sm" className="w-full">
            View All Milestones
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};
