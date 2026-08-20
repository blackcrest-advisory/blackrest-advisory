"use client";

//===== imports =====//
import { useState, useTransition } from "react";
import { motion, useReducedMotion } from "framer-motion";
import toast from "react-hot-toast";
import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CircleDollarSign,
  Download,
  FileBarChart,
  Gauge,
  Target,
  TrendingUp,
  UsersRound,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";

import { getAdminReports } from "@/lib/actions/reports/report.action";

import { fadeInUp, staggerContainer } from "@/lib/utils/animations";

import type {
  AdminReportsData,
  ReportPeriod,
} from "@/types/dashboard/admin/reportsType";

//===== periods =====//
const periods = [
  {
    value: "30",
    label: "Last 30 days",
  },
  {
    value: "90",
    label: "Last 90 days",
  },
  {
    value: "year",
    label: "This year",
  },
];

//==============================================================//
// REPORTS DASHBOARD
//==============================================================//

export function ReportsDashboard({
  initialData,
}: {
  initialData: AdminReportsData;
}) {
  //===== state =====//
  const [period, setPeriod] = useState<ReportPeriod>("30");

  const [reportData, setReportData] = useState(initialData);

  const [isPending, startTransition] = useTransition();

  const shouldReduceMotion = useReducedMotion();

  //===== revenue trend max =====//
  const maxTrend = Math.max(
    ...reportData.revenueTrend.map((point) => point.value),
    1,
  );

  //===== stats =====//
  const stats = [
    {
      label: "Revenue",
      value: reportData.revenue,
      change: reportData.revenueChange,
      icon: CircleDollarSign,
      note: "vs previous period",
      tone: "default" as const,
    },
    {
      label: "Deals won",
      value: reportData.deals,
      change: reportData.dealsChange,
      icon: Target,
      note: "vs previous period",
      tone: "success" as const,
    },
    {
      label: "Lead conversion",
      value: reportData.conversion,
      change: reportData.conversionChange,
      icon: UsersRound,
      note: "vs previous period",
      tone: "info" as const,
    },
    {
      label: "Active projects",
      value: reportData.activeProjects,
      change: null,
      icon: BriefcaseBusiness,
      note: "current workload",
      tone: "warning" as const,
    },
  ];

  //===== period =====//
  const handlePeriodChange = (value: string) => {
    const nextPeriod = value as ReportPeriod;

    setPeriod(nextPeriod);

    startTransition(async () => {
      try {
        setReportData(await getAdminReports(nextPeriod));
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Unable to load report data",
        );
      }
    });
  };

  //===== export =====//
  const exportReport = () => {
    const csv = [
      ["Service", "Leads", "Won", "Conversion", "Paid revenue"],
      ...reportData.services.map((service) => [
        service.service,
        service.leads,
        service.won,
        service.rate,
        service.revenue,
      ]),
    ]
      .map((row) =>
        row
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(","),
      )
      .join("\n");

    const url = URL.createObjectURL(
      new Blob([csv], {
        type: "text/csv;charset=utf-8",
      }),
    );

    const link = document.createElement("a");

    link.href = url;
    link.download = `blackcrest-report-${period}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative min-w-0 max-w-full space-y-6">
      {/* ====================================================== */}
      {/* EXECUTIVE INTELLIGENCE HEADER                         */}
      {/* ====================================================== */}

      <motion.header
        variants={shouldReduceMotion ? undefined : fadeInUp}
        initial={shouldReduceMotion ? undefined : "hidden"}
        animate={shouldReduceMotion ? undefined : "visible"}
        className="relative border border-border bg-card shadow-[var(--shadow-card)]"
      >
        {/* architectural rail */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 top-0 w-[3px] bg-gradient-to-b from-secondary via-secondary/55 to-secondary/10"
        />

        {/* ambient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-secondary/[0.055] blur-[110px]"
        />

        <div
          className="relative z-10 grid gap-7 px-6 py-7 sm:px-7 lg:px-9 lg:py-8 xl:grid-cols-[minmax(0,1fr)_330px]"
        >
          {/* ================================================== */}
          {/* TITLE                                              */}
          {/* ================================================== */}

          <div className="min-w-0">
            <div
              className="flex flex-wrap items-center gap-3"
            >
              <FileBarChart className="h-3.5 w-3.5 text-secondary" />

              <span
                className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary"
              >
                Executive intelligence
              </span>

              <span className="h-px w-9 bg-secondary/30" />

              <span
                className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground/40"
              >
                Performance brief
              </span>
            </div>

            <h1
              className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-heading sm:text-[38px] lg:text-[42px]"
            >
              Reports
            </h1>

            <p
              className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground"
            >
              Track paid revenue, lead conversion, service performance, and
              operational signals across the business.
            </p>

            <div
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <span className="h-px w-10 bg-secondary/40" />

              <span
                className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/40"
              >
                Business performance index
              </span>
            </div>
          </div>

          {/* ================================================== */}
          {/* REPORT CONTROL                                     */}
          {/* ================================================== */}

          <div
            className="border-t border-border pt-5 xl:border-l xl:border-t-0 xl:pl-7 xl:pt-0"
          >
            <div>
              <span
                className="font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/40"
              >
                Reporting window
              </span>

              <p
                className="mt-2 text-xs leading-5 text-muted-foreground"
              >
                Adjust the reporting period or export the current
                service-performance dataset.
              </p>
            </div>

            <div className="mt-5 space-y-3">
              <Select
                options={periods}
                value={period}
                onChange={handlePeriodChange}
                className="w-full"
              />

              <Button
                variant="outline"
                size="sm"
                onClick={exportReport}
                disabled={isPending}
                className="w-full !rounded-md justify-between"
              >
                <span>Export CSV</span>

                <Download className="h-3.5 w-3.5" />
              </Button>
            </div>

            <div
              className="mt-5 flex items-center gap-2 border-t border-border pt-4"
            >
              <span
                className={`
                  h-1.5 w-1.5
                  rounded-full

                  ${isPending ? "animate-pulse bg-warning" : "bg-success"}
                `}
              />

              <span
                className="font-mono text-[7px] uppercase tracking-[0.13em] text-muted-foreground/40"
              >
                {isPending ? "Refreshing intelligence" : "Report current"}
              </span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ====================================================== */}
      {/* KPI STRIP                                             */}
      {/* ====================================================== */}

      <motion.section
        variants={shouldReduceMotion ? undefined : staggerContainer}
        initial={shouldReduceMotion ? undefined : "hidden"}
        animate={shouldReduceMotion ? undefined : "visible"}
        className="overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
      >
        <div
          className="grid sm:grid-cols-2 xl:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="border-b border-border px-5 py-5 sm:border-r xl:border-b-0 xl:last:border-r-0"
            >
              <ReportMetric {...stat} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ====================================================== */}
      {/* ANALYTICAL CANVAS                                     */}
      {/* ====================================================== */}

      <motion.section
        variants={shouldReduceMotion ? undefined : fadeInUp}
        initial={shouldReduceMotion ? undefined : "hidden"}
        animate={shouldReduceMotion ? undefined : "visible"}
        className="grid min-w-0 max-w-full gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.45fr)]"
      >
        {/* ==================================================== */}
        {/* REVENUE TREND                                       */}
        {/* ==================================================== */}

        <div
          className="relative min-w-0 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
        >
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 h-[2px] w-28 bg-secondary/50"
          />

          <PanelHeader
            eyebrow="Financial movement"
            title="Revenue trend"
            detail="Paid invoice revenue; currencies are shown separately in each data point."
            icon={TrendingUp}
          />

          <div
            className="px-5 pb-5 pt-3 sm:px-6 sm:pb-6"
          >
            <div
              className="relative h-64 border-b border-l border-border px-3 pt-5 sm:h-72 sm:px-5"
            >
              {/* horizontal guides */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex flex-col justify-between py-5"
              >
                {Array.from({
                  length: 5,
                }).map((_, index) => (
                  <span
                    key={index}
                    className="block h-px w-full bg-border/55"
                  />
                ))}
              </div>

              <div
                className="relative z-10 flex h-full items-end gap-2 sm:gap-3"
              >
                {reportData.revenueTrend.map((point) => (
                  <div
                    key={point.label}
                    className="group flex h-full min-w-0 flex-1 flex-col justify-end"
                  >
                    <div
                      className="relative min-h-[2px] bg-gradient-to-t from-secondary to-secondary/55 transition-[filter] group-hover:brightness-110"
                      style={{
                        height: `${(point.value / maxTrend) * 100}%`,
                      }}
                    >
                      <span
                        className="absolute -top-8 left-1/2 z-20 hidden w-max -translate-x-1/2 rounded-md border border-border bg-primary px-2 py-1 text-[10px] font-medium text-primary-foreground shadow-[var(--shadow-overlay)] group-hover:block"
                      >
                        {point.display}
                      </span>
                    </div>

                    <span
                      className="mt-2 truncate text-center font-mono text-[7px] uppercase tracking-[0.08em] text-muted-foreground/45"
                    >
                      {point.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="mt-4 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />

                <span
                  className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/40"
                >
                  Paid revenue series
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* SALES PIPELINE                                      */}
        {/* ==================================================== */}

        <div
          className="min-w-0 border border-border bg-card shadow-[var(--shadow-card)]"
        >
          <PanelHeader
            eyebrow="Commercial funnel"
            title="Sales pipeline"
            detail="Lead volume during the selected period."
            icon={Target}
          />

          <div
            className="space-y-5 px-5 py-5 sm:px-6"
          >
            {reportData.pipeline.map((stage, index) => (
              <div
                key={stage.label}
                className="border-b border-border pb-4 last:border-b-0 last:pb-0"
              >
                <div
                  className="flex items-start gap-3"
                >
                  <span
                    className="mt-0.5 w-6 shrink-0 font-mono text-[8px] font-semibold text-secondary/40"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div
                      className="flex items-center justify-between gap-3"
                    >
                      <span
                        className="text-xs font-semibold text-heading"
                      >
                        {stage.label}
                      </span>

                      <span
                        className="text-[10px] text-muted-foreground"
                      >
                        {stage.count} leads
                      </span>
                    </div>

                    <div
                      className="mt-2.5 h-1.5 overflow-hidden bg-muted"
                    >
                      <div
                        className="h-full bg-secondary"
                        style={{
                          width: `${stage.percentage}%`,
                        }}
                      />
                    </div>

                    <p
                      className="mt-1.5 text-right font-mono text-[7px] text-muted-foreground/40"
                    >
                      {stage.percentage}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ====================================================== */}
      {/* BUSINESS INTELLIGENCE                                 */}
      {/* ====================================================== */}

      <motion.section
        variants={shouldReduceMotion ? undefined : fadeInUp}
        initial={shouldReduceMotion ? undefined : "hidden"}
        animate={shouldReduceMotion ? undefined : "visible"}
        className="grid min-w-0 max-w-full gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.45fr)]"
      >
        {/* ==================================================== */}
        {/* SERVICE PERFORMANCE                                 */}
        {/* ==================================================== */}

        <div
          className="relative min-w-0 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
        >
          <PanelHeader
            eyebrow="Portfolio intelligence"
            title="Service performance"
            detail="Leads and paid invoice revenue grouped by the selected service."
            icon={BriefcaseBusiness}
          />

          {/* desktop */}
          <div className="hidden min-w-0 max-w-full overflow-x-auto lg:block">
            <table
              className="w-full min-w-[620px] border-collapse text-left"
            >
              <thead
                className="border-y border-border bg-muted/15"
              >
                <tr>
                  <TableHeading>Service</TableHeading>

                  <TableHeading>Leads</TableHeading>

                  <TableHeading>Won</TableHeading>

                  <TableHeading>Conversion</TableHeading>

                  <TableHeading align="right">Paid revenue</TableHeading>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {reportData.services.map((service) => (
                  <tr
                    key={service.service}
                    className="transition-colors hover:bg-secondary/[0.02]"
                  >
                    <td
                      className="px-6 py-4 text-sm font-semibold text-heading"
                    >
                      {service.service}
                    </td>

                    <td
                      className="px-4 py-4 text-sm text-muted-foreground"
                    >
                      {service.leads}
                    </td>

                    <td
                      className="px-4 py-4 text-sm text-muted-foreground"
                    >
                      {service.won}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className="inline-flex border-l-2 border-secondary bg-secondary/[0.055] px-2.5 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.08em] text-secondary"
                      >
                        {service.rate}
                      </span>
                    </td>

                    <td
                      className="px-6 py-4 text-right text-sm font-semibold text-heading"
                    >
                      {service.revenue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* mobile + tablet */}
          <div className="divide-y divide-border lg:hidden">
            {reportData.services.map((service, index) => (
              <article
                key={service.service}
                className="px-5 py-5 sm:px-6"
              >
                <div
                  className="flex items-start gap-3"
                >
                  <span
                    className="w-6 shrink-0 font-mono text-[8px] font-semibold text-secondary/40"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3
                      className="text-sm font-semibold text-heading"
                    >
                      {service.service}
                    </h3>

                    <div
                      className="mt-4 grid grid-cols-2 gap-3"
                    >
                      <ServiceRecord
                        label="Leads"
                        value={String(service.leads)}
                      />

                      <ServiceRecord label="Won" value={String(service.won)} />

                      <ServiceRecord label="Conversion" value={service.rate} />

                      <ServiceRecord
                        label="Paid revenue"
                        value={service.revenue}
                      />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div
            className="flex items-center justify-between gap-4 border-t border-border bg-muted/10 px-5 py-3 sm:px-6"
          >
            <span
              className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/40"
            >
              Service-level intelligence
            </span>

            <span
              className="text-xs text-muted-foreground"
            >
              <span
                className="font-semibold text-heading"
              >
                {reportData.services.length}
              </span>{" "}
              services
            </span>
          </div>
        </div>

        {/* ==================================================== */}
        {/* EXECUTIVE INSIGHTS                                  */}
        {/* ==================================================== */}

        <div
          className="min-w-0 border border-border bg-card shadow-[var(--shadow-card)]"
        >
          <PanelHeader
            eyebrow="Decision signals"
            title="Executive insights"
            detail="Signals derived from your current records."
            icon={Gauge}
          />

          <div
            className="divide-y divide-border"
          >
            {reportData.insights.map((insight, index) => (
              <Insight key={insight.title} index={index} {...insight} />
            ))}
          </div>

          <div
            className="flex items-center gap-2 border-t border-border bg-muted/10 px-5 py-3 sm:px-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-success" />

            <span
              className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/40"
            >
              Intelligence signals available
            </span>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

//==============================================================//
// REPORT METRIC
//==============================================================//

function ReportMetric({
  label,
  value,
  change,
  icon: Icon,
  note,
  tone,
}: {
  label: string;
  value: string | number;
  change: number | null;
  icon: typeof CircleDollarSign;
  note: string;
  tone: "default" | "success" | "info" | "warning";
}) {
  const tones = {
    default: "border-secondary/15 bg-secondary/[0.05] text-secondary",

    success: "border-success/20 bg-success/[0.05] text-success",

    info: "border-info/20 bg-info/[0.05] text-info",

    warning: "border-warning/20 bg-warning/[0.05] text-warning",
  };

  return (
    <div
      className="flex items-start justify-between gap-4"
    >
      <div className="min-w-0">
        <span
          className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40"
        >
          {label}
        </span>

        <p
          className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-heading"
        >
          {value}
        </p>

        <ChangeDetail change={change} note={note} />
      </div>

      <div
        className={`
          flex h-9 w-9
          shrink-0
          items-center
          justify-center
          rounded-md
          border
          ${tones[tone]}
        `}
      >
        <Icon className="h-4 w-4" />
      </div>
    </div>
  );
}

//==============================================================//
// CHANGE DETAIL
//==============================================================//

function ChangeDetail({
  change,
  note,
}: {
  change: number | null;
  note: string;
}) {
  if (change === null) {
    return (
      <p
        className="mt-2 text-[10px] text-muted-foreground"
      >
        {note}
      </p>
    );
  }

  const isPositive = change >= 0;

  return (
    <p
      className={`
        mt-2
        flex
        items-center
        gap-1
        text-[10px]
        font-semibold

        ${isPositive ? "text-success" : "text-destructive"}
      `}
    >
      {isPositive ? (
        <ArrowUpRight className="h-3 w-3" />
      ) : (
        <ArrowDownRight className="h-3 w-3" />
      )}
      {Math.abs(change)}%
      <span
        className="font-normal text-muted-foreground"
      >
        {note}
      </span>
    </p>
  );
}

//==============================================================//
// PANEL HEADER
//==============================================================//

function PanelHeader({
  eyebrow,
  title,
  detail,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  detail: string;
  icon: typeof TrendingUp;
}) {
  return (
    <div
      className="flex items-start gap-3 border-b border-border px-5 py-4 sm:px-6"
    >
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-secondary"
      >
        <Icon className="h-4 w-4" />
      </div>

      <div>
        <span
          className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary"
        >
          {eyebrow}
        </span>

        <h2
          className="mt-1 text-base font-semibold text-heading"
        >
          {title}
        </h2>

        <p
          className="mt-1 max-w-xl text-xs leading-5 text-muted-foreground"
        >
          {detail}
        </p>
      </div>
    </div>
  );
}

//==============================================================//
// TABLE HEADING
//==============================================================//

function TableHeading({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`
        px-4 py-3
        font-mono
        text-[7px]
        font-semibold
        uppercase
        tracking-[0.14em]
        text-muted-foreground/45

        ${align === "right" ? "px-6 text-right" : ""}
      `}
    >
      {children}
    </th>
  );
}

//==============================================================//
// SERVICE RECORD
//==============================================================//

function ServiceRecord({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="min-w-0 border border-border bg-background/30 p-3"
    >
      <span
        className="font-mono text-[7px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/40"
      >
        {label}
      </span>

      <p
        className="mt-1.5 truncate text-xs font-semibold text-heading"
        title={value}
      >
        {value}
      </p>
    </div>
  );
}

//==============================================================//
// INSIGHT
//==============================================================//

function Insight({
  title,
  description,
  tone,
  index,
}: AdminReportsData["insights"][number] & {
  index: number;
}) {
  const toneClasses = {
    positive: "border-success bg-success/[0.025]",

    warning: "border-warning bg-warning/[0.025]",

    neutral: "border-border bg-background/20",
  };

  const dotClasses = {
    positive: "bg-success",
    warning: "bg-warning",
    neutral: "bg-muted-foreground/40",
  };

  return (
    <div
      className="px-5 py-5 sm:px-6"
    >
      <div
        className={`
          border-l-2
          pl-4
          ${toneClasses[tone]}
        `}
      >
        <div
          className="flex items-start justify-between gap-3"
        >
          <div className="min-w-0">
            <span
              className="font-mono text-[7px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/35"
            >
              Signal {String(index + 1).padStart(2, "0")}
            </span>

            <p
              className="mt-1 text-sm font-semibold text-heading"
            >
              {title}
            </p>
          </div>

          <span
            className={`
              mt-1
              h-1.5 w-1.5
              shrink-0
              rounded-full
              ${dotClasses[tone]}
            `}
          />
        </div>

        <p
          className="mt-2 text-xs leading-5 text-muted-foreground"
        >
          {description}
        </p>
      </div>
    </div>
  );
}
