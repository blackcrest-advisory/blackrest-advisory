"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CircleDollarSign,
  Download,
  FileBarChart,
  Target,
  UsersRound,
} from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Select } from "@/components/ui/Select";
import { getAdminReports } from "@/lib/actions/reports/report.action";
import { fadeInUp, hoverScale, staggerContainer } from "@/lib/utils/animations";
import type {
  AdminReportsData,
  ReportPeriod,
} from "@/types/dashboard/admin/reportsType";

const periods = [
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 90 days" },
  { value: "year", label: "This year" },
];

export function ReportsDashboard({
  initialData,
}: {
  initialData: AdminReportsData;
}) {
  const [period, setPeriod] = useState<ReportPeriod>("30");
  const [reportData, setReportData] = useState(initialData);
  const [isPending, startTransition] = useTransition();
  const maxTrend = Math.max(
    ...reportData.revenueTrend.map((point) => point.value),
    1,
  );
  const stats = [
    {
      label: "Revenue",
      value: reportData.revenue,
      change: reportData.revenueChange,
      icon: CircleDollarSign,
      note: "vs previous period",
    },
    {
      label: "Deals won",
      value: reportData.deals,
      change: reportData.dealsChange,
      icon: Target,
      note: "vs previous period",
    },
    {
      label: "Lead conversion",
      value: reportData.conversion,
      change: reportData.conversionChange,
      icon: UsersRound,
      note: "vs previous period",
    },
    {
      label: "Active projects",
      value: reportData.activeProjects,
      change: null,
      icon: BriefcaseBusiness,
      note: "current workload",
    },
  ];

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
      new Blob([csv], { type: "text/csv;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `blackcrest-report-${period}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PageWrapper>
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <div className="flex flex-col gap-6">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-secondary">
                  <FileBarChart className="h-5 w-5" />
                  <span className="text-sm font-semibold">
                    Business intelligence
                  </span>
                </div>
                <h1 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
                  Reports
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Track paid revenue, lead conversion, service performance, and
                  operational signals.
                </p>
              </div>
              <div className="flex w-full gap-3 sm:w-auto">
                <Select
                  options={periods}
                  value={period}
                  onChange={handlePeriodChange}
                  className="min-w-40 flex-1 sm:flex-none"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportReport}
                  disabled={isPending}
                >
                  <Download className="h-4 w-4" /> Export
                </Button>
              </div>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  {...hoverScale}
                >
                  <Card padding="base" hoverEffect>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {stat.label}
                        </p>
                        <p className="mt-2 text-2xl font-semibold text-foreground">
                          {stat.value}
                        </p>
                      </div>
                      <div className="rounded-lg bg-secondary/10 p-2.5 text-secondary">
                        <stat.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <ChangeDetail change={stat.change} note={stat.note} />
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-6 xl:grid-cols-5"
            >
              <Card padding="base" hoverEffect className="xl:col-span-3">
                <SectionHeading
                  title="Revenue trend"
                  detail="Paid invoice revenue; currencies are shown separately in each data point."
                />
                <div className="mt-6 flex h-56 items-end gap-2 sm:gap-3">
                  {reportData.revenueTrend.map((point) => (
                    <div
                      key={point.label}
                      className="group flex h-full flex-1 flex-col justify-end"
                    >
                      <div
                        className="relative rounded-t-md bg-secondary/80 transition-all hover:bg-secondary"
                        style={{ height: `${(point.value / maxTrend) * 100}%` }}
                      >
                        <span className="absolute -top-7 left-1/2 hidden w-max -translate-x-1/2 rounded bg-primary px-2 py-1 text-[10px] text-primary-foreground group-hover:block">
                          {point.display}
                        </span>
                      </div>
                      <span className="mt-2 text-center text-[10px] text-muted-foreground">
                        {point.label}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
              <Card padding="base" hoverEffect className="xl:col-span-2">
                <SectionHeading
                  title="Sales pipeline"
                  detail="Lead volume during the selected period"
                />
                <div className="mt-6 space-y-4">
                  {reportData.pipeline.map((stage) => (
                    <div key={stage.label}>
                      <div className="mb-1.5 flex justify-between text-sm">
                        <span className="font-medium text-foreground">
                          {stage.label}
                        </span>
                        <span className="text-muted-foreground">
                          {stage.count} leads
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-secondary"
                          style={{ width: `${stage.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-6 xl:grid-cols-5"
            >
              <Card
                padding="none"
                hoverEffect
                className="overflow-hidden xl:col-span-3"
              >
                <div className="px-6 pt-6">
                  <SectionHeading
                    title="Service performance"
                    detail="Leads and paid invoice revenue grouped by the selected service."
                  />
                </div>
                <div className="mt-5 overflow-x-auto">
                  <table className="w-full min-w-[620px] text-left text-sm">
                    <thead className="border-y border-border bg-muted/30 text-xs uppercase tracking-wide text-muted-foreground">
                      <tr>
                        <th className="px-6 py-3 font-semibold">Service</th>
                        <th className="px-4 py-3 font-semibold">Leads</th>
                        <th className="px-4 py-3 font-semibold">Won</th>
                        <th className="px-4 py-3 font-semibold">Conversion</th>
                        <th className="px-6 py-3 text-right font-semibold">
                          Paid revenue
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {reportData.services.map((service) => (
                        <tr key={service.service} className="hover:bg-muted/30">
                          <td className="px-6 py-4 font-medium text-foreground">
                            {service.service}
                          </td>
                          <td className="px-4 py-4 text-muted-foreground">
                            {service.leads}
                          </td>
                          <td className="px-4 py-4 text-muted-foreground">
                            {service.won}
                          </td>
                          <td className="px-4 py-4">
                            <span className="rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-semibold text-secondary">
                              {service.rate}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right font-medium text-foreground">
                            {service.revenue}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
              <Card padding="base" hoverEffect className="xl:col-span-2">
                <SectionHeading
                  title="Executive insights"
                  detail="Signals derived from your current records"
                />
                <div className="mt-5 space-y-3">
                  {reportData.insights.map((insight) => (
                    <Insight key={insight.title} {...insight} />
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}

function ChangeDetail({
  change,
  note,
}: {
  change: number | null;
  note: string;
}) {
  if (change === null)
    return <p className="mt-3 text-xs text-muted-foreground">{note}</p>;
  const isPositive = change >= 0;
  return (
    <p
      className={`mt-3 flex items-center gap-1 text-xs font-semibold ${isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}`}
    >
      {isPositive ? (
        <ArrowUpRight className="h-3.5 w-3.5" />
      ) : (
        <ArrowDownRight className="h-3.5 w-3.5" />
      )}
      {Math.abs(change)}%{" "}
      <span className="font-normal text-muted-foreground">{note}</span>
    </p>
  );
}

function SectionHeading({ title, detail }: { title: string; detail: string }) {
  return (
    <div>
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
    </div>
  );
}

function Insight({
  title,
  description,
  tone,
}: AdminReportsData["insights"][number]) {
  const toneClasses = {
    positive:
      "border-emerald-500/25 bg-emerald-500/5 dark:border-emerald-400/30 dark:bg-emerald-500/10",
    warning:
      "border-secondary/30 bg-secondary/10 dark:border-secondary/40 dark:bg-secondary/20",
    neutral: "border-border bg-muted/35 dark:border-border/50 dark:bg-muted/20",
  };
  return (
    <div className={`rounded-lg border p-4 ${toneClasses[tone]}`}>
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
