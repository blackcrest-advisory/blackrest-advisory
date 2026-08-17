"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { NavItem } from "@/types/navigations";
import { useSidebarStore } from "@/store/sidebarStore";

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
      className={`
        relative flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200
        hover:bg-muted/70 ${isCollapsed ? "justify-center" : ""}
      `}
      style={{
        color: isActive ? "var(--color-gold)" : "var(--color-body)",
        backgroundColor: isActive ? "rgba(201,168,76,0.08)" : "transparent",
      }}
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
          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r"
          style={{ backgroundColor: "var(--color-gold)" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </Link>
  );
}
