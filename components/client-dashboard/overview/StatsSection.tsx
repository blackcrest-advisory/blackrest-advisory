"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BriefcaseBusiness,
  Users,
  TrendingUp,
  Euro,
  ArrowUpRight,
} from "lucide-react";

import { cn } from "@/lib/utils/utils";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";
import { Stats } from "@/types/dashboard/client/overviewType";

interface StatsSectionProps {
  stats: Stats;
}

export const StatsSection = ({ stats }: StatsSectionProps) => {
  const reduceMotion = Boolean(useReducedMotion());

  const items = [
    {
      label: "Active Projects",
      value: String(stats.activeProjects),
      change: "+1 this month",
      icon: BriefcaseBusiness,
      eyebrow: "Delivery",
    },
    {
      label: "Leads Generated",
      value: String(stats.leadsGenerated),
      change: stats.change.leads,
      icon: Users,
      eyebrow: "Growth YTD",
    },
    {
      label: "Conversion Rate",
      value: `${stats.conversionRate}%`,
      change: stats.change.conversion,
      icon: TrendingUp,
      eyebrow: "Performance",
    },
    {
      label: "Revenue Impact",
      value: `€${(stats.revenueImpact / 1000).toFixed(0)}K`,
      change: stats.change.revenue,
      icon: Euro,
      eyebrow: "Commercial impact",
    },
  ];

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
    >
      {items.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.article
            key={item.label}
            variants={fadeInUp}
            whileHover={
              reduceMotion
                ? undefined
                : {
                    y: -4,
                  }
            }
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative min-h-[190px] overflow-hidden border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-[border-color,box-shadow] duration-300 hover:border-secondary/25 hover:shadow-[var(--shadow-card-hover)] sm:p-6"
          >
            {/* ambient accent */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-secondary/[0.07] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
            />

            {/* decorative index */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-6 -right-1 select-none font-mono text-[6rem] font-semibold leading-none tracking-[-0.1em] text-foreground/[0.025]"
            >
              0{index + 1}
            </span>

            <div className="relative z-10">
              {/* top */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className="font-mono text-[7px] font-semibold uppercase tracking-[0.17em] text-secondary"
                  >
                    {item.eyebrow}
                  </p>

                  <p
                    className="mt-1 text-xs font-medium text-muted-foreground"
                  >
                    {item.label}
                  </p>
                </div>

                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center border border-secondary/15 bg-secondary/[0.05] text-secondary transition-all duration-300 group-hover:border-secondary/30 group-hover:bg-secondary group-hover:text-secondary-foreground"
                >
                  <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                </div>
              </div>

              {/* value */}
              <div className="mt-7">
                <p
                  className="text-3xl font-semibold leading-none tracking-[-0.05em] text-heading sm:text-[2rem]"
                >
                  {item.value}
                </p>
              </div>

              {/* change */}
              <div
                className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-3"
              >
                <div className="flex items-center gap-2">
                  <ArrowUpRight
                    className="h-3.5 w-3.5 text-success"
                  />

                  <span
                    className="text-xs font-medium text-success"
                  >
                    {item.change}
                  </span>
                </div>

                <span
                  className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/30"
                >
                  Insight
                </span>
              </div>
            </div>

            {/* hover accent */}
            <div
              className="absolute bottom-0 left-0 h-[2px] w-0 bg-secondary transition-all duration-500 group-hover:w-full"
            />
          </motion.article>
        );
      })}
    </motion.section>
  );
};
