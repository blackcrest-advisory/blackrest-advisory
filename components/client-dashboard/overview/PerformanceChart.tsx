"use client";

import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTheme } from "next-themes";
import { Card } from "@/components/ui/Card";
import { fadeInUp, hoverScale } from "@/utils/animations";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export const PerformanceChart = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  //===== Define colors based on theme =====//
  const gold = "var(--color-secondary)";
  const conversionColor = isDark ? "#60a5fa" : "var(--color-primary)";
  const textColor = isDark ? "#e8edf5" : "#1a1a2e"; // white-ish for dark, dark navy for light
  const mutedTextColor = isDark ? "#94a3b8" : "#64748b";

  const chartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
    datasets: [
      {
        label: "Leads Generated",
        data: [120, 180, 150, 220, 280, 310],
        borderColor: gold,
        backgroundColor: "rgba(201, 168, 76, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Conversions",
        data: [20, 35, 28, 45, 60, 72],
        borderColor: conversionColor,
        backgroundColor: isDark
          ? "rgba(96, 165, 250, 0.1)"
          : "rgba(11, 26, 48, 0.05)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          color: textColor,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "var(--color-border)" },
        ticks: { color: mutedTextColor },
      },
      x: {
        grid: { display: false },
        ticks: { color: mutedTextColor },
      },
    },
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      {...hoverScale}
    >
      <Card padding="base" hoverEffect className="rounded-xl">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-foreground">
            Performance Overview
          </h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Last 30 days</span>
            <button className="rounded p-1 hover:bg-muted">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="h-64">
          <Line key={resolvedTheme} data={chartData} options={chartOptions} />
        </div>
      </Card>
    </motion.div>
  );
};
