"use client";

import { motion } from "framer-motion";
import { ActiveProjects } from "@/components/client-dashboard/overview/ActiveProjects";
import { FooterStats } from "@/components/client-dashboard/overview/FooterStats";
import { PerformanceChart } from "@/components/client-dashboard/overview/PerformanceChart";
import { QuickActions } from "@/components/client-dashboard/overview/QuickActions";
import { RecentActivity } from "@/components/client-dashboard/overview/RecentActivity";
import { StatsSection } from "@/components/client-dashboard/overview/StatsSection";
import { SupportSection } from "@/components/client-dashboard/overview/SupportSection";
import { UpcomingMilestones } from "@/components/client-dashboard/overview/UpcomingMilestones";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { useCurrentUser } from "@/app/providers/CurrentUserProvider";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";
import type {
  Stats,
  Project,
  Milestone,
  Activity,
} from "@/types/dashboard/client/overviewType";

interface DashboardWrapperProps {
  stats: Stats;
  projects: Project[];
  milestones: Milestone[];
  activities: Activity[];
}

export const DashboardWrapper = ({
  stats,
  projects,
  milestones,
  activities,
}: DashboardWrapperProps) => {
  const user = useCurrentUser();

  return (
    <PageWrapper>
      {/*===== Welcome Section =====*/}
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                Welcome back,{" "}
                <span className="text-secondary">{user?.name ?? "Client"}</span>
              </h1>
              <p className="mt-1 text-muted-foreground">
                Here’s what’s happening with your digital growth journey.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />
                Active Account
              </span>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/*===== Stats =====*/}
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <StatsSection stats={stats} />
          </motion.div>
        </Container>
      </Section>

      {/*===== Performance Chart =====*/}
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <PerformanceChart />
        </Container>
      </Section>

      {/*===== Active Projects + Upcoming Milestones =====*/}
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ActiveProjects projects={projects} />
            </div>
            <UpcomingMilestones milestones={milestones} />
          </div>
        </Container>
      </Section>

      {/*===== Quick Actions + Recent Activity =====*/}
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <QuickActions />
            <div className="lg:col-span-2">
              <RecentActivity activities={activities} />
            </div>
          </div>
        </Container>
      </Section>

      {/*===== Support =====*/}
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <SupportSection />
        </Container>
      </Section>

      {/*===== Footer Stats =====*/}
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <FooterStats />
        </Container>
      </Section>
    </PageWrapper>
  );
};
