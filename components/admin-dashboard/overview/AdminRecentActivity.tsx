"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  CheckSquare,
  FolderOpen,
  MessageSquare,
  Receipt,
  UserPlus,
  Users,
  Activity,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils/utils";
import { fadeInUp } from "@/lib/utils/animations";

import type {
  AdminActivity,
  AdminActivityType,
} from "@/types/dashboard/admin/overviewType";

interface AdminRecentActivityProps {
  activities: AdminActivity[];
}

//===== Map activity type to icon =====//
const activityIcon: Record<AdminActivityType, LucideIcon> = {
  lead: UserPlus,
  project: FolderOpen,
  invoice: Receipt,
  message: MessageSquare,
  task: CheckSquare,
  client: Users,
};

export const AdminRecentActivity = ({
  activities,
}: AdminRecentActivityProps) => {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative h-full overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
    >
      {/*===== TOP ACCENT =====*/}

      <div
        className="pointer-events-none absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/35 to-transparent"
      />

      {/*===== HEADER =====*/}

      <div
        className="flex flex-col gap-4 border-b border-border px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
      >
        <div>
          <div className="flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-secondary" />

            <span
              className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary"
            >
              Workspace feed
            </span>

            <span className="h-px w-8 bg-secondary/30" />
          </div>

          <div className="mt-2 flex items-baseline gap-3">
            <h3
              className="text-lg font-semibold tracking-[-0.025em] text-heading sm:text-xl"
            >
              Recent Activity
            </h3>

            <span
              className="font-mono text-[8px] uppercase tracking-[0.15em] text-muted-foreground/40"
            >
              {activities.length} events
            </span>
          </div>

          <p
            className="mt-1 text-xs leading-5 text-muted-foreground"
          >
            Latest operational updates across your workspace.
          </p>
        </div>

        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center border border-secondary/15 bg-secondary/[0.05] text-secondary"
        >
          <Activity className="h-4 w-4" />
        </div>
      </div>

      {/*===== ACTIVITY STREAM =====*/}

      {activities.length > 0 ? (
        <div className="relative">
          {/* timeline line */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-6 left-[37px] top-6 w-px bg-border sm:left-[41px]"
          />

          <div className="divide-y divide-border">
            {activities.map((activity, index) => {
              const Icon = activityIcon[activity.type];

              return (
                <motion.article
                  key={activity.id}
                  initial={{
                    opacity: 0,
                    y: reduceMotion ? 0 : 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.3,
                    delay: reduceMotion ? 0 : index * 0.045,
                  }}
                  className="group relative px-5 py-4 transition-colors duration-200 hover:bg-secondary/[0.025] sm:px-6"
                >
                  <div className="flex items-start gap-4">
                    {/* timeline icon */}
                    <div
                      className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-background text-secondary transition-all duration-200 group-hover:border-secondary/30 group-hover:bg-secondary group-hover:text-secondary-foreground"
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.8} />
                    </div>

                    {/* content */}
                    <div className="min-w-0 flex-1">
                      <div
                        className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"
                      >
                        <div className="min-w-0">
                          <p
                            className="truncate text-sm font-semibold text-heading"
                          >
                            {activity.title}
                          </p>

                          <p
                            className="mt-1 text-xs leading-5 text-muted-foreground"
                          >
                            {activity.description}
                          </p>
                        </div>

                        <span
                          className="shrink-0 font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground/45"
                        >
                          {activity.timestamp}
                        </span>
                      </div>

                      {/* bottom metadata */}
                      <div
                        className="mt-3 flex items-center gap-2"
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-secondary"
                        />

                        <span
                          className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/40"
                        >
                          {activity.type}
                        </span>

                        <span
                          className="font-mono text-[7px] text-muted-foreground/25"
                        >
                          /
                        </span>

                        <span
                          className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/35"
                        >
                          EVT-{String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      ) : (
        /* ==================================================== */
        /* EMPTY STATE                                          */
        /* ==================================================== */

        <div
          className="flex min-h-[280px] flex-col items-center justify-center px-6 py-10 text-center"
        >
          <div
            className="flex h-11 w-11 items-center justify-center border border-secondary/15 bg-secondary/[0.05] text-secondary"
          >
            <Activity className="h-5 w-5" />
          </div>

          <p
            className="mt-4 text-sm font-semibold text-heading"
          >
            No recent activity
          </p>

          <p
            className="mt-1 max-w-[240px] text-xs leading-5 text-muted-foreground"
          >
            New lead, project, invoice, message, task, and client events will
            appear here.
          </p>
        </div>
      )}

      {/*===== FOOTER =====*/}

      {activities.length > 0 && (
        <div
          className="flex items-center justify-between border-t border-border bg-muted/20 px-5 py-3.5 sm:px-6"
        >
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />

            <span
              className="font-mono text-[7px] uppercase tracking-[0.16em] text-muted-foreground/40"
            >
              Activity stream
            </span>
          </div>

          <span
            className="text-xs font-medium text-foreground"
          >
            {activities.length} recent
          </span>
        </div>
      )}
    </motion.section>
  );
};
