"use client";

import { useState } from "react";
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
import { Select } from "@/components/ui/Select";

const periods = [
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 90 days" },
  { value: "year", label: "This year" },
];

// TODO: Replace this report data with aggregated lead, project, proposal, and invoice data from the backend.
const reportData = {
  revenue: "€84,500",
  revenueChange: 12.4,
  deals: 18,
  dealsChange: 20,
  conversion: "24.6%",
  conversionChange: 3.2,
  activeProjects: 27,
  activeProjectsChange: -6.8,
  revenueTrend: [48, 56, 52, 67, 63, 78, 86, 81, 93, 100, 96, 112],
  pipeline: [
    { label: "New leads", value: 96, amount: "€312k", color: "bg-secondary" },
    { label: "Qualified", value: 61, amount: "€205k", color: "bg-secondary/75" },
    { label: "Proposal sent", value: 34, amount: "€128k", color: "bg-secondary/55" },
    { label: "Won", value: 18, amount: "€84.5k", color: "bg-secondary/35" },
  ],
  services: [
    { service: "Website Development", leads: 34, won: 8, revenue: "€34,200", rate: "23.5%" },
    { service: "Digital Marketing", leads: 28, won: 6, revenue: "€21,800", rate: "21.4%" },
    { service: "Sales Support", leads: 21, won: 3, revenue: "€16,000", rate: "14.3%" },
    { service: "Mobile Applications", leads: 13, won: 1, revenue: "€12,500", rate: "7.7%" },
  ],
};

const stats = [
  { label: "Revenue", value: reportData.revenue, change: reportData.revenueChange, icon: CircleDollarSign, note: "vs previous period" },
  { label: "Deals won", value: reportData.deals, change: reportData.dealsChange, icon: Target, note: "vs previous period" },
  { label: "Lead conversion", value: reportData.conversion, change: reportData.conversionChange, icon: UsersRound, note: "vs previous period" },
  { label: "Active projects", value: reportData.activeProjects, change: reportData.activeProjectsChange, icon: BriefcaseBusiness, note: "vs previous period" },
];

export const ReportsDashboard = () => {
  const [period, setPeriod] = useState("30");
  const maxTrend = Math.max(...reportData.revenueTrend);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-secondary">
            <FileBarChart className="h-5 w-5" />
            <span className="text-sm font-semibold">Business intelligence</span>
          </div>
          <h1 className="mt-2 text-2xl font-semibold text-heading sm:text-3xl">Reports</h1>
          <p className="mt-1 text-sm text-body">Track revenue, pipeline health, service performance, and key operational signals.</p>
        </div>
        <div className="flex w-full gap-3 sm:w-auto">
          <Select options={periods} value={period} onChange={setPeriod} className="min-w-40 flex-1 sm:flex-none" />
          <Button variant="outline" size="base" onClick={() => toast.success("Your report export is being prepared.")}>
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const isPositive = stat.change >= 0;
          return <Card key={stat.label} padding="base"><div className="flex items-start justify-between"><div><p className="text-sm text-body">{stat.label}</p><p className="mt-2 text-2xl font-semibold text-heading">{stat.value}</p></div><div className="rounded-lg bg-secondary/10 p-2.5 text-secondary"><stat.icon className="h-5 w-5" /></div></div><p className={`mt-3 flex items-center gap-1 text-xs font-semibold ${isPositive ? "text-emerald-600" : "text-red-500"}`}>{isPositive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}{Math.abs(stat.change)}% <span className="font-normal text-body">{stat.note}</span></p></Card>;
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <Card padding="base" className="xl:col-span-3">
          <SectionHeading title="Revenue trend" detail="Monthly revenue over the selected period" />
          <div className="mt-6 flex h-56 items-end gap-2 sm:gap-3">
            {reportData.revenueTrend.map((amount, index) => <div key={index} className="group flex h-full flex-1 flex-col justify-end"><div className="relative rounded-t-md bg-secondary/80 transition-all hover:bg-secondary" style={{ height: `${(amount / maxTrend) * 100}%` }}><span className="absolute -top-7 left-1/2 hidden -translate-x-1/2 rounded bg-primary px-2 py-1 text-[10px] text-background group-hover:block">€{amount}k</span></div><span className="mt-2 text-center text-[10px] text-body">{index % 2 === 0 ? `M${index + 1}` : ""}</span></div>)}
          </div>
        </Card>

        <Card padding="base" className="xl:col-span-2">
          <SectionHeading title="Sales pipeline" detail="Lead volume and estimated value" />
          <div className="mt-6 space-y-4">{reportData.pipeline.map((stage) => <div key={stage.label}><div className="mb-1.5 flex justify-between text-sm"><span className="font-medium text-heading">{stage.label}</span><span className="text-body">{stage.value} · {stage.amount}</span></div><div className="h-2 overflow-hidden rounded-full bg-muted"><div className={`h-full rounded-full ${stage.color}`} style={{ width: `${stage.value}%` }} /></div></div>)}</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <Card padding="none" className="overflow-hidden xl:col-span-3">
          <div className="px-6 pt-6"><SectionHeading title="Service performance" detail="Which Blackcrest services are turning interest into revenue" /></div>
          <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead className="border-y border-border bg-muted/30 text-xs uppercase tracking-wide text-body"><tr><th className="px-6 py-3 font-semibold">Service</th><th className="px-4 py-3 font-semibold">Leads</th><th className="px-4 py-3 font-semibold">Won</th><th className="px-4 py-3 font-semibold">Conversion</th><th className="px-6 py-3 text-right font-semibold">Revenue</th></tr></thead><tbody className="divide-y divide-border">{reportData.services.map((service) => <tr key={service.service} className="hover:bg-muted/30"><td className="px-6 py-4 font-medium text-heading">{service.service}</td><td className="px-4 py-4 text-body">{service.leads}</td><td className="px-4 py-4 text-body">{service.won}</td><td className="px-4 py-4"><span className="rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-semibold text-secondary">{service.rate}</span></td><td className="px-6 py-4 text-right font-medium text-heading">{service.revenue}</td></tr>)}</tbody></table></div>
        </Card>

        <Card padding="base" className="xl:col-span-2">
          <SectionHeading title="Executive insights" detail="What deserves attention now" />
          <div className="mt-5 space-y-3">
            <Insight title="Revenue is ahead of plan" description="Revenue is up 12.4%, led by website development engagements." tone="positive" />
            <Insight title="Follow up on 12 qualified leads" description="These leads have been inactive for more than five days." tone="warning" />
            <Insight title="Mobile app conversion is low" description="Review qualification criteria and proposal positioning for this service." tone="neutral" />
          </div>
        </Card>
      </div>
    </div>
  );
};

const SectionHeading = ({ title, detail }: { title: string; detail: string }) => <div><h2 className="text-base font-semibold text-heading">{title}</h2><p className="mt-1 text-sm text-body">{detail}</p></div>;

const Insight = ({ title, description, tone }: { title: string; description: string; tone: "positive" | "warning" | "neutral" }) => <div className={`rounded-lg border p-4 ${tone === "positive" ? "border-emerald-500/25 bg-emerald-500/5" : tone === "warning" ? "border-secondary/30 bg-secondary/10" : "border-border bg-muted/35"}`}><p className="text-sm font-semibold text-heading">{title}</p><p className="mt-1 text-sm text-body">{description}</p></div>;
