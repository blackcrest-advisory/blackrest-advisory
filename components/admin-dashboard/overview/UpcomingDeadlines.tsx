"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  CalendarClock,
  CheckSquare,
  FolderOpen,
  Receipt,
  Clock3,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils/utils";
import { fadeInUp } from "@/lib/utils/animations";

import type {
  DeadlineItem,
  DeadlineType,
} from "@/types/dashboard/admin/overviewType";

interface UpcomingDeadlinesProps {
  deadlines: DeadlineItem[];
}

//===== Map deadline type to icon =====//
const typeIcon: Record<DeadlineType, LucideIcon> = {
  project: FolderOpen,
  task: CheckSquare,
  invoice: Receipt,
};

export const UpcomingDeadlines = ({ deadlines }: UpcomingDeadlinesProps) => {
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
      className="
        relative
        h-full
        overflow-hidden
        border border-border
        bg-card
        shadow-[var(--shadow-card)]
      "
    >
      {/* ====================================================== */}
      {/* TOP ACCENT                                             */}
      {/* ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute left-0 top-0
          h-[2px] w-full
          bg-gradient-to-r
          from-secondary
          via-secondary/35
          to-transparent
        "
      />

      {/* ====================================================== */}
      {/* HEADER                                                 */}
      {/* ====================================================== */}

      <div
        className="
          relative
          border-b border-border
          px-5 py-5
          sm:px-6
        "
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <CalendarClock className="h-3.5 w-3.5 text-secondary" />

              <span
                className="
                  font-mono
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-secondary
                "
              >
                Schedule watch
              </span>

              <span className="h-px w-7 bg-secondary/30" />
            </div>

            <h3
              className="
                mt-2
                text-lg
                font-semibold
                tracking-[-0.025em]
                text-heading
                sm:text-xl
              "
            >
              Upcoming Deadlines
            </h3>

            <p
              className="
                mt-1
                text-xs
                leading-5
                text-muted-foreground
              "
            >
              Important delivery, task, and invoice dates.
            </p>
          </div>

          <div
            className="
              flex h-10 w-10
              shrink-0
              items-center justify-center
              border border-secondary/15
              bg-secondary/[0.05]
              text-secondary
            "
          >
            <Clock3 className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* ====================================================== */}
      {/* DEADLINE LIST                                          */}
      {/* ====================================================== */}

      {deadlines.length > 0 ? (
        <div className="divide-y divide-border">
          {deadlines.map((item, index) => {
            const Icon = typeIcon[item.type];

            return (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  x: reduceMotion ? 0 : 8,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.3,
                  delay: reduceMotion ? 0 : index * 0.05,
                }}
                className="
                  group
                  relative
                  px-5 py-4
                  transition-colors
                  duration-200
                  hover:bg-secondary/[0.025]
                  sm:px-6
                "
              >
                <div className="flex items-start gap-3">
                  {/* index */}
                  <div
                    className="
                      mt-0.5
                      flex h-8 w-8
                      shrink-0
                      items-center justify-center
                      border border-border
                      bg-background
                      font-mono
                      text-[8px]
                      font-semibold
                      text-muted-foreground/40
                      transition-all
                      duration-200
                      group-hover:border-secondary/20
                      group-hover:text-secondary
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p
                          className="
                            truncate
                            text-sm
                            font-semibold
                            text-heading
                          "
                        >
                          {item.title}
                        </p>

                        <p
                          className="
                            mt-1
                            truncate
                            text-xs
                            text-muted-foreground
                          "
                        >
                          {item.clientName}
                        </p>
                      </div>

                      <div
                        className="
                          flex h-8 w-8
                          shrink-0
                          items-center justify-center
                          border border-secondary/10
                          bg-secondary/[0.045]
                          text-secondary
                          transition-all
                          duration-200
                          group-hover:border-secondary/25
                          group-hover:bg-secondary
                          group-hover:text-secondary-foreground
                        "
                      >
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                      </div>
                    </div>

                    {/* metadata */}
                    <div
                      className="
                        mt-3
                        flex items-center
                        justify-between
                        gap-3
                      "
                    >
                      <span
                        className="
                          font-mono
                          text-[7px]
                          font-semibold
                          uppercase
                          tracking-[0.15em]
                          text-muted-foreground/40
                        "
                      >
                        {item.type}
                      </span>

                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-warning" />

                        <span
                          className="
                            text-[11px]
                            font-medium
                            text-foreground
                          "
                        >
                          Due {item.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* hover signal */}
                <div
                  className="
                    absolute
                    bottom-0 left-0
                    h-px w-0
                    bg-secondary
                    transition-all
                    duration-300
                    group-hover:w-full
                  "
                />
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* ==================================================== */
        /* EMPTY STATE                                          */
        /* ==================================================== */

        <div
          className="
            flex min-h-[260px]
            flex-col
            items-center
            justify-center
            px-6 py-10
            text-center
          "
        >
          <div
            className="
              flex h-11 w-11
              items-center justify-center
              border border-secondary/15
              bg-secondary/[0.05]
              text-secondary
            "
          >
            <CalendarClock className="h-5 w-5" />
          </div>

          <p
            className="
              mt-4
              text-sm
              font-semibold
              text-heading
            "
          >
            No upcoming deadlines
          </p>

          <p
            className="
              mt-1
              max-w-[220px]
              text-xs
              leading-5
              text-muted-foreground
            "
          >
            Project, task, and invoice deadlines will appear here.
          </p>
        </div>
      )}

      {/* ====================================================== */}
      {/* FOOTER                                                 */}
      {/* ====================================================== */}

      {deadlines.length > 0 && (
        <div
          className="
            flex items-center
            justify-between
            border-t border-border
            bg-muted/20
            px-5 py-3.5
            sm:px-6
          "
        >
          <span
            className="
              font-mono
              text-[7px]
              uppercase
              tracking-[0.16em]
              text-muted-foreground/40
            "
          >
            Deadline queue
          </span>

          <span
            className={cn(
              `
                text-xs
                font-medium
              `,
              deadlines.length > 0 ? "text-warning" : "text-success",
            )}
          >
            {deadlines.length} upcoming
          </span>
        </div>
      )}
    </motion.section>
  );
};
