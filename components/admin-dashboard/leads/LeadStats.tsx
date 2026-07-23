"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/utils/animations";
import { Lead } from "@/types/dashboard/admin/leadTypes";
import CountUp from "react-countup";

interface LeadStatsProps {
  leads: Lead[];
}

export const LeadStats = ({ leads }: LeadStatsProps) => {
  const total = leads.length;
  const newCount = leads.filter((l) => l.status === "new").length;
  const qualified = leads.filter((l) => l.status === "qualified").length;
  const won = leads.filter((l) => l.status === "won").length;
  const lost = leads.filter((l) => l.status === "lost").length;

  const stats = [
    {
      label: "Total Leads",
      value: total,
      color: "bg-secondary/10 text-secondary",
    },
    { label: "New", value: newCount, color: "bg-blue-500/10 text-blue-600" },
    {
      label: "Qualified",
      value: qualified,
      color: "bg-emerald-500/10 text-emerald-600",
    },
    { label: "Won", value: won, color: "bg-green-500/10 text-green-600" },
    { label: "Lost", value: lost, color: "bg-red-500/10 text-red-600" },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={fadeInUp}
          className="rounded-lg border border-border bg-card-bg p-4 shadow-sm transition-shadow hover:shadow-md"
        >
          <p className="text-sm font-medium text-body">{stat.label}</p>
          <p className={`text-2xl font-bold ${stat.color}`}>
            <CountUp end={stat.value} duration={1.2} />
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
};
