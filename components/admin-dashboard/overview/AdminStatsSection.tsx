"use client";

import {
  Users,
  Briefcase,
  UserPlus,
  Wallet,
  CheckSquare,
  Receipt,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AdminStats } from "@/types/dashboard/admin/overviewType";

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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-[var(--color-body)]">
              {card.label}
            </span>
            <card.icon className="h-4 w-4 text-[var(--color-secondary)]" />
          </div>
          <p className="mt-3 text-2xl font-bold text-[var(--color-heading)]">
            {card.value}
          </p>
          {card.change !== undefined && (
            <p
              className={cn(
                "mt-1 text-xs font-medium",
                card.change >= 0 ? "text-green-600" : "text-red-500",
              )}
            >
              {card.change >= 0 ? "+" : ""}
              {card.change}% vs last month
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
