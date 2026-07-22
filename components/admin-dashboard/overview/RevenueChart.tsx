"use client";

import { useEffect, useState } from "react";
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

export const RevenueChart = () => {
  //===== Read the brand secondary color token so canvas rendering matches the active theme =====//
  const [accentColor, setAccentColor] = useState("#c9a84c");

  useEffect(() => {
    const computed = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-secondary")
      .trim();
    if (computed) setAccentColor(computed);
  }, []);

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
      x: { grid: { display: false } },
      y: { grid: { color: "rgba(148,163,184,0.15)" } },
    },
  };

  return (
    <div className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[var(--color-heading)]">
          Revenue Overview
        </h3>
        <span className="text-xs text-[var(--color-body)]">Last 6 months</span>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};
