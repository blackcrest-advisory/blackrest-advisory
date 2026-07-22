"use client";

import { AdminStatsSection } from "./AdminStatsSection";
import { RevenueChart } from "./RevenueChart";
import { AdminActiveProjects } from "./AdminActiveProjects";
import { UpcomingDeadlines } from "./UpcomingDeadlines";
import { AdminQuickActions } from "./AdminQuickActions";
import { AdminRecentActivity } from "./AdminRecentActivity";
import { TeamWorkload } from "./TeamWorkload";
import { AdminFooterStats } from "./AdminFooterStats";
import {
  AdminStats,
  AdminProject,
  DeadlineItem,
  AdminActivity,
  TeamMember,
  FooterStat,
} from "@/types/dashboard/admin/overviewType";

interface AdminDashboardWrapperProps {
  adminName: string;
  stats: AdminStats;
  projects: AdminProject[];
  deadlines: DeadlineItem[];
  activities: AdminActivity[];
  teamMembers: TeamMember[];
  footerStats: FooterStat[];
}

export const AdminDashboardWrapper = ({
  adminName,
  stats,
  projects,
  deadlines,
  activities,
  teamMembers,
  footerStats,
}: AdminDashboardWrapperProps) => {
  return (
    <div className="min-h-screen space-y-8 bg-[var(--color-background)] text-[var(--color-foreground)]">
      {/* Welcome Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-heading)] md:text-3xl">
            Welcome back,{" "}
            <span className="text-[var(--color-secondary)]">{adminName}</span>
          </h1>
          <p className="mt-1 text-[var(--color-body)]">
            Here is what is happening across all clients and projects today.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
          All Systems Operational
        </span>
      </div>

      {/* Stats */}
      <AdminStatsSection stats={stats} />

      {/* Revenue Chart */}
      <RevenueChart />

      {/* Active Projects + Upcoming Deadlines */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AdminActiveProjects projects={projects} />
        </div>
        <UpcomingDeadlines deadlines={deadlines} />
      </div>

      {/* Quick Actions + Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <AdminQuickActions />
        <div className="lg:col-span-2">
          <AdminRecentActivity activities={activities} />
        </div>
      </div>

      {/* Team Workload */}
      <TeamWorkload members={teamMembers} />

      {/* Footer Stats */}
      <AdminFooterStats stats={footerStats} />
    </div>
  );
};
