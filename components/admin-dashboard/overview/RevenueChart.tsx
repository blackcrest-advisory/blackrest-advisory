"use client";

import { useTheme } from "next-themes";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { fadeInUp, hoverScale } from "@/utils/animations";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
);

const months = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const revenueSeries = [58200, 61500, 67200, 72900, 79000, 84500];

//===== Get CSS variable value during render =====//
const getAccentColor = (): string => {
  if (typeof window === "undefined") return "#c9a84c";
  const computed = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-secondary")
    .trim();
  return computed || "#c9a84c";
};

export const RevenueChart = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  //===== Read color during render – no effect needed =====//
  const accentColor = getAccentColor();

  const data = {
    labels: months,
    datasets: [
      {
        label: "Revenue (€)",
        data: revenueSeries,
        borderColor: accentColor,
        backgroundColor: `${accentColor}22`,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: isDark ? "#94a3b8" : "#64748b" },
      },
      y: {
        grid: {
          color: isDark ? "rgba(148,163,184,0.15)" : "rgba(100,116,139,0.15)",
        },
        ticks: { color: isDark ? "#94a3b8" : "#64748b" },
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
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            Revenue Overview
          </h3>
          <span className="text-xs text-muted-foreground">Last 6 months</span>
        </div>
        <Line data={data} options={options} />
      </Card>
    </motion.div>
  );
};
