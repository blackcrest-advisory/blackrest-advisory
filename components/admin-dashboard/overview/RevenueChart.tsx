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
  type ChartOptions,
} from "chart.js";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, TrendingUp } from "lucide-react";

import { fadeInUp } from "@/lib/utils/animations";
import type { RevenuePoint } from "@/types/dashboard/admin/overviewType";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
);

//===== Get CSS variable value during render =====//
const getAccentColor = (): string => {
  if (typeof window === "undefined") return "#c9a84c";

  const computed = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-secondary")
    .trim();

  return computed || "#c9a84c";
};

export const RevenueChart = ({ revenue }: { revenue: RevenuePoint[] }) => {
  const { resolvedTheme } = useTheme();
  const reduceMotion = Boolean(useReducedMotion());

  const isDark = resolvedTheme === "dark";
  const accentColor = getAccentColor();

  const revenueValues = revenue.map((point) => point.value);

  const totalRevenue = revenueValues.reduce((total, value) => total + value, 0);

  const latestRevenue =
    revenueValues.length > 0 ? revenueValues[revenueValues.length - 1] : 0;

  const previousRevenue =
    revenueValues.length > 1 ? revenueValues[revenueValues.length - 2] : 0;

  const growth =
    previousRevenue > 0
      ? ((latestRevenue - previousRevenue) / previousRevenue) * 100
      : 0;

  const isPositiveGrowth = growth >= 0;

  const data = {
    labels: revenue.map((point) => point.label),

    datasets: [
      {
        label: "Revenue",
        data: revenueValues,

        borderColor: accentColor,
        backgroundColor: `${accentColor}14`,

        fill: true,
        tension: 0.42,

        borderWidth: 2.2,

        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 2,

        pointHoverBackgroundColor: accentColor,

        pointHoverBorderColor: resolvedTheme === "dark" ? "#112b49" : "#ffffff",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,

    interaction: {
      mode: "index",
      intersect: false,
    },

    animation: reduceMotion
      ? false
      : {
          duration: 700,
        },

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        enabled: true,

        backgroundColor: isDark
          ? "rgba(6, 14, 28, 0.96)"
          : "rgba(255, 255, 255, 0.98)",

        titleColor: isDark ? "#f7f9fc" : "#10192e",

        bodyColor: isDark ? "#a9b7cb" : "#4c5769",

        borderColor: isDark
          ? "rgba(212, 184, 106, 0.20)"
          : "rgba(166, 124, 39, 0.18)",

        borderWidth: 1,

        padding: 12,

        displayColors: false,

        callbacks: {
          label: (context) => `€${Number(context.parsed.y).toLocaleString()}`,
        },
      },
    },

    scales: {
      x: {
        border: {
          display: false,
        },

        grid: {
          display: false,
        },

        ticks: {
          color: isDark ? "#7f91aa" : "#778190",

          font: {
            size: 10,
          },

          padding: 10,
        },
      },

      y: {
        border: {
          display: false,
        },

        grid: {
          color: isDark ? "rgba(148,163,184,0.08)" : "rgba(100,116,139,0.10)",

          drawTicks: false,
        },

        ticks: {
          color: isDark ? "#7f91aa" : "#778190",

          font: {
            size: 10,
          },

          padding: 10,

          callback: (value) => {
            const numericValue = Number(value);

            if (numericValue >= 1000) {
              return `€${numericValue / 1000}k`;
            }

            return `€${numericValue}`;
          },
        },
      },
    },
  };

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
    >
      {/*===== BACKGROUND DETAILS =====*/}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-32 h-72 w-72 rounded-full bg-secondary/[0.07] blur-[100px]"
      />

      <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/35 to-transparent"/>

      {/*===== HEADER =====*/}

      <div className="relative z-10 flex flex-col gap-5 border-b border-border px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        {/* left */}
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-3.5 w-3.5 text-secondary" />

            <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
              Financial performance
            </span>

            <span className="h-px w-8 bg-secondary/30" />
          </div>

          <div className="mt-2 flex items-baseline gap-3">
            <h3 className="text-xl font-semibold tracking-[-0.025em] text-heading sm:text-2xl">
              Revenue Overview
            </h3>

            <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-muted-foreground/40">
              Last {revenue.length} periods
            </span>
          </div>
        </div>

        {/* right summary */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div>
            <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
              Latest revenue
            </p>

            <p className="mt-1 text-xl font-semibold tracking-[-0.03em] text-heading">
              €{latestRevenue.toLocaleString()}
            </p>
          </div>

          <div className="hidden h-9 w-px bg-border sm:block" />

          <div>
            <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
              Period change
            </p>

            <div className="mt-1 flex items-center gap-1.5">
              <ArrowUpRight
                className={`
                  h-3.5 w-3.5
                  ${
                    isPositiveGrowth
                      ? "text-success"
                      : "rotate-90 text-destructive"
                  }
                `}
              />

              <span
                className={`
                  text-sm
                  font-semibold
                  ${isPositiveGrowth ? "text-success" : "text-destructive"}
                `}
              >
                {isPositiveGrowth ? "+" : ""}
                {growth.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/*===== CHART =====*/}

      <div className="relative z-10 px-3 pb-4 pt-5 sm:px-5 lg:px-6">
        <div className="relative h-[260px] w-full sm:h-[300px] lg:h-[340px]">
          <Line data={data} options={options} />
        </div>
      </div>

      {/*===== FOOTER STRIP =====*/}

      <div className="relative z-10 grid border-t border-border bg-muted/20 sm:grid-cols-3">
        <div className="flex items-center justify-between gap-4 px-5 py-3.5">
          <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
            Total
          </span>

          <span className="text-xs font-medium text-foreground">
            €{totalRevenue.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-border px-5 py-3.5 sm:border-l sm:border-t-0">
          <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
            Trend
          </span>

          <span
            className={
              isPositiveGrowth
                ? "text-xs font-medium text-success"
                : "text-xs font-medium text-destructive"
            }
          >
            {isPositiveGrowth ? "Growing" : "Declining"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-border px-5 py-3.5 sm:border-l sm:border-t-0">
          <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
            Dataset
          </span>

          <span className="text-xs font-medium text-foreground">
            {revenue.length} points
          </span>
        </div>
      </div>
    </motion.section>
  );
};
