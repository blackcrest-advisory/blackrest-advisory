"use server";

import { LeadStatus, Pillar, ProjectStatus } from "@prisma/client";
import { prisma } from "@/lib/db/client";
import { getAdminUser } from "@/lib/utils/admin-utils";
import type {
  AdminReportsData,
  ReportPeriod,
} from "@/types/dashboard/admin/reportsType";

const serviceDefinitions = [
  { pillar: Pillar.WEBSITE_DEVELOPMENT, label: "Website Development" },
  { pillar: Pillar.DIGITAL_MARKETING, label: "Digital Marketing" },
  { pillar: Pillar.SALES_SUPPORT, label: "Sales Support" },
  { pillar: Pillar.MOBILE_APP, label: "Mobile Applications" },
] as const;

const wonStatuses: LeadStatus[] = [LeadStatus.WON, LeadStatus.CONVERTED];

function getPeriodDays(period: ReportPeriod) {
  if (period === "year") return 365;
  return Number(period);
}

function getChange(current: number, previous: number) {
  if (previous === 0) return null;
  return Number((((current - previous) / previous) * 100).toFixed(1));
}

function formatCurrencyTotals(
  invoices: Array<{ amount: number; currency: string }>,
) {
  const totals = invoices.reduce<Record<string, number>>((current, invoice) => {
    current[invoice.currency] =
      (current[invoice.currency] ?? 0) + invoice.amount;
    return current;
  }, {});

  const entries = Object.entries(totals);
  if (!entries.length) return "—";

  return entries
    .map(([currency, amount]) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(amount),
    )
    .join(" · ");
}

function getDateRange(period: ReportPeriod) {
  const now = new Date();
  const days = getPeriodDays(period);
  const start = new Date(now);
  start.setDate(start.getDate() - days);

  const previousStart = new Date(start);
  previousStart.setDate(previousStart.getDate() - days);

  return { now, start, previousStart, days };
}

function getTrend(
  start: Date,
  days: number,
  invoices: Array<{ paidAt: Date | null; amount: number; currency: string }>,
) {
  const bucketCount = 6;
  const bucketDays = Math.ceil(days / bucketCount);

  return Array.from({ length: bucketCount }, (_, index) => {
    const bucketStart = new Date(start);
    bucketStart.setDate(bucketStart.getDate() + index * bucketDays);
    const bucketEnd = new Date(bucketStart);
    bucketEnd.setDate(bucketEnd.getDate() + bucketDays);

    const bucketInvoices = invoices.filter(
      (invoice) =>
        invoice.paidAt &&
        invoice.paidAt >= bucketStart &&
        invoice.paidAt < bucketEnd,
    );

    return {
      label: new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
      }).format(bucketStart),
      value: bucketInvoices.reduce(
        (total, invoice) => total + invoice.amount,
        0,
      ),
      display: formatCurrencyTotals(bucketInvoices),
    };
  });
}

export async function getAdminReports(
  period: ReportPeriod = "30",
): Promise<AdminReportsData> {
  const admin = await getAdminUser();
  if (!admin) throw new Error("Unauthorized");

  const { now, start, previousStart, days } = getDateRange(period);
  const dateRange = { gte: start, lte: now };
  const previousDateRange = { gte: previousStart, lt: start };

  const [
    leads,
    previousLeads,
    paidInvoices,
    previousPaidInvoices,
    activeProjects,
    staleQualifiedLeads,
  ] = await Promise.all([
    prisma.lead.findMany({ where: { createdAt: dateRange } }),
    prisma.lead.findMany({ where: { createdAt: previousDateRange } }),
    prisma.invoice.findMany({
      where: { status: "PAID", paidAt: dateRange },
      select: {
        amount: true,
        currency: true,
        paidAt: true,
        project: {
          select: {
            proposal: { select: { brief: { select: { pillar: true } } } },
          },
        },
      },
    }),
    prisma.invoice.findMany({
      where: { status: "PAID", paidAt: previousDateRange },
      select: { amount: true, currency: true },
    }),
    prisma.project.count({
      where: {
        status: {
          in: [
            ProjectStatus.ACTIVE,
            ProjectStatus.PLANNING,
            ProjectStatus.IN_REVIEW,
          ],
        },
      },
    }),
    prisma.lead.count({
      where: {
        status: LeadStatus.QUALIFIED,
        updatedAt: { lte: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000) },
      },
    }),
  ]);

  const wonLeads = leads.filter((lead) => wonStatuses.includes(lead.status));
  const previousWonLeads = previousLeads.filter((lead) =>
    wonStatuses.includes(lead.status),
  );
  const revenueValue = paidInvoices.reduce(
    (total, invoice) => total + invoice.amount,
    0,
  );
  const previousRevenueValue = previousPaidInvoices.reduce(
    (total, invoice) => total + invoice.amount,
    0,
  );
  const conversion = leads.length ? (wonLeads.length / leads.length) * 100 : 0;
  const previousConversion = previousLeads.length
    ? (previousWonLeads.length / previousLeads.length) * 100
    : 0;

  const pipelineStages: Array<{ label: string; statuses: LeadStatus[] }> = [
    { label: "New leads", statuses: [LeadStatus.NEW, LeadStatus.CONTACTED] },
    { label: "Qualified", statuses: [LeadStatus.QUALIFIED] },
    {
      label: "Proposal sent",
      statuses: [LeadStatus.PROPOSAL_SENT, LeadStatus.NEGOTIATION],
    },
    { label: "Won", statuses: wonStatuses },
  ];

  const services = serviceDefinitions.map(({ pillar, label }) => {
    const serviceLeads = leads.filter((lead) => lead.pillar === pillar);
    const serviceWon = serviceLeads.filter((lead) =>
      wonStatuses.includes(lead.status),
    );
    const serviceInvoices = paidInvoices.filter(
      (invoice) => invoice.project.proposal.brief.pillar === pillar,
    );

    return {
      service: label,
      leads: serviceLeads.length,
      won: serviceWon.length,
      revenue: formatCurrencyTotals(serviceInvoices),
      rate: serviceLeads.length
        ? `${((serviceWon.length / serviceLeads.length) * 100).toFixed(1)}%`
        : "—",
    };
  });

  const lowestConversionService = services
    .filter((service) => service.leads > 0)
    .sort((first, second) => {
      const firstRate = first.won / first.leads;
      const secondRate = second.won / second.leads;
      return firstRate - secondRate;
    })[0];

  const insights: AdminReportsData["insights"] = [
    {
      title:
        revenueValue > previousRevenueValue
          ? "Revenue increased"
          : "Revenue needs attention",
      description: `Paid invoice revenue is ${formatCurrencyTotals(paidInvoices)} for the selected ${days}-day period.`,
      tone: revenueValue > previousRevenueValue ? "positive" : "neutral",
    },
    {
      title: staleQualifiedLeads
        ? "Qualified leads need follow-up"
        : "Qualified lead follow-up is current",
      description: staleQualifiedLeads
        ? `${staleQualifiedLeads} qualified lead${staleQualifiedLeads === 1 ? " has" : "s have"} not been updated in five days.`
        : "No qualified leads have been waiting for an update for more than five days.",
      tone: staleQualifiedLeads ? "warning" : "positive",
    },
    {
      title: lowestConversionService
        ? `${lowestConversionService.service} has the lowest conversion`
        : "No service conversion data yet",
      description: lowestConversionService
        ? `${lowestConversionService.won} of ${lowestConversionService.leads} leads converted during this period.`
        : "Service conversion insights will appear after leads are assigned to a service.",
      tone: "neutral",
    },
  ];

  return {
    revenue: formatCurrencyTotals(paidInvoices),
    revenueChange: getChange(revenueValue, previousRevenueValue),
    deals: wonLeads.length,
    dealsChange: getChange(wonLeads.length, previousWonLeads.length),
    conversion: `${conversion.toFixed(1)}%`,
    conversionChange: previousLeads.length
      ? Number((conversion - previousConversion).toFixed(1))
      : null,
    activeProjects,
    revenueTrend: getTrend(start, days, paidInvoices),
    pipeline: pipelineStages.map((stage) => {
      const count = leads.filter((lead) =>
        stage.statuses.includes(lead.status),
      ).length;
      return {
        label: stage.label,
        count,
        percentage: leads.length ? (count / leads.length) * 100 : 0,
      };
    }),
    services,
    insights,
  };
}
