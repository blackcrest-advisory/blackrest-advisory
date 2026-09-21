import { Eye, MousePointerClick, Percent, X } from "lucide-react";

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
          Homepage popup analytics
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-body">
          Anonymous engagement totals for the business help popup. No contact or
          lead information is collected.
        </p>
      </header>

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
