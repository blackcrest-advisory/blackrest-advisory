"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CircleDot, Plus, ClipboardCheck } from "lucide-react";

import { AdminActiveProjects } from "./AdminActiveProjects";
import { AdminQuickActions } from "./AdminQuickActions";
import { AdminRecentActivity } from "./AdminRecentActivity";
import { AdminStatsSection } from "./AdminStatsSection";
import { RevenueChart } from "./RevenueChart";
import { UpcomingDeadlines } from "./UpcomingDeadlines";

import { Button } from "@/components/ui/Button";
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
    <div className="relative">
      {/*===== PAGE HEADER =====*/}

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
      >
        {/*===== AMBIENT BACKGROUND =====*/}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-secondary/[0.09] blur-[90px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden opacity-[0.08] lg:block"
          style={{
            backgroundImage: `
        linear-gradient(
          to right,
          var(--color-border) 1px,
          transparent 1px
        )
      `,
            backgroundSize: "20% 100%",
          }}
        />

        {/* top gold signal */}
        <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/45 to-transparent"/>

        {/*===== MAIN CONTENT =====*/}

        <div className="relative z-10 grid gap-6 p-6 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-center xl:p-8">
          {/* LEFT */}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <motion.span
                    className="absolute inset-0 rounded-full bg-success"
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                    }}
                  />

                  <span className="relative h-2 w-2 rounded-full bg-success"/>
                </span>

                <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-success">
                  Operations online
                </span>
              </div>

              <span className="h-px w-8 bg-border" />

              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground/45">
                Admin / Overview
              </span>
            </div>

            <h1 className="mt-5 max-w-3xl text-3xl font-semibold leading-[1.06] tracking-[-0.045em] text-heading sm:text-4xl xl:text-[2.7rem]">
              Good to see you,
              <span className="ml-2 text-secondary">{adminName}</span>
              <span className="text-muted-foreground">.</span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Here&apos;s the current state of Blackcrest — revenue, client
              delivery, active opportunities, and anything that requires your
              attention.
            </p>

            {/* operational labels */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <div className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-secondary" />

                <span className="text-xs text-muted-foreground">
                  Commercial performance
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-secondary" />

                <span className="text-xs text-muted-foreground">
                  Delivery oversight
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-secondary" />

                <span className="text-xs text-muted-foreground">
                  Pipeline management
                </span>
              </div>
            </div>
          </div>

          {/*===== RIGHT COMMAND PANEL =====*/}

          <div className="w-full border-t border-border pt-5 lg:w-[310px] lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/45">
                  Quick command
                </p>

                <p className="mt-1 text-sm font-semibold text-heading">
                  What needs doing next?
                </p>
              </div>

              <span className="font-mono text-[8px] text-secondary">
                BCR / ADM
              </span>
            </div>

            <div className="mt-5 space-y-2">
              <Button
                href="/admin/dashboard/leads/new"
                variant="primary"
                size="sm"
                className="group w-full justify-between"
              >
                <span className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Lead
                </span>

                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/>
              </Button>

              <Button
                href="/admin/dashboard/project-requests"
                variant="outline"
                size="sm"
                className="group w-full justify-between"
              >
                <span className="flex items-center">
                  <ClipboardCheck className="mr-2 h-4 w-4" />
                  Review Requests
                </span>

                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-secondary"/>
              </Button>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />

                <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/45">
                  Workspace healthy
                </span>
              </div>

              <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/30">
                Live
              </span>
            </div>
          </div>
        </div>

        {/*===== BOTTOM SYSTEM STRIP =====*/}

        <div className="relative z-10 grid border-t border-border bg-muted/20 sm:grid-cols-3">
          {[
            {
              label: "Workspace",
              value: "Operational",
            },
            {
              label: "Focus",
              value: "Growth & Delivery",
            },
            {
              label: "Mode",
              value: "Admin Control",
            },
          ].map((item, index) => (
            <div
              key={item.label}
              className={`
          flex items-center
          justify-between
          gap-3
          px-5 py-3.5

          ${index > 0 ? "border-t border-border sm:border-l sm:border-t-0" : ""}
        `}
            >
              <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-muted-foreground/40">
                {item.label}
              </span>

              <span className="text-[11px] font-medium text-foreground">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/*===== DASHBOARD CONTENT =====*/}

      <div className="mt-6 space-y-6">
        {/* stats */}
        <section>
          <AdminStatsSection stats={stats} />
        </section>

        {/* revenue */}
        <section>
          <RevenueChart revenue={revenue} />
        </section>

        {/* projects / deadlines */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.35fr)]">
          <AdminActiveProjects projects={projects} />

          <UpcomingDeadlines deadlines={deadlines} />
        </section>

        {/* quick actions / activity */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(280px,0.38fr)_minmax(0,1.62fr)]">
          <AdminQuickActions />

          <AdminRecentActivity activities={activities} />
        </section>
      </div>
    </div>
  );
};
