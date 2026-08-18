"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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

  return (
    <Link
      href={item.href}
      className={cn(
        "relative flex items-center gap-3 rounded-[var(--radius-control)] px-3 py-2.5 text-body transition-[background-color,color,transform] duration-200 hover:bg-muted/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        isCollapsed && "justify-center",
        isActive && "bg-secondary/10 font-semibold text-secondary",
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon className="shrink-0" />

      {/* Labels must leave the flex layout when the sidebar is collapsed. */}
      {!isCollapsed && (
        <motion.span
          className="whitespace-nowrap text-sm font-medium"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {item.label}
        </motion.span>
      )}

      {/* Active indicator bar */}
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r bg-secondary"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </Link>
  );
}
