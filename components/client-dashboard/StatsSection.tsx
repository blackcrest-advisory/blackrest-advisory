// components/dashboard/StatsSection/StatsSection.tsx
"use client";

import {
  FiBriefcase,
  FiUsers,
  FiTrendingUp,
  FiDollarSign,
} from "react-icons/fi";
import { StatCard } from "./StatCard";
import { Stats } from "@/types/dashboard/DemoType";

interface StatsSectionProps {
  stats: Stats;
}

export const StatsSection = ({ stats }: StatsSectionProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={<FiBriefcase className="w-5 h-5" />}
        label="Active Projects"
        value={String(stats.activeProjects)}
        change="+1 this month"
        color="var(--color-secondary)"
      />
      <StatCard
        icon={<FiUsers className="w-5 h-5" />}
        label="Leads Generated (YTD)"
        value={String(stats.leadsGenerated)}
        change={stats.change.leads}
        color="var(--color-gold)"
      />
      <StatCard
        icon={<FiTrendingUp className="w-5 h-5" />}
        label="Conversion Rate"
        value={`${stats.conversionRate}%`}
        change={stats.change.conversion}
        color="#10B981"
      />
      <StatCard
        icon={<FiDollarSign className="w-5 h-5" />}
        label="Revenue Impact"
        value={`€${(stats.revenueImpact / 1000).toFixed(0)}K`}
        change={stats.change.revenue}
        color="#3B82F6"
      />
    </div>
  );
};
