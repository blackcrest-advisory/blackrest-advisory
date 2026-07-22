// components/dashboard/RecentActivity/RecentActivity.tsx
"use client";

import { ActivityItem } from "@/components/client-dashboard/overview/ActivityItem";
import { Activity } from "@/types/dashboard/client/overviewType";

interface RecentActivityProps {
  activities: Activity[];
}

export const RecentActivity = ({ activities }: RecentActivityProps) => {
  return (
    <div className="bg-[var(--color-card-bg)] border border-[var(--color-card-border)] rounded-xl p-4 md:p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-[var(--color-heading)] mb-4">
        🔔 Recent Activity
      </h2>
      <ul className="divide-y divide-[var(--color-border)]">
        {activities.map((item, idx) => (
          <ActivityItem key={idx} activity={item} />
        ))}
      </ul>
    </div>
  );
};
