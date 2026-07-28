"use client";

import { motion } from "framer-motion";
import { AdminStatsSection } from "./AdminStatsSection";
import { RevenueChart } from "./RevenueChart";
import { AdminActiveProjects } from "./AdminActiveProjects";
import { UpcomingDeadlines } from "./UpcomingDeadlines";
import { AdminQuickActions } from "./AdminQuickActions";
import { AdminRecentActivity } from "./AdminRecentActivity";
import { TeamWorkload } from "./TeamWorkload";
import { AdminFooterStats } from "./AdminFooterStats";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { fadeInUp, hoverScale } from "@/utils/animations";
import type {
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
    <PageWrapper>
      {/*===== Welcome Section =====*/}
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back,{" "}
                <span className="text-secondary">{adminName}</span>
              </h1>
              <p className="mt-1 text-muted-foreground text-base">
                Here is what is happening across all clients and projects today.
              </p>
            </div>
            <motion.span
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2, duration: 0.5 }}
              {...hoverScale}
              className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />
              All Systems Operational
            </motion.span>
          </motion.div>
        </Container>
      </Section>

      {/*===== Stats =====*/}
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <AdminStatsSection stats={stats} />
        </Container>
      </Section>

      {/*===== Revenue Chart =====*/}
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <RevenueChart />
        </Container>
      </Section>

      {/*===== Active Projects + Upcoming Deadlines =====*/}
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <AdminActiveProjects projects={projects} />
            </div>
            <UpcomingDeadlines deadlines={deadlines} />
          </div>
        </Container>
      </Section>

      {/*===== Quick Actions + Recent Activity =====*/}
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <AdminQuickActions />
            <div className="lg:col-span-2">
              <AdminRecentActivity activities={activities} />
            </div>
          </div>
        </Container>
      </Section>

      {/*===== Team Workload =====*/}
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <TeamWorkload members={teamMembers} />
        </Container>
      </Section>

      {/*===== Footer Stats =====*/}
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <AdminFooterStats stats={footerStats} />
        </Container>
      </Section>
    </PageWrapper>
  );
};
