"use client";

import {
  CalendarClock,
  FolderOpen,
  CheckSquare,
  Receipt,
  LucideIcon,
} from "lucide-react";
import {
  DeadlineItem,
  DeadlineType,
} from "@/types/dashboard/admin/overviewType";

interface UpcomingDeadlinesProps {
  deadlines: DeadlineItem[];
}

const typeIcon: Record<DeadlineType, LucideIcon> = {
  project: FolderOpen,
  task: CheckSquare,
  invoice: Receipt,
};

export const UpcomingDeadlines = ({ deadlines }: UpcomingDeadlinesProps) => {
  return (
    <div className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-5">
      <div className="mb-4 flex items-center gap-2">
        <CalendarClock className="h-5 w-5 text-[var(--color-secondary)]" />
        <h3 className="text-lg font-semibold text-[var(--color-heading)]">
          Upcoming Deadlines
        </h3>
      </div>
      <ul className="space-y-4">
        {deadlines.map((item) => {
          const Icon = typeIcon[item.type];
          return (
            <li key={item.id} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-secondary)]/10">
                <Icon className="h-4 w-4 text-[var(--color-secondary)]" />
              </span>
              <div>
                <p className="text-sm font-medium text-[var(--color-heading)]">
                  {item.title}
                </p>
                <p className="text-xs text-[var(--color-body)]">
                  {item.clientName} · Due {item.dueDate}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
