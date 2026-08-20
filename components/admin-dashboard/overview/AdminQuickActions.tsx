"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  ClipboardCheck,
  UserPlus,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils/utils";
import { fadeInUp } from "@/lib/utils/animations";

interface QuickActionItem {
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
}

//===== Quick action items =====//
const actions: QuickActionItem[] = [
  {
    label: "Add New Lead",
    href: "/admin/dashboard/leads/new",
    icon: UserPlus,
    description: "Create a new opportunity",
  },
  {
    label: "Review Requests",
    href: "/admin/dashboard/project-requests",
    icon: ClipboardCheck,
    description: "Check incoming enquiries",
  },
  {
    label: "Manage Projects",
    href: "/admin/dashboard/projects",
    icon: BriefcaseBusiness,
    description: "Track active delivery",
  },
  {
    label: "View Reports",
    href: "/admin/dashboard/reports",
    icon: BarChart3,
    description: "Open performance reports",
  },
];

export const AdminQuickActions = () => {
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
      {/* top accent */}
      <div className="pointer-events-none absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/35 to-transparent"/>

      {/* header */}
      <div className="border-b border-border px-5 py-5 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 text-secondary" />

              <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
                Command launcher
              </span>

              <span className="h-px w-7 bg-secondary/30" />
            </div>

            <h3 className="mt-2 text-lg font-semibold tracking-[-0.025em] text-heading sm:text-xl">
              Quick Actions
            </h3>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Jump directly into common admin workflows.
            </p>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-secondary/15 bg-secondary/[0.05] text-secondary">
            <Zap className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* actions */}
      <div className="divide-y divide-border">
        {actions.map((action, index) => {
          const Icon = action.icon;

          return (
            <motion.a
              key={action.label}
              href={action.href}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      x: 3,
                    }
              }
              transition={{
                duration: 0.2,
              }}
              className="group relative flex items-center gap-3 px-5 py-4 transition-colors duration-200 hover:bg-secondary/[0.025] sm:px-6"
            >
              {/* index */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-border bg-background font-mono text-[8px] font-semibold text-muted-foreground/40 transition-all duration-200 group-hover:border-secondary/25 group-hover:text-secondary">
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* icon */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-secondary/10 bg-secondary/[0.04] text-secondary transition-all duration-200 group-hover:border-secondary/25 group-hover:bg-secondary group-hover:text-secondary-foreground">
                <Icon className="h-4 w-4" strokeWidth={1.8} />
              </div>

              {/* content */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-heading transition-colors group-hover:text-secondary">
                  {action.label}
                </p>

                <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                  {action.description}
                </p>
              </div>

              {/* arrow */}
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground/30 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-secondary"/>

              {/* hover line */}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-secondary transition-all duration-300 group-hover:w-full"/>
            </motion.a>
          );
        })}
      </div>

      {/* footer */}
      <div className="flex items-center justify-between border-t border-border bg-muted/20 px-5 py-3.5 sm:px-6">
        <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-muted-foreground/40">
          Admin shortcuts
        </span>

        <span className="text-xs font-medium text-foreground">
          {actions.length} actions
        </span>
      </div>
    </motion.section>
  );
};
