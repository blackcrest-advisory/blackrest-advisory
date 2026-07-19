"use client";

import { motion } from "framer-motion";
import { Project } from "@/types/dashboard/client/projects";
import { FolderKanban, Activity, CheckCircle, PauseCircle } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";

interface ProjectStatsProps {
  projects: Project[];
}

export function ProjectStats({ projects }: ProjectStatsProps) {
  const total = projects.length;
  const active = projects.filter((p) => p.status === "active").length;
  const completed = projects.filter((p) => p.status === "completed").length;
  const onHold = projects.filter((p) => p.status === "on-hold").length;

  const stats = [
    {
      label: "Total Projects",
      value: String(total),
      icon: <FolderKanban size={20} />,
    },
    {
      label: "Active",
      value: String(active),
      icon: <Activity size={20} />,
    },
    {
      label: "Completed",
      value: String(completed),
      icon: <CheckCircle size={20} />,
    },
    {
      label: "On Hold",
      value: String(onHold),
      icon: <PauseCircle size={20} />,
    },
  ];

  // Accent color from your theme (gold)
  const accentColor = "var(--color-secondary)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 + index * 0.05 }}
        >
          <StatCard
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            color={accentColor}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
