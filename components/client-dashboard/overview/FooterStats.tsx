"use client";

import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ReceiptText,
} from "lucide-react";

import { fadeInUp } from "@/lib/utils/animations";
import type { ClientRelationshipStats } from "@/types/dashboard/client/overviewType";

interface FooterStatsProps {
  stats: ClientRelationshipStats;
}

export const FooterStats = ({ stats }: FooterStatsProps) => {
  const items = [
    {
      label: "Partner Since",
      value: stats.partnerSince,
      icon: CalendarDays,
      meta: "Relationship",
    },
    {
      label: "Total Projects",
      value: String(stats.totalProjects),
      icon: BriefcaseBusiness,
      meta: "Engagements",
    },
    {
      label: "Completion Rate",
      value:
        stats.completionRate === null ? "—" : `${stats.completionRate}%`,
      icon: CheckCircle2,
      meta: "Delivery",
    },
    {
      label: "Paid Invoices",
      value: String(stats.paidInvoices),
      icon: ReceiptText,
      meta: "Billing",
    },
  ];

  return (
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
      {/* ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-28 h-64 w-64 rounded-full bg-secondary/[0.08] blur-[95px]"
      />

      {/* top accent */}
      <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/40 to-transparent"/>

      {/* header */}
      <div className="relative z-10 flex flex-col gap-3 border-b border-border px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
            Partnership snapshot
          </p>

          <h2 className="mt-2 text-lg font-semibold tracking-[-0.025em] text-heading sm:text-xl">
            Your Blackcrest Relationship
          </h2>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            A concise view of your engagement history and delivery performance.
          </p>
        </div>

        <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-muted-foreground/35">
          Client / Record
        </span>
      </div>

      {/* stats */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className={`
                group
                relative
                px-5 py-5
                transition-colors
                duration-300
                hover:bg-secondary/[0.025]
                sm:px-6

                ${index > 0 ? "border-t border-border sm:border-t-0" : ""}

                ${index % 2 !== 0 ? "sm:border-l" : ""}

                ${index > 1 ? "sm:border-t xl:border-t-0" : ""}

                ${index > 0 ? "xl:border-l" : ""}
              `}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/40">
                    {item.meta}
                  </p>

                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    {item.label}
                  </p>
                </div>

                <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-secondary/15 bg-secondary/[0.05] text-secondary transition-all duration-300 group-hover:border-secondary/30 group-hover:bg-secondary group-hover:text-secondary-foreground">
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </div>
              </div>

              <p className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-heading">
                {item.value}
              </p>

              <div className="mt-4 h-px w-8 bg-secondary/30 transition-all duration-300 group-hover:w-14 group-hover:bg-secondary"/>
            </div>
          );
        })}
      </div>

      {/* bottom status */}
      <div className="relative z-10 flex flex-col gap-2 border-t border-border bg-muted/15 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />

          <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-muted-foreground/40">
            Partnership active
          </span>
        </div>

        <span className="text-xs text-muted-foreground">
          Blackcrest client relationship record
        </span>
      </div>
    </motion.section>
  );
};
