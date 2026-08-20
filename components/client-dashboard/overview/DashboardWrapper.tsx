"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CircleDot, Sparkles } from "lucide-react";

import { ActiveProjects } from "@/components/client-dashboard/overview/ActiveProjects";
import { FooterStats } from "@/components/client-dashboard/overview/FooterStats";
import { PerformanceChart } from "@/components/client-dashboard/overview/PerformanceChart";
import { QuickActions } from "@/components/client-dashboard/overview/QuickActions";
import { RecentActivity } from "@/components/client-dashboard/overview/RecentActivity";
import { StatsSection } from "@/components/client-dashboard/overview/StatsSection";
import { SupportSection } from "@/components/client-dashboard/overview/SupportSection";
import { UpcomingMilestones } from "@/components/client-dashboard/overview/UpcomingMilestones";

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
    <div className="relative">
      {/*===== CLIENT WELCOME EXPERIENCE =====*/}

      <motion.section
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
      >
        {/* ambient gold light */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-36 h-[360px] w-[360px] rounded-full bg-secondary/[0.10] blur-[110px]"
        />

        {/* secondary soft glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 left-[20%] h-[280px] w-[280px] rounded-full bg-primary/[0.07] blur-[110px]"
        />

        {/* architectural grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden opacity-[0.08] lg:block"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                var(--color-border) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                var(--color-border) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "110px 110px",
            maskImage:
              "linear-gradient(to right, transparent, black 40%, black)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 40%, black)",
          }}
        />

        {/* gold line */}
        <div
          className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/40 to-transparent"
        />

        <div
          className="relative z-10 grid gap-8 px-5 py-7 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-stretch lg:px-8 lg:py-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:px-9"
        >
          {/*===== LEFT =====*/}

          <div className="flex flex-col justify-between">
            <div>
              {/* meta */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <motion.span
                      className="absolute inset-0 rounded-full bg-success"
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2.6,
                        repeat: Infinity,
                      }}
                    />

                    <span
                      className="relative h-2 w-2 rounded-full bg-success"
                    />
                  </span>

                  <span
                    className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-success"
                  >
                    Account active
                  </span>
                </div>

                <span className="h-px w-8 bg-border" />

                <span
                  className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground/45"
                >
                  Client Workspace
                </span>
              </div>

              {/* heading */}
              <h1
                className="mt-5 max-w-3xl text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-heading sm:text-4xl xl:text-[2.8rem]"
              >
                Welcome back,
                <span className="ml-2 text-secondary">
                  {user?.name ?? "Client"}
                </span>
                <span className="text-muted-foreground">.</span>
              </h1>

              <p
                className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base"
              >
                Your Blackcrest workspace brings together current projects,
                upcoming milestones, performance insights, and everything moving
                your business forward.
              </p>
            </div>

            {/* contextual signals */}
            <div
              className="mt-7 grid gap-3 sm:grid-cols-3"
            >
              {[
                "Project visibility",
                "Performance tracking",
                "Direct support access",
              ].map((label) => (
                <div
                  key={label}
                  className="flex items-center gap-2 border-t border-border pt-3"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary" />

                  <span
                    className="text-xs font-medium text-muted-foreground"
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/*===== RIGHT — CLIENT PORTAL PANEL =====*/}

          <div
            className="relative overflow-hidden border border-secondary/15 bg-secondary/[0.035] p-5 sm:p-6"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-secondary/[0.12] blur-3xl"
            />

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-secondary" />

                    <span
                      className="font-mono text-[8px] font-semibold uppercase tracking-[0.17em] text-secondary"
                    >
                      Your workspace
                    </span>
                  </div>

                  <p
                    className="mt-2 text-lg font-semibold tracking-[-0.025em] text-heading"
                  >
                    Everything in one place
                  </p>
                </div>

                <span
                  className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground/35"
                >
                  BCR / CLIENT
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  {
                    label: "Projects",
                    value: `${projects.length} visible`,
                  },
                  {
                    label: "Milestones",
                    value: `${milestones.length} upcoming`,
                  },
                  {
                    label: "Activity",
                    value: `${activities.length} recent`,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-b-0 last:pb-0"
                  >
                    <span
                      className="font-mono text-[7px] uppercase tracking-[0.16em] text-muted-foreground/45"
                    >
                      {item.label}
                    </span>

                    <span
                      className="text-xs font-medium text-foreground"
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="mt-6 flex items-center justify-between border-t border-border pt-4"
              >
                <div className="flex items-center gap-2">
                  <CircleDot className="h-3 w-3 text-success" />

                  <span
                    className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/45"
                  >
                    Workspace synced
                  </span>
                </div>

                <ArrowUpRight className="h-4 w-4 text-secondary" />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/*===== CLIENT DASHBOARD CONTENT =====*/}

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mt-6 space-y-6"
      >
        {/* stats */}
        <section>
          <StatsSection stats={stats} />
        </section>

        {/* performance */}
        <section>
          <PerformanceChart />
        </section>

        {/* projects + milestones */}
        <section
          className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.4fr)]"
        >
          <ActiveProjects projects={projects} />

          <UpcomingMilestones milestones={milestones} />
        </section>

        {/* actions + activity */}
        <section
          className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(280px,0.38fr)_minmax(0,1.62fr)]"
        >
          <QuickActions />

          <RecentActivity activities={activities} />
        </section>

        {/* support */}
        <section>
          <SupportSection />
        </section>

        {/* footer metrics */}
        <section>
          <FooterStats />
        </section>
      </motion.div>
    </div>
  );
};
