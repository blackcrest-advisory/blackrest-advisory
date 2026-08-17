"use client";

import { motion } from "framer-motion";
import { AdminActiveProjects } from "./AdminActiveProjects";
import { AdminQuickActions } from "./AdminQuickActions";
import { AdminRecentActivity } from "./AdminRecentActivity";
import { AdminStatsSection } from "./AdminStatsSection";
import { RevenueChart } from "./RevenueChart";
import { UpcomingDeadlines } from "./UpcomingDeadlines";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { fadeInUp } from "@/lib/utils/animations";
import type {
  AdminActivity,
  AdminProject,
  AdminStats,
  DeadlineItem,
  RevenuePoint,
} from "@/types/dashboard/admin/overviewType";

interface AdminDashboardWrapperProps {
  adminName: string;
  stats: AdminStats;
  revenue: RevenuePoint[];
  projects: AdminProject[];
  deadlines: DeadlineItem[];
  activities: AdminActivity[];
}

export const AdminDashboardWrapper = ({
  adminName,
  stats,
  revenue,
  projects,
  deadlines,
  activities,
}: AdminDashboardWrapperProps) => {
  return (
    <PageWrapper>
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
                Welcome back, <span className="text-secondary">{adminName}</span>
              </h1>
              <p className="mt-1 text-base text-muted-foreground">
                Monitor revenue, client work, and the items that need attention.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button href="/admin/dashboard/leads/new" variant="primary" size="sm">
                Add Lead
              </Button>
              <Button href="/admin/dashboard/project-requests" variant="outline" size="sm">
                Review Requests
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section className="py-2 md:py-2 lg:py-2">
        <Container><AdminStatsSection stats={stats} /></Container>
      </Section>

      <Section className="py-2 md:py-2 lg:py-2">
        <Container><RevenueChart revenue={revenue} /></Container>
      </Section>

      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2"><AdminActiveProjects projects={projects} /></div>
            <UpcomingDeadlines deadlines={deadlines} />
          </div>
        </Container>
      </Section>

      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <AdminQuickActions />
            <div className="lg:col-span-2"><AdminRecentActivity activities={activities} /></div>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
};
