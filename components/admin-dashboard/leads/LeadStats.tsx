"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Card } from "@/components/ui/Card";
import { staggerContainer, fadeInUp, hoverScale } from "@/lib/utils/animations";
import type { Lead } from "@/types/dashboard/admin/leadTypes";

interface LeadStatsProps {
  leads: Lead[];
}

export const LeadStats = ({ leads }: LeadStatsProps) => {
  //===== Compute counts =====//
  const total = leads.length;
  const newCount = leads.filter((l) => l.status === "new").length;
  const qualified = leads.filter((l) => l.status === "qualified").length;
  const won = leads.filter((l) => l.status === "won").length;
  const lost = leads.filter((l) => l.status === "lost").length;

  //===== Stat configuration with semantic + dark mode friendly colours =====//
  const stats = [
    {
      label: "Total Leads",
      value: total,
      color: "bg-secondary/10 text-secondary",
    },
    {
      label: "New",
      value: newCount,
      color:
        "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
    },
    {
      label: "Qualified",
      value: qualified,
      color:
        "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
    },
    {
      label: "Won",
      value: won,
      color:
        "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400",
    },
    {
      label: "Lost",
      value: lost,
      color: "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400",
    },
  ];

  return (
    //===== Stats Grid =====//
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
    >
      {stats.map((stat) => (
        <motion.div key={stat.label} variants={fadeInUp} {...hoverScale}>
          <Card padding="base" hoverEffect className="rounded-lg">
            <p className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </p>
            <p className={`text-2xl font-bold px-2 rounded-sm ${stat.color}`}>
              <CountUp end={stat.value} duration={1.2} />
            </p>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};
