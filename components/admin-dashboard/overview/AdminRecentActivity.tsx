"use client";

import {
  UserPlus,
  FolderOpen,
  Receipt,
  MessageSquare,
  CheckSquare,
  Users,
  LucideIcon,
} from "lucide-react";
import {
  AdminActivity,
  AdminActivityType,
} from "@/types/dashboard/admin/overviewType";

interface AdminRecentActivityProps {
  activities: AdminActivity[];
}

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
    <div className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-5">
      <h3 className="mb-4 text-lg font-semibold text-[var(--color-heading)]">
        Recent Activity
      </h3>
      <ul className="space-y-4">
        {activities.map((activity) => {
          const Icon = activityIcon[activity.type];
          return (
            <li key={activity.id} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-muted)]">
                <Icon className="h-4 w-4 text-[var(--color-secondary)]" />
              </span>
              <div>
                <p className="text-sm font-medium text-[var(--color-heading)]">
                  {activity.title}
                </p>
                <p className="text-xs text-[var(--color-body)]">
                  {activity.description}
                </p>
                <p className="mt-0.5 text-[11px] text-[var(--color-body)]/70">
                  {activity.timestamp}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
