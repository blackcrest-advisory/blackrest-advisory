"use client";

import { FooterStat } from "@/types/dashboard/admin/overviewType";

interface AdminFooterStatsProps {
  stats: FooterStat[];
}

export const AdminFooterStats = ({ stats }: AdminFooterStatsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-5 sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="text-xl font-bold text-[var(--color-heading)]">
            {stat.value}
          </p>
          <p className="mt-1 text-xs text-[var(--color-body)]">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};
