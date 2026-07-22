"use client";

import { Avatar } from "@/components/ui/Avatar";
import { TeamMember } from "@/types/dashboard/admin/overviewType";

interface TeamWorkloadProps {
  members: TeamMember[];
}

export const TeamWorkload = ({ members }: TeamWorkloadProps) => {
  return (
    <div className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-5">
      <h3 className="mb-4 text-lg font-semibold text-[var(--color-heading)]">
        Team Workload
      </h3>
      <ul className="space-y-4">
        {members.map((member) => (
          <li key={member.id} className="flex items-center gap-3">
            <Avatar name={member.name} src={member.avatarUrl} size="sm" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-[var(--color-heading)]">
                  {member.name}
                </p>
                <span className="text-xs text-[var(--color-body)]">
                  {member.activeTasks} tasks
                </span>
              </div>
              <div className="mt-1 h-1.5 w-full rounded-full bg-[var(--color-muted)]">
                <div
                  className="h-1.5 rounded-full bg-[var(--color-secondary)]"
                  style={{ width: `${member.capacity}%` }}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
