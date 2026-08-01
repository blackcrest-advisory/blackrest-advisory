"use client";

import { motion } from "framer-motion";
import {
  Users,
  Briefcase,
  UserPlus,
  Wallet,
  CheckSquare,
  Receipt,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { Card } from "@/components/ui/Card";
import { staggerContainer, fadeInUp, hoverScale } from "@/lib/utils/animations";
import type { AdminStats } from "@/types/dashboard/admin/overviewType";

interface AdminStatsSectionProps {
  stats: AdminStats;
}

interface StatCardConfig {
  label: string;
  value: string;
  change?: number;
  icon: LucideIcon;
}

export const AdminStatsSection = ({ stats }: AdminStatsSectionProps) => {
  //===== Build stat cards from props =====//
  const cards: StatCardConfig[] = [
    {
      label: "Total Clients",
      value: stats.totalClients.toString(),
      change: stats.totalClientsChange,
      icon: Users,
    },
    {
      label: "Active Projects",
      value: stats.activeProjects.toString(),
      change: stats.activeProjectsChange,
      icon: Briefcase,
    },
    {
      label: "New Leads",
      value: stats.newLeads.toString(),
      change: stats.newLeadsChange,
      icon: UserPlus,
    },
    {
      label: "Monthly Revenue",
      value: `€${stats.monthlyRevenue.toLocaleString()}`,
      change: stats.monthlyRevenueChange,
      icon: Wallet,
    },
    {
      label: "Pending Tasks",
      value: stats.pendingTasks.toString(),
      icon: CheckSquare,
    },
    {
      label: "Overdue Invoices",
      value: stats.overdueInvoices.toString(),
      icon: Receipt,
    },
  ];

  return (
    //===== Stats Grid with staggered entrance =====//
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
    >
      {cards.map((card) => (
        <motion.div key={card.label} variants={fadeInUp} {...hoverScale}>
          <Card hoverEffect>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {card.label}
              </span>
              <card.icon className="h-4 w-4 text-secondary" />
            </div>
            <p className="mt-3 text-2xl font-bold text-foreground">
              {card.value}
            </p>
            {card.change !== undefined && (
              <p
                className={cn(
                  "mt-1 text-xs font-medium",
                  card.change >= 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-500 dark:text-red-400",
                )}
              >
                {card.change >= 0 ? "+" : ""}
                {card.change}% vs last month
              </p>
            )}
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};
