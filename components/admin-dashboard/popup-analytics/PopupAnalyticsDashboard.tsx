import Link from "next/link";
import { Eye, MousePointerClick, Percent, X, Send } from "lucide-react";

import { Card } from "@/components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import type { getPopupAnalytics } from "@/lib/actions/popup-analytics/popup-analytics.action";

type PopupAnalytics = Awaited<ReturnType<typeof getPopupAnalytics>>;

export function PopupAnalyticsDashboard({
  analytics,
}: {
  analytics: PopupAnalytics;
}) {
  const formStats = [
    { label: "Visitors who saw the form", value: analytics.form.totalViews.toLocaleString(), note: "Unique browsers", icon: Eye },
    { label: "Enquiries received", value: analytics.form.totalSubmissions.toLocaleString(), note: "Successfully saved leads", icon: Send },
    { label: "Visitors who dismissed", value: analytics.form.totalDismissals.toLocaleString(), note: "May submit on a later visit", icon: X },
    { label: "Submission rate", value: analytics.form.submissionRate + "%", note: "Submitted visitors ? form viewers", icon: Percent },
  ];
  const stats = [
    {
      label: "Visitors who saw it",
      value: analytics.totalViews.toLocaleString(),
      note: "Unique anonymous browsers",
      icon: Eye,
    },
    {
      label: "Visitors who clicked",
      value: analytics.totalClicks.toLocaleString(),
      note: `${analytics.clickRate}% of viewers`,
      icon: MousePointerClick,
    },
    {
      label: "Visitors who dismissed",
      value: analytics.totalDismissals.toLocaleString(),
      note: `${analytics.dismissRate}% of viewers`,
      icon: X,
    },
    {
      label: "Click-through rate",
      value: `${analytics.clickRate}%`,
      note: "Selected any interest",
      icon: Percent,
    },
  ];

  return (
    <div className="space-y-6">
      <header className="border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
          Insights
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-heading sm:text-3xl">
          Homepage enquiry analytics
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-body">
          Enquiry form performance. Counts represent browsers, not individual people.
          Contact details and business requirements are available in Leads.
        </p>
      </header>

      <section aria-label="Enquiry form performance" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {formStats.map((stat) => {
          const Icon = stat.icon;
          return <Card key={stat.label}>
            <div className="flex items-center gap-2 text-sm text-body"><Icon className="h-4 w-4 text-secondary" aria-hidden="true" />{stat.label}</div>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-heading">{stat.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.note}</p>
          </Card>;
        })}
      </section>
      <Link href="/admin/dashboard/leads" className="inline-flex min-h-10 items-center text-sm font-semibold text-secondary underline underline-offset-4">View enquiries in Leads ?</Link>
      <div className="border-t border-border pt-6">
        <h2 className="text-lg font-semibold text-heading">Previous option popup ? historical data</h2>
        <p className="mt-2 text-sm text-body">The counts below belong to the previous popup and are separate from the enquiry form.</p>
      </div>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.label}>
              <div className="flex items-center gap-2 text-sm text-body">
                <Icon className="h-4 w-4 text-secondary" aria-hidden="true" />
                {stat.label}
              </div>
              <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-heading">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.note}</p>
            </Card>
          );
        })}
      </section>

      <Card padding="none">
        <div className="border-b border-border px-5 py-5 sm:px-6">
          <h2 className="text-lg font-semibold text-heading">
            Business and service interests
          </h2>
          <p className="mt-1 text-sm text-body">
            Unique visitors who selected each popup option.
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Popup option</TableHead>
              <TableHead className="text-right">Visitors</TableHead>
              <TableHead className="text-right">Share of selections</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {analytics.interests.map((interest) => (
              <TableRow key={interest.id}>
                <TableCell className="font-medium text-heading">
                  {interest.label}
                </TableCell>
                <TableCell className="text-right">
                  {interest.count.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {interest.percentage}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
