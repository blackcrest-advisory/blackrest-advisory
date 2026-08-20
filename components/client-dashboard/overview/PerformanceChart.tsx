"use client";

import { motion, useReducedMotion } from "framer-motion";
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
import { Line } from "react-chartjs-2";
import { useTheme } from "next-themes";
import { ArrowUpRight, ChartNoAxesCombined, Sparkles } from "lucide-react";

import { fadeInUp } from "@/lib/utils/animations";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
);

export const PerformanceChart = () => {
  const { resolvedTheme } = useTheme();
  const reduceMotion = Boolean(useReducedMotion());

  const isDark = resolvedTheme === "dark";

  const gold = isDark ? "#d4b86a" : "#a67c27";
  const secondaryLine = isDark ? "#8ea7c5" : "#0a1628";

  //===== Chart Data =====//
  const leadsData = [120, 180, 150, 220, 280, 310];
  const conversionData = [20, 35, 28, 45, 60, 72];

  const latestLeads = leadsData[leadsData.length - 1];
  const latestConversions = conversionData[conversionData.length - 1];

  const previousLeads = leadsData[leadsData.length - 2];

  const leadGrowth =
    previousLeads > 0
      ? ((latestLeads - previousLeads) / previousLeads) * 100
      : 0;

  const chartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],

    datasets: [
      {
        label: "Leads Generated",
        data: leadsData,

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
        label: "Conversions",
        data: conversionData,

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

    interaction: {
      mode: "index",
      intersect: false,
    },

    animation: reduceMotion
      ? false
      : {
          duration: 750,
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
          ? "rgba(212,184,106,0.18)"
          : "rgba(166,124,39,0.16)",

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
        border: {
          display: false,
        },

        grid: {
          display: false,
        },

        ticks: {
          color: isDark ? "#8090a7" : "#7b8390",

          font: {
            size: 10,
          },

          padding: 12,
        },
      },

      y: {
        beginAtZero: true,

        border: {
          display: false,
        },

        grid: {
          color: isDark ? "rgba(148,163,184,0.07)" : "rgba(100,116,139,0.09)",

          drawTicks: false,
        },

        ticks: {
          color: isDark ? "#8090a7" : "#7b8390",

          font: {
            size: 10,
          },

          padding: 10,
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
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
    >
      {/* ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-36 h-[360px] w-[360px] rounded-full bg-secondary/[0.09] blur-[110px]"
      />

      {/* architectural background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden opacity-[0.06] lg:block"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              var(--color-border) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "16.66% 100%",
        }}
      />

      {/* top gold line */}
      <div
        className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/40 to-transparent"
      />

      {/*===== HEADER =====*/}

      <div
        className="relative z-10 grid gap-6 border-b border-border px-5 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end xl:px-7"
      >
        {/* left */}
        <div>
          <div className="flex items-center gap-2">
            <ChartNoAxesCombined className="h-3.5 w-3.5 text-secondary" />

            <span
              className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary"
            >
              Growth intelligence
            </span>

            <span className="h-px w-8 bg-secondary/30" />
          </div>

          <h2
            className="mt-3 text-xl font-semibold tracking-[-0.03em] text-heading sm:text-2xl"
          >
            Performance Overview
          </h2>

          <p
            className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground"
          >
            A clear view of how your acquisition and conversion performance is
            progressing over time.
          </p>
        </div>

        {/* period */}
        <div
          className="flex items-center gap-2 self-start border border-border bg-background/60 px-3 py-2 lg:self-auto"
        >
          <span
            className="font-mono text-[8px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/45"
          >
            Period
          </span>

          <span className="h-3 w-px bg-border" />

          <span
            className="text-xs font-medium text-foreground"
          >
            Last 30 days
          </span>
        </div>
      </div>

      {/*===== PERFORMANCE SUMMARY =====*/}

      <div
        className="relative z-10 grid border-b border-border bg-muted/10 sm:grid-cols-3"
      >
        <div className="px-5 py-4 sm:px-6">
          <p
            className="font-mono text-[7px] uppercase tracking-[0.16em] text-muted-foreground/40"
          >
            Leads generated
          </p>

          <div className="mt-1.5 flex items-baseline gap-2">
            <span
              className="text-xl font-semibold tracking-[-0.035em] text-heading"
            >
              {latestLeads}
            </span>

            <span
              className="flex items-center gap-1 text-[11px] font-medium text-success"
            >
              <ArrowUpRight className="h-3 w-3" />
              {leadGrowth.toFixed(1)}%
            </span>
          </div>
        </div>

        <div
          className="border-t border-border px-5 py-4 sm:border-l sm:border-t-0 sm:px-6"
        >
          <p
            className="font-mono text-[7px] uppercase tracking-[0.16em] text-muted-foreground/40"
          >
            Conversions
          </p>

          <p
            className="mt-1.5 text-xl font-semibold tracking-[-0.035em] text-heading"
          >
            {latestConversions}
          </p>
        </div>

        <div
          className="border-t border-border px-5 py-4 sm:border-l sm:border-t-0 sm:px-6"
        >
          <p
            className="font-mono text-[7px] uppercase tracking-[0.16em] text-muted-foreground/40"
          >
            Growth signal
          </p>

          <div className="mt-1.5 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-secondary" />

            <span
              className="text-sm font-semibold text-secondary"
            >
              Positive momentum
            </span>
          </div>
        </div>
      </div>

      {/*===== LEGEND =====*/}

      <div
        className="relative z-10 flex flex-wrap items-center gap-x-6 gap-y-2 px-5 pt-5 sm:px-6 xl:px-7"
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-secondary" />

          <span
            className="text-xs font-medium text-muted-foreground"
          >
            Leads Generated
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full bg-primary dark:bg-[#8ea7c5]"
          />

          <span
            className="text-xs font-medium text-muted-foreground"
          >
            Conversions
          </span>
        </div>
      </div>

      {/*===== CHART =====*/}

      <div
        className="relative z-10 px-3 pb-5 pt-4 sm:px-5 lg:px-6"
      >
        <div
          className="h-[270px] w-full sm:h-[310px] lg:h-[350px]"
        >
          <Line key={resolvedTheme} data={chartData} options={chartOptions} />
        </div>
      </div>

      {/*===== FOOTER =====*/}

      <div
        className="relative z-10 flex flex-col gap-3 border-t border-border bg-muted/15 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 xl:px-7"
      >
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />

          <span
            className="font-mono text-[7px] uppercase tracking-[0.16em] text-muted-foreground/40"
          >
            Performance tracking active
          </span>
        </div>

        <span
          className="text-xs text-muted-foreground"
        >
          Updated from your latest campaign data
        </span>
      </div>
    </motion.section>
  );
};
