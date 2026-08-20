"use client";

import { motion, useReducedMotion } from "framer-motion";
import CountUp from "react-countup";
import {
  CircleDot,
  Crosshair,
  Trophy,
  UserPlus,
  UsersRound,
  XCircle,
} from "lucide-react";

import { staggerContainer, fadeInUp } from "@/lib/utils/animations";
import type { Lead } from "@/types/dashboard/admin/leadTypes";

interface LeadStatsProps {
  leads: Lead[];
}

export const LeadStats = ({ leads }: LeadStatsProps) => {
  const shouldReduceMotion = useReducedMotion();

  //===== Compute counts =====//
  const total = leads.length;
  const newCount = leads.filter((l) => l.status === "new").length;
  const qualified = leads.filter((l) => l.status === "qualified").length;
  const won = leads.filter((l) => l.status === "won").length;
  const lost = leads.filter((l) => l.status === "lost").length;

  //===== Stat configuration =====//
  const stats = [
    {
      label: "Total Leads",
      value: total,
      meta: "Pipeline",
      icon: UsersRound,
      tone: "secondary",
    },
    {
      label: "New",
      value: newCount,
      meta: "Incoming",
      icon: UserPlus,
      tone: "info",
    },
    {
      label: "Qualified",
      value: qualified,
      meta: "Validated",
      icon: Crosshair,
      tone: "success",
    },
    {
      label: "Won",
      value: won,
      meta: "Converted",
      icon: Trophy,
      tone: "success",
    },
    {
      label: "Lost",
      value: lost,
      meta: "Closed",
      icon: XCircle,
      tone: "danger",
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial={shouldReduceMotion ? false : "hidden"}
      animate="visible"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        const toneClasses =
          stat.tone === "success"
            ? "border-success/20 bg-success/[0.05] text-success"
            : stat.tone === "danger"
              ? "border-destructive/20 bg-destructive/[0.05] text-destructive"
              : stat.tone === "info"
                ? "border-blue-500/20 bg-blue-500/[0.05] text-blue-600 dark:text-blue-400"
                : "border-secondary/20 bg-secondary/[0.05] text-secondary";

        return (
          <motion.article
            key={stat.label}
            variants={fadeInUp}
            className="group relative min-h-[165px] overflow-hidden border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:border-secondary/25 hover:shadow-[var(--shadow-card-hover)]"
          >
            {/* decorative index */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-5 -right-1 font-mono text-[5rem] font-semibold leading-none tracking-[-0.1em] text-foreground/[0.025]"
            >
              0{index + 1}
            </span>

            <div className="relative z-10">
              {/* top */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/40"
                  >
                    {stat.meta}
                  </p>

                  <p
                    className="mt-1 text-xs font-medium text-muted-foreground"
                  >
                    {stat.label}
                  </p>
                </div>

                <div
                  className={`
                    flex h-9 w-9
                    shrink-0
                    items-center justify-center
                    border
                    transition-all
                    duration-300
                    ${toneClasses}
                  `}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </div>
              </div>

              {/* value */}
              <div className="mt-6 flex items-end gap-2">
                <p
                  className="text-3xl font-semibold leading-none tracking-[-0.05em] text-heading"
                >
                  <CountUp end={stat.value} duration={1.2} />
                </p>

                <CircleDot
                  className="mb-0.5 h-3 w-3 text-secondary/40"
                />
              </div>

              {/* footer line */}
              <div
                className="mt-5 flex items-center justify-between border-t border-border pt-3"
              >
                <span
                  className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/35"
                >
                  Live count
                </span>

                <span
                  className="h-px w-8 bg-secondary/25 transition-all duration-300 group-hover:w-12 group-hover:bg-secondary"
                />
              </div>
            </div>
          </motion.article>
        );
      })}
    </motion.div>
  );
};
