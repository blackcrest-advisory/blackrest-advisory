"use client";

import { motion } from "framer-motion";
import { Activity as ActivityIcon, ArrowUpRight, Sparkles } from "lucide-react";

import { ActivityItem } from "@/components/client-dashboard/overview/ActivityItem";
import { Activity } from "@/types/dashboard/client/overviewType";
import { fadeInUp } from "@/lib/utils/animations";

interface RecentActivityProps {
  activities: Activity[];
}

export const RecentActivity = ({ activities }: RecentActivityProps) => {
  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{
        duration: 0.55,
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
      {/* ambient glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-28 -top-28
          h-64 w-64
          rounded-full
          bg-secondary/[0.08]
          blur-[95px]
        "
      />

      {/* subtle background structure */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          hidden opacity-[0.045]
          lg:block
        "
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

      {/* top accent */}
      <div
        className="
          absolute left-0 top-0
          h-[2px] w-full
          bg-gradient-to-r
          from-secondary
          via-secondary/40
          to-transparent
        "
      />

      {/* ====================================================== */}
      {/* HEADER                                                 */}
      {/* ====================================================== */}

      <div
        className="
          relative z-10
          flex flex-col
          gap-4
          border-b border-border
          px-5 py-5
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-6
        "
      >
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-secondary" />

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
              Engagement updates
            </span>

            <span className="h-px w-8 bg-secondary/30" />
          </div>

          <div className="mt-2 flex flex-wrap items-baseline gap-3">
            <h2
              className="
                text-lg
                font-semibold
                tracking-[-0.025em]
                text-heading
                sm:text-xl
              "
            >
              Recent Activity
            </h2>

            <span
              className="
                font-mono
                text-[8px]
                uppercase
                tracking-[0.15em]
                text-muted-foreground/40
              "
            >
              {activities.length} updates
            </span>
          </div>

          <p
            className="
              mt-1
              max-w-xl
              text-xs
              leading-5
              text-muted-foreground
            "
          >
            Follow the latest progress, communication, and delivery updates
            across your Blackcrest engagement.
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
          <ActivityIcon className="h-4 w-4" />
        </div>
      </div>

      {/* ====================================================== */}
      {/* ACTIVITY FEED                                          */}
      {/* ====================================================== */}

      {activities.length > 0 ? (
        <div className="relative z-10">
          <ul className="divide-y divide-border">
            {activities.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: idx * 0.04,
                }}
                className="
                  group/activity
                  relative
                  px-5 py-4
                  transition-colors
                  duration-200
                  hover:bg-secondary/[0.02]
                  sm:px-6
                "
              >
                {/* left hover signal */}
                <span
                  className="
                    absolute
                    bottom-0 left-0 top-0
                    w-[2px]
                    bg-secondary
                    opacity-0
                    transition-opacity
                    duration-300
                    group-hover/activity:opacity-100
                  "
                />

                <ActivityItem activity={item} />
              </motion.li>
            ))}
          </ul>
        </div>
      ) : (
        /* ==================================================== */
        /* EMPTY STATE                                          */
        /* ==================================================== */

        <div
          className="
            relative z-10
            flex min-h-[300px]
            flex-col
            items-center
            justify-center
            px-6 py-10
            text-center
          "
        >
          <div
            className="
              flex h-12 w-12
              items-center justify-center
              border border-secondary/15
              bg-secondary/[0.05]
              text-secondary
            "
          >
            <ActivityIcon className="h-5 w-5" />
          </div>

          <p
            className="
              mt-4
              text-sm
              font-semibold
              text-heading
            "
          >
            No recent updates
          </p>

          <p
            className="
              mt-1
              max-w-xs
              text-xs
              leading-5
              text-muted-foreground
            "
          >
            Project activity, messages, reports, and delivery updates will
            appear here.
          </p>
        </div>
      )}

      {/* ====================================================== */}
      {/* FOOTER                                                 */}
      {/* ====================================================== */}

      {activities.length > 0 && (
        <div
          className="
            relative z-10
            flex flex-col
            gap-3
            border-t border-border
            bg-muted/15
            px-5 py-4

            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-6
          "
        >
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />

            <span
              className="
                font-mono
                text-[7px]
                uppercase
                tracking-[0.16em]
                text-muted-foreground/40
              "
            >
              Workspace activity synced
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              Latest engagement updates
            </span>

            <ArrowUpRight
              className="
                h-3.5 w-3.5
                text-secondary
              "
            />
          </div>
        </div>
      )}
    </motion.section>
  );
};
