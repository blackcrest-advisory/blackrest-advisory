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
import { TrendingUp } from "lucide-react";

import { Select } from "@/components/ui/Select";
import { fadeInUp } from "@/lib/utils/animations";
import { formatCurrency } from "@/lib/utils/currencies";
import type { RevenueSeries } from "@/types/dashboard/admin/overviewType";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
);

const getAccentColor = (): string => {
  if (typeof window === "undefined") return "#c9a84c";

  const computed = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-secondary")
    .trim();

  return computed || "#c9a84c";
};

interface RevenueChartProps {
  revenue: RevenueSeries[];
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
}

export const RevenueChart = ({
  revenue,
  selectedCurrency,
  onCurrencyChange,
}: RevenueChartProps) => {
  const { resolvedTheme } = useTheme();
  const reduceMotion = Boolean(useReducedMotion());

  const isDark = resolvedTheme === "dark";
  const accentColor = getAccentColor();
  const selectedSeries = revenue.find(
    (series) => series.currency === selectedCurrency,
  );
  const revenuePoints = selectedSeries?.points ?? [];
  const revenueValues = revenuePoints.map((point) => point.value);
  const totalRevenue = revenueValues.reduce((total, value) => total + value, 0);
  const latestRevenue = revenueValues.at(-1) ?? 0;
  const previousRevenue = revenueValues.at(-2) ?? 0;
  const growth =
    previousRevenue > 0
      ? ((latestRevenue - previousRevenue) / previousRevenue) * 100
      : 0;
  const isPositiveGrowth = growth >= 0;

  const currencyOptions = [
    { value: "ALL", label: "All currencies" },
    ...revenue.map((series) => ({
      value: series.currency,
      label: `${series.currency} revenue`,
    })),
  ];

  const data = {
    labels: revenuePoints.map((point) => point.label),
    datasets: [
      {
        label: selectedCurrency,
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
    interaction: { mode: "index", intersect: false },
    animation: reduceMotion ? false : { duration: 700 },
    plugins: {
      legend: { display: false },
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
          label: (context) =>
            formatCurrency(Number(context.parsed.y), selectedCurrency),
        },
      },
    },
    scales: {
      x: {
        border: { display: false },
        grid: { display: false },
        ticks: {
          color: isDark ? "#7f91aa" : "#778190",
          font: { size: 10 },
          padding: 10,
        },
      },
      y: {
        border: { display: false },
        grid: {
          color: isDark ? "rgba(148,163,184,0.08)" : "rgba(100,116,139,0.10)",
          drawTicks: false,
        },
        ticks: {
          color: isDark ? "#7f91aa" : "#778190",
          font: { size: 10 },
          padding: 10,
          callback: (value) => {
            const numericValue = Number(value);
            const displayValue =
              numericValue >= 1000
                ? `${(numericValue / 1000).toLocaleString()}k`
                : numericValue.toLocaleString();

            return `${selectedCurrency} ${displayValue}`;
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
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-32 h-72 w-72 rounded-full bg-secondary/[0.07] blur-[100px]"
      />

      <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/35 to-transparent" />

      <div className="relative z-20 flex flex-col gap-5 border-b border-border px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
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
              {selectedCurrency === "ALL"
                ? "Revenue by Currency"
                : `${selectedCurrency} Revenue Overview`}
            </h3>

            <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-muted-foreground/40">
              Last 6 months
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-5">
          {selectedCurrency !== "ALL" && (
            <div>
              <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
                Latest revenue
              </p>

              <p className="mt-1 text-xl font-semibold tracking-[-0.03em] text-heading">
                {formatCurrency(latestRevenue, selectedCurrency)}
              </p>
            </div>
          )}

          <div className="w-full sm:w-[180px]">
            <p className="mb-1.5 font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
              Display currency
            </p>

            <Select
              options={currencyOptions}
              value={selectedCurrency}
              onChange={onCurrencyChange}
              align="end"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 px-3 pb-4 pt-5 sm:px-5 lg:px-6">
        {selectedCurrency !== "ALL" && selectedSeries ? (
          <div className="relative h-[260px] w-full sm:h-[300px] lg:h-[340px]">
            <Line data={data} options={options} />
          </div>
        ) : (
          <div className="grid min-h-[260px] gap-3 py-4 sm:grid-cols-2 lg:min-h-[340px] lg:grid-cols-3">
            {revenue.length > 0 ? (
              revenue.map((series) => {
                const latest = series.points.at(-1)?.value ?? 0;

                return (
                  <div
                    key={series.currency}
                    className="flex flex-col justify-between border border-border bg-muted/[0.12] p-5"
                  >
                    <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-secondary">
                      {series.currency}
                    </span>

                    <div className="mt-6">
                      <p className="text-xl font-semibold tracking-[-0.03em] text-heading">
                        {formatCurrency(latest, series.currency)}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Paid this month
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center text-center">
                <p className="text-sm font-semibold text-heading">
                  No paid invoice revenue yet
                </p>

                <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                  Revenue will appear here when an invoice is marked as paid.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="relative z-10 grid border-t border-border bg-muted/20 sm:grid-cols-3">
        <FooterItem
          label={selectedCurrency === "ALL" ? "Totals" : "Six-month total"}
          value={
            selectedCurrency === "ALL"
              ? "Kept separate by currency"
              : formatCurrency(totalRevenue, selectedCurrency)
          }
        />

        <FooterItem
          label={selectedCurrency === "ALL" ? "Combined total" : "Trend"}
          value={
            selectedCurrency === "ALL"
              ? "Not calculated without FX rates"
              : isPositiveGrowth
                ? "Growing"
                : "Declining"
          }
          tone={
            selectedCurrency === "ALL"
              ? "muted"
              : isPositiveGrowth
                ? "success"
                : "danger"
          }
        />

        <FooterItem
          label="Dataset"
          value={
            selectedCurrency === "ALL"
              ? `${revenue.length} currenc${revenue.length === 1 ? "y" : "ies"}`
              : `${revenuePoints.length} monthly points`
          }
        />
      </div>
    </motion.section>
  );
};

function FooterItem({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "muted" | "success" | "danger";
}) {
  const toneClass = {
    default: "text-foreground",
    muted: "text-muted-foreground",
    success: "text-success",
    danger: "text-destructive",
  }[tone];

  return (
    <div className="flex items-center justify-between gap-4 border-t border-border px-5 py-3.5 first:border-t-0 sm:border-l sm:first:border-l-0 sm:first:border-t-0">
      <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
        {label}
      </span>

      <span className={`text-xs font-medium ${toneClass}`}>{value}</span>
    </div>
  );
}
