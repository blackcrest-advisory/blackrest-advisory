"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CalendarDays, Flag, Sparkles } from "lucide-react";

import { Milestone } from "@/types/dashboard/client/overviewType";
import { Button } from "@/components/ui/Button";
import { MilestoneItem } from "./MilestoneItem";
import { fadeInUp } from "@/lib/utils/animations";

interface UpcomingMilestonesProps {
  milestones: Milestone[];
}

export const UpcomingMilestones = ({ milestones }: UpcomingMilestonesProps) => {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative h-full overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
    >
      {/* top accent */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/40 to-transparent"
      />

      {/* soft background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-secondary/[0.08] blur-[80px]"
      />

      {/* ====================================================== */}
      {/* HEADER                                                 */}
      {/* ====================================================== */}

      <div
        className="relative z-10 border-b border-border px-5 py-5 sm:px-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Flag className="h-3.5 w-3.5 text-secondary" />

              <span
                className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary"
              >
                Delivery roadmap
              </span>

              <span className="h-px w-7 bg-secondary/30" />
            </div>

            <h2
              className="mt-2 text-lg font-semibold tracking-[-0.025em] text-heading sm:text-xl"
            >
              Upcoming Milestones
            </h2>

            <p
              className="mt-1 text-xs leading-5 text-muted-foreground"
            >
              Key moments coming up across your active engagements.
            </p>
          </div>

          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-secondary/15 bg-secondary/[0.05] text-secondary"
          >
            <CalendarDays className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* ====================================================== */}
      {/* MILESTONES                                             */}
      {/* ====================================================== */}

      {milestones.length > 0 ? (
        <div className="relative z-10">
          {/* timeline */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-6 left-[37px] top-6 w-px bg-border sm:left-[41px]"
          />

          <ul className="divide-y divide-border">
            {milestones.map((item, idx) => (
              <motion.li
                key={idx}
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
                  delay: reduceMotion ? 0 : idx * 0.05,
                }}
                className="group/milestone relative px-5 py-4 transition-colors duration-200 hover:bg-secondary/[0.025] sm:px-6"
              >
                <span
                  className="absolute bottom-0 left-0 top-0 w-[2px] bg-secondary opacity-0 transition-opacity duration-300 group-hover/milestone:opacity-100"
                />

                <MilestoneItem milestone={item} index={idx} />
              </motion.li>
            ))}
          </ul>
        </div>
      ) : (
        /* ==================================================== */
        /* EMPTY STATE                                          */
        /* ==================================================== */

        <div
          className="relative z-10 flex min-h-[280px] flex-col items-center justify-center px-6 py-10 text-center"
        >
          <div
            className="flex h-12 w-12 items-center justify-center border border-secondary/15 bg-secondary/[0.05] text-secondary"
          >
            <CalendarDays className="h-5 w-5" />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-secondary" />

            <span
              className="font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-secondary"
            >
              Roadmap clear
            </span>
          </div>

          <p
            className="mt-3 text-sm font-semibold text-heading"
          >
            No upcoming milestones
          </p>

          <p
            className="mt-1 max-w-[250px] text-xs leading-5 text-muted-foreground"
          >
            Important project stages and delivery dates will appear here.
          </p>
        </div>
      )}

      {/* ====================================================== */}
      {/* FOOTER                                                 */}
      {/* ====================================================== */}

      <div
        className="relative z-10 border-t border-border bg-muted/15 px-5 py-4 sm:px-6"
      >
        <Button
          variant="ghost"
          size="sm"
          disabled={milestones.length === 0}
          className="group w-full justify-between"
        >
          <span className="flex items-center gap-2">
            View All Milestones
            {milestones.length > 0 && (
              <span
                className="font-mono text-[8px] font-medium text-muted-foreground/40"
              >
                {String(milestones.length).padStart(2, "0")}
              </span>
            )}
          </span>

          <ArrowUpRight
            className="h-3.5 w-3.5 text-muted-foreground/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-secondary"
          />
        </Button>
      </div>
    </motion.section>
  );
};
