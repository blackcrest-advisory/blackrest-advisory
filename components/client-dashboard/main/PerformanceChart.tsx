// components/dashboard/PerformanceChart/PerformanceChart.tsx
"use client";

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
import { useTheme } from "next-themes"; // optional, or use CSS variable detection

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

const chartData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
  datasets: [
    {
      label: "Leads Generated",
      data: [120, 180, 150, 220, 280, 310],
      borderColor: "var(--color-gold)",
      backgroundColor: "rgba(201, 168, 76, 0.1)",
      fill: true,
      tension: 0.4,
    },
    {
      label: "Conversions",
      data: [20, 35, 28, 45, 60, 72],
      borderColor: "var(--color-navy)",
      backgroundColor: "rgba(11, 26, 48, 0.05)",
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
      labels: { usePointStyle: true, pointStyle: "circle" },
    },
  },
  scales: {
    y: { beginAtZero: true, grid: { color: "var(--color-border)" } },
    x: { grid: { display: false } },
  },
};

export const PerformanceChart = () => {
  // Force re-render on theme change by using a key
  const { resolvedTheme } = useTheme(); // if using next-themes

  return (
    <div className="bg-[var(--color-card-bg)] border border-[var(--color-card-border)] rounded-xl p-4 md:p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h2 className="text-lg font-semibold text-[var(--color-heading)]">
          📊 Performance Overview
        </h2>
        <div className="flex items-center gap-2 text-sm text-[var(--color-body)]">
          <span>Last 30 days</span>
          <button className="p-1 rounded hover:bg-[var(--color-muted)]">
            <svg
              className="w-4 h-4"
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
    </div>
  );
};
