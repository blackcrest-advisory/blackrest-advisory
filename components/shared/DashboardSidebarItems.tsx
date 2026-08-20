"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { NavItem } from "@/types/navigations";
import { useSidebarStore } from "@/store/sidebarStore";
import { cn } from "@/lib/utils/utils";

interface SidebarItemProps {
  item: NavItem;
  isActive: boolean;
  isCollapsed?: boolean;
}

export default function DashboardSidebarItems({
  item,
  isActive,
  isCollapsed: collapsedOverride,
}: SidebarItemProps) {
  const Icon = item.icon;

  const { isCollapsed: storeIsCollapsed } = useSidebarStore();
  const isCollapsed = collapsedOverride ?? storeIsCollapsed;

  const reduceMotion = Boolean(useReducedMotion());

  return (
    <div className="group/item relative">
      <Link
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          `
            relative
            flex min-h-11
            items-center
            gap-3
            overflow-hidden
            px-3
            
            text-body

            transition-[background-color,color,border-color,box-shadow]
            duration-200

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-ring/50
          `,
          isCollapsed && "justify-center px-2",
          isActive
            ? `
              bg-secondary/[0.085]
              text-secondary
              shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--color-secondary)_12%,transparent)]
            `
            : `
              hover:bg-muted/60
              hover:text-foreground
            `,
        )}
      >
        {/* ====================================================== */}
        {/* ACTIVE BACKGROUND SIGNAL                               */}
        {/* ====================================================== */}

        {isActive && (
          <motion.div
            layoutId="sidebar-active-bg"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-secondary/[0.06] via-secondary/[0.025] to-transparent"
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 34,
            }}
          />
        )}

        {/* ====================================================== */}
        {/* ACTIVE LEFT INDICATOR                                  */}
        {/* ====================================================== */}

        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute left-0 top-1/2 h-6 w-[2px] -translate-y-1/2 bg-secondary shadow-[0_0_10px_var(--color-secondary)]"
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          />
        )}

        {/* ====================================================== */}
        {/* ICON                                                   */}
        {/* ====================================================== */}

        <motion.div
          whileHover={
            reduceMotion
              ? undefined
              : {
                  scale: 1.06,
                }
          }
          className={cn(
            `
              relative z-10
              flex h-8 w-8
              shrink-0
              items-center
              justify-center
              transition-all
              duration-200
            `,
            isActive
              ? `
                bg-secondary/[0.10]
                text-secondary
              `
              : `
                text-muted-foreground
                group-hover/item:bg-muted
                group-hover/item:text-foreground
              `,
          )}
        >
          <Icon className="h-[18px] w-[18px]" />
        </motion.div>

        {/* ====================================================== */}
        {/* LABEL                                                  */}
        {/* ====================================================== */}

        {!isCollapsed && (
          <motion.span
            initial={{
              opacity: 0,
              x: reduceMotion ? 0 : -6,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.18,
              ease: "easeOut",
            }}
            className={cn(
              `
                relative z-10
                min-w-0
                flex-1
                whitespace-nowrap
                text-sm
                font-medium
                tracking-[-0.01em]
              `,
              isActive ? "text-secondary" : "text-foreground/80",
            )}
          >
            {item.label}
          </motion.span>
        )}

        {/* ====================================================== */}
        {/* RIGHT ACTIVE DOT                                       */}
        {/* ====================================================== */}

        {!isCollapsed && isActive && (
          <motion.span
            initial={{
              opacity: 0,
              scale: reduceMotion ? 1 : 0.7,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="relative z-10 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary shadow-[0_0_8px_var(--color-secondary)]"
          />
        )}

        {/* ====================================================== */}
        {/* HOVER SWEEP                                            */}
        {/* ====================================================== */}

        {!reduceMotion && !isActive && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -left-[45%] w-[30%] rotate-[10deg] bg-gradient-to-r from-transparent via-secondary/[0.035] to-transparent opacity-0 blur-lg transition-all duration-700 group-hover/item:left-[115%] group-hover/item:opacity-100"
          />
        )}
      </Link>

      {/* ======================================================== */}
      {/* COLLAPSED TOOLTIP                                        */}
      {/* ======================================================== */}

      {isCollapsed && (
        <div
          className="pointer-events-none absolute left-full top-1/2 z-[60] ml-3 hidden -translate-y-1/2 opacity-0 transition-all duration-150 group-hover/item:translate-x-0 group-hover/item:opacity-100 lg:block"
        >
          <div
            className="relative whitespace-nowrap border border-border bg-popover px-3 py-2 text-xs font-medium text-foreground shadow-[var(--shadow-overlay)]"
          >
            {item.label}

            <span
              className="absolute left-[-4px] top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-b border-l border-border bg-popover"
            />
          </div>
        </div>
      )}
    </div>
  );
}
