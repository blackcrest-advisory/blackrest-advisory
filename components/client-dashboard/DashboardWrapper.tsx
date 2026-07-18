"use client";

import { ActiveProjects } from "@/components/client-dashboard/ActiveProjects";
import { FooterStats } from "@/components/client-dashboard/FooterStats";
import { PerformanceChart } from "@/components/client-dashboard/PerformanceChart";
import { QuickActions } from "@/components/client-dashboard/QuickActions";
import { RecentActivity } from "@/components/client-dashboard/RecentActivity";
import { StatsSection } from "@/components/client-dashboard/StatsSection";
import { SupportSection } from "@/components/client-dashboard/SupportSection";
import { UpcomingMilestones } from "@/components/client-dashboard/UpcomingMilestones";
import {
  Stats,
  Project,
  Milestone,
  Activity,
} from "@/types/dashboard/DemoType";

interface DashboardWrapperProps {
  stats: Stats;
  projects: Project[];
  milestones: Milestone[];
  activities: Activity[];
  clientName: string;
  companyName: string;
}

export const DashboardWrapper = ({
  stats,
  projects,
  milestones,
  activities,
  companyName,
}: DashboardWrapperProps) => {
  return (
    <div className="space-y-8 bg-[var(--color-background)] text-[var(--color-foreground)] min-h-screen">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-heading)]">
            Welcome back,{" "}
            <span className="text-[var(--color-secondary)]">{companyName}</span>{" "}
            👋
          </h1>
          <p className="text-[var(--color-body)] mt-1">
            Here’s what’s happening with your digital growth journey.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Active Account
          </span>
        </div>
      </div>

      {/* Stats */}
      <StatsSection stats={stats} />

      {/* Performance Chart */}
      <PerformanceChart />

      {/* Active Projects + Upcoming Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActiveProjects projects={projects} />
        </div>
        <UpcomingMilestones milestones={milestones} />
      </div>

      {/* Quick Actions + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <QuickActions />
        <div className="lg:col-span-2">
          <RecentActivity activities={activities} />
        </div>
      </div>

      {/* Support */}
      <SupportSection />

      {/* Footer Stats */}
      <FooterStats />
    </div>
  );
};
