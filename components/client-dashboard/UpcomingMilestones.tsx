// components/dashboard/UpcomingMilestones/UpcomingMilestones.tsx
"use client";

import { Milestone } from "@/types/dashboard/DemoType";
import { MilestoneItem } from "./MilestoneItem";
import { Button } from "@/components/ui/Button";

interface UpcomingMilestonesProps {
  milestones: Milestone[];
}

export const UpcomingMilestones = ({ milestones }: UpcomingMilestonesProps) => {
  return (
    <div className="bg-[var(--color-card-bg)] border border-[var(--color-card-border)] rounded-xl p-4 md:p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-[var(--color-heading)] mb-4">
        🎯 Upcoming Milestones
      </h2>
      <ul className="space-y-3">
        {milestones.map((item, idx) => (
          <MilestoneItem key={idx} milestone={item} index={idx} />
        ))}
      </ul>
      <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
        <Button variant="outline" size="sm" className="w-full">
          View All Milestones
        </Button>
      </div>
    </div>
  );
};
