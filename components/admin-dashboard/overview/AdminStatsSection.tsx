"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Briefcase,
  Receipt,
  UserPlus,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils/utils";
import { staggerContainer, fadeInUp } from "@/lib/utils/animations";
import type { AdminStats } from "@/types/dashboard/admin/overviewType";

interface AdminStatsSectionProps {
  stats: AdminStats;
}

interface StatCardConfig {
  label: string;
  value: string;
  change?: number;
  icon: LucideIcon;
  microLabel: string;
}

export const AdminStatsSection = ({ stats }: AdminStatsSectionProps) => {
  const reduceMotion = Boolean(useReducedMotion());

  const cards: StatCardConfig[] = [
    {
      label: "Total Clients",
      value: stats.totalClients.toString(),
      change: stats.totalClientsChange,
      icon: Users,
      microLabel: "Client base",
    },
    {
      label: "Active Projects",
      value: stats.activeProjects.toString(),
      change: stats.activeProjectsChange,
      icon: Briefcase,
      microLabel: "Live delivery",
    },
    {
      label: "New Leads",
      value: stats.newLeads.toString(),
      change: stats.newLeadsChange,
      icon: UserPlus,
      microLabel: "Pipeline",
    },
    {
      label: "Monthly Revenue",
      value: `€${stats.monthlyRevenue.toLocaleString()}`,
      change: stats.monthlyRevenueChange,
      icon: Wallet,
      microLabel: "Current month",
    },
    {
      label: "Overdue Invoices",
      value: stats.overdueInvoices.toString(),
      icon: Receipt,
      microLabel: "Needs attention",
    },
  ];

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
    >
      {cards.map((card, index) => {
        const Icon = card.icon;

        const hasChange = card.change !== undefined;
        const isPositive = hasChange && card.change! >= 0;
        const isAttention = card.label === "Overdue Invoices";

        return (
          <motion.article
            key={card.label}
            variants={fadeInUp}
            whileHover={
              reduceMotion
                ? undefined
                : {
                    y: -3,
                  }
            }
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={cn(
              `
                group
                relative
                min-h-[170px]
                overflow-hidden
                border border-border
                bg-card
                p-5
                text-card-foreground
                shadow-[var(--shadow-card)]
                transition-[border-color,box-shadow,background-color]
                duration-300

                hover:border-secondary/25
                hover:shadow-[var(--shadow-card-hover)]
              `,
              isAttention &&
                `
                  border-warning/20
                `,
            )}
          >
            {/* subtle glow */}
            <div
              aria-hidden="true"
              className={cn(
                `
                  pointer-events-none
                  absolute -right-14 -top-14
                  h-32 w-32
                  rounded-full
                  opacity-0
                  blur-3xl
                  transition-opacity
                  duration-500
                  group-hover:opacity-100
                `,
                isAttention ? "bg-warning/[0.08]" : "bg-secondary/[0.07]",
              )}
            />

            {/* large index */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-5 -right-1 select-none font-mono text-[5.5rem] font-semibold leading-none tracking-[-0.09em] text-foreground/[0.025]"
            >
              0{index + 1}
            </span>

            <div className="relative z-10">
              {/* top row */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[7px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/45">
                    {card.microLabel}
                  </p>

                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    {card.label}
                  </p>
                </div>

                <div
                  className={cn(
                    `
                      flex h-9 w-9
                      shrink-0
                      items-center justify-center
                      border
                      transition-all
                      duration-300
                    `,
                    isAttention
                      ? `
                        border-warning/20
                        bg-warning/[0.06]
                        text-warning
                      `
                      : `
                        border-secondary/15
                        bg-secondary/[0.05]
                        text-secondary

                        group-hover:border-secondary/30
                        group-hover:bg-secondary
                        group-hover:text-secondary-foreground
                      `,
                  )}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </div>
              </div>

              {/* metric */}
              <div className="mt-6">
                <p
                  className={cn(
                    `
                      text-3xl
                      font-semibold
                      leading-none
                      tracking-[-0.05em]
                    `,
                    isAttention ? "text-warning" : "text-heading",
                  )}
                >
                  {card.value}
                </p>
              </div>

              {/* footer */}
              <div className="mt-5 flex items-center justify-between gap-3">
                {hasChange ? (
                  <div
                    className={cn(
                      `
                        flex items-center
                        gap-1.5
                        text-xs
                        font-medium
                      `,
                      isPositive ? "text-success" : "text-destructive",
                    )}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowDownRight className="h-3.5 w-3.5" />
                    )}

                    <span>
                      {isPositive ? "+" : ""}
                      {card.change}%
                    </span>

                    <span className="text-muted-foreground/45">
                      vs last month
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        isAttention ? "bg-warning" : "bg-muted-foreground/30",
                      )}
                    />

                    <span className="text-xs font-medium text-muted-foreground">
                      {isAttention ? "Review required" : "Current"}
                    </span>
                  </div>
                )}

                <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/30">
                  KPI
                </span>
              </div>
            </div>

            {/* bottom status line */}
            <div
              className={cn(
                `
                  absolute
                  bottom-0 left-0
                  h-[2px]
                  w-0
                  transition-all
                  duration-500
                  group-hover:w-full
                `,
                isAttention ? "bg-warning" : "bg-secondary",
              )}
            />
          </motion.article>
        );
      })}
    </motion.section>
  );
};
