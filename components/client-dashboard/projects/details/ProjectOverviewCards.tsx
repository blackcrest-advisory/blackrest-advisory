"use client";

import { motion } from "framer-motion";
import { DollarSign, TrendingUp, CalendarClock, Layers } from "lucide-react";
import { Project } from "@/types/dashboard/client/projectsType";
import { staggerContainer, fadeInUp } from "@/utils/animations";
import { differenceInCalendarDays } from "date-fns";

interface ProjectOverviewCardsProps {
  project: Project;
}

export const ProjectOverviewCards = ({
  project,
}: ProjectOverviewCardsProps) => {
  const daysRemaining = differenceInCalendarDays(project.dueDate, new Date());
  const budgetUsedPercent = Math.round(
    (project.budgetSpent / project.budget) * 100,
  );

  const cards = [
    {
      icon: DollarSign,
      label: "Budget",
      value: `$${project.budgetSpent.toLocaleString()} / $${project.budget.toLocaleString()}`,
      sub: `${budgetUsedPercent}% used`,
    },
    {
      icon: TrendingUp,
      label: "Progress",
      value: `${project.progress}%`,
      sub: "Overall completion",
    },
    {
      icon: CalendarClock,
      label: "Days Remaining",
      value: daysRemaining > 0 ? `${daysRemaining} days` : "Overdue",
      sub: `Due ${project.dueDate.toLocaleDateString()}`,
    },
    {
      icon: Layers,
      label: "Service Type",
      value: project.serviceType,
      sub: project.industry,
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {cards.map((card) => (
        <motion.div
          key={card.label}
          variants={fadeInUp}
          className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-5 shadow-sm"
        >
          <div className="flex items-center gap-2 text-[var(--color-body)]">
            <card.icon size={16} />
            <span className="text-xs font-medium uppercase tracking-wide">
              {card.label}
            </span>
          </div>
          <p className="mt-3 text-lg font-semibold text-[var(--color-heading)]">
            {card.value}
          </p>
          <p className="mt-1 text-xs text-[var(--color-body)]">{card.sub}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};
