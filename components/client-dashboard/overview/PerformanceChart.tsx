"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
  type ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTheme } from "next-themes";
import { ChartNoAxesCombined, CircleDot, FolderKanban, ListChecks } from "lucide-react";

import { fadeInUp } from "@/lib/utils/animations";
import type { ProjectActivityChartData } from "@/types/dashboard/client/overviewType";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
);

interface PerformanceChartProps {
  activity: ProjectActivityChartData;
}

export const PerformanceChart = ({ activity }: PerformanceChartProps) => {
  const { resolvedTheme } = useTheme();
  const reduceMotion = Boolean(useReducedMotion());
  const isDark = resolvedTheme === "dark";

  const gold = isDark ? "#d4b86a" : "#a67c27";
  const secondaryLine = isDark ? "#8ea7c5" : "#0a1628";
  const latestProjects = activity.projectsStarted.at(-1) ?? 0;
  const latestMilestones = activity.milestonesCompleted.at(-1) ?? 0;
  const totalActivity =
    activity.projectsStarted.reduce((total, value) => total + value, 0) +
    activity.milestonesCompleted.reduce((total, value) => total + value, 0);

  const chartData = {
    labels: activity.labels,
    datasets: [
      {
        label: "Projects started",
        data: activity.projectsStarted,
        borderColor: gold,
        backgroundColor: isDark
          ? "rgba(212, 184, 106, 0.07)"
          : "rgba(166, 124, 39, 0.07)",
        fill: true,
        tension: 0.42,
        borderWidth: 2.4,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 2,
        pointHoverBackgroundColor: gold,
        pointHoverBorderColor: isDark ? "#112b49" : "#ffffff",
      },
      {
        label: "Milestones completed",
        data: activity.milestonesCompleted,
        borderColor: secondaryLine,
        backgroundColor: isDark
          ? "rgba(142, 167, 197, 0.05)"
          : "rgba(10, 22, 40, 0.035)",
        fill: true,
        tension: 0.42,
        borderWidth: 1.8,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 2,
        pointHoverBackgroundColor: secondaryLine,
        pointHoverBorderColor: isDark ? "#112b49" : "#ffffff",
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    animation: reduceMotion ? false : { duration: 750 },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: isDark ? "rgba(6, 14, 28, 0.96)" : "rgba(255, 255, 255, 0.98)",
        titleColor: isDark ? "#f7f9fc" : "#10192e",
        bodyColor: isDark ? "#a9b7cb" : "#4c5769",
        borderColor: isDark ? "rgba(212,184,106,0.18)" : "rgba(166,124,39,0.16)",
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        boxWidth: 7,
        boxHeight: 7,
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        border: { display: false },
        grid: { display: false },
        ticks: {
          color: isDark ? "#8090a7" : "#7b8390",
          font: { size: 10 },
          padding: 12,
        },
      },
      y: {
        beginAtZero: true,
        border: { display: false },
        grid: {
          color: isDark ? "rgba(148,163,184,0.07)" : "rgba(100,116,139,0.09)",
          drawTicks: false,
        },
        ticks: {
          color: isDark ? "#8090a7" : "#7b8390",
          font: { size: 10 },
          padding: 10,
          precision: 0,
        },
      },
    },
  };

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-36 h-[360px] w-[360px] rounded-full bg-secondary/[0.09] blur-[110px]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden opacity-[0.06] lg:block [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px)] [background-size:16.66%_100%]" />
      <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/40 to-transparent" />

      <div className="relative z-10 grid gap-6 border-b border-border px-5 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end xl:px-7">
        <div>
          <div className="flex items-center gap-2">
            <ChartNoAxesCombined className="h-3.5 w-3.5 text-secondary" />
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-secondary">Project activity</span>
            <span className="h-px w-8 bg-secondary/30" />
          </div>
          <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-heading sm:text-2xl">Your delivery activity</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">A six-month view of projects started and milestones completed for your Blackcrest work.</p>
        </div>
        <div className="flex items-center gap-2 self-start border border-border bg-background/60 px-3 py-2 lg:self-auto">
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/55">Period</span>
          <span className="h-3 w-px bg-border" />
          <span className="text-xs font-medium text-foreground">Last 6 months</span>
        </div>
      </div>

      <div className="relative z-10 grid border-b border-border bg-muted/10 sm:grid-cols-3">
        <SummaryItem label="Projects started" value={latestProjects} icon={FolderKanban} />
        <SummaryItem label="Milestones completed" value={latestMilestones} icon={ListChecks} bordered />
        <div className="border-t border-border px-5 py-4 sm:border-l sm:border-t-0 sm:px-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground/50">Activity status</p>
          <div className="mt-2 flex items-center gap-2">
            <CircleDot className={`h-3.5 w-3.5 ${totalActivity > 0 ? "text-success" : "text-muted-foreground/45"}`} />
            <span className="text-sm font-semibold text-heading">{totalActivity > 0 ? "Recorded activity" : "No activity yet"}</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-wrap items-center gap-x-6 gap-y-2 px-5 pt-5 sm:px-6 xl:px-7">
        <Legend colour="bg-secondary" label="Projects started" />
        <Legend colour="bg-primary dark:bg-[#8ea7c5]" label="Milestones completed" />
      </div>

      <div className="relative z-10 px-3 pb-5 pt-4 sm:px-5 lg:px-6">
        <div className="h-[270px] w-full sm:h-[310px] lg:h-[350px]">
          <Line key={resolvedTheme} data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-3 border-t border-border bg-muted/15 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 xl:px-7">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground/55">Project records connected</span>
        </div>
        <span className="text-xs text-muted-foreground">Updated from your project and milestone records</span>
      </div>
    </motion.section>
  );
};

function SummaryItem({
  label,
  value,
  icon: Icon,
  bordered = false,
}: {
  label: string;
  value: number;
  icon: typeof FolderKanban;
  bordered?: boolean;
}) {
  return (
    <div className={`px-5 py-4 sm:px-6 ${bordered ? "border-t border-border sm:border-l sm:border-t-0" : ""}`}>
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground/50">{label}</p>
        <Icon className="h-3.5 w-3.5 text-secondary" />
      </div>
      <p className="mt-2 text-xl font-semibold tracking-[-0.035em] text-heading">{value}</p>
    </div>
  );
}

function Legend({ colour, label }: { colour: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${colour}`} />
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}
