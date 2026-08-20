import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import {
  ArrowLeft,
  CalendarDays,
  Download,
  FileText,
  ReceiptText,
  UserRound,
} from "lucide-react";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import { getClientInvoiceById } from "@/lib/data/invoices";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PrintButton } from "@/components/client-dashboard/invoices/PrintButton";

interface InvoiceDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

type InvoiceLineItem = {
  description?: React.ReactNode;
  amount?: React.ReactNode;
};

export default async function InvoiceDetailPage({
  params,
}: InvoiceDetailPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const { id } = await params;

  const invoice = await getClientInvoiceById(id);

  if (!invoice || invoice.project.userId !== user.id) {
    notFound();
  }

  const lineItems = invoice.lineItems as InvoiceLineItem[] | null;

  return (
    <div className="min-w-0 max-w-full space-y-6">
      {/*===== Back navigation =====*/}
      <div className="border-b border-border pb-5">
        <Link
          href="/client/dashboard/invoices"
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-heading"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Invoices
        </Link>
      </div>

      {/*===== Invoice header =====*/}
      <div className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
        <span className="absolute left-0 top-0 h-[2px] w-28 bg-secondary" />

        <div className="grid gap-6 border-b border-border px-5 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:px-8 lg:py-8">
          <div>
            <div className="flex items-center gap-3">
              <ReceiptText className="h-4 w-4 text-secondary" />

              <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
                Client Invoice
              </span>

              <span className="h-px w-10 bg-secondary/35" />
            </div>

            <div className="mt-4 flex flex-wrap items-end gap-x-4 gap-y-2">
              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-heading sm:text-4xl">
                Invoice
              </h1>

              <span className="pb-1 font-mono text-sm font-semibold text-muted-foreground">
                #{invoice.invoiceNumber}
              </span>
            </div>

            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
              Billing record for {invoice.project.title}.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end">
            <StatusBadge status={invoice.status.toLowerCase()} />

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarDays className="h-3.5 w-3.5 text-secondary" />
              Issued {format(new Date(invoice.createdAt), "MMM d, yyyy")}
            </div>
          </div>
        </div>

        {/*===== Invoice overview =====*/}
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          {/*===== Bill to =====*/}
          <div className="border-b border-border px-5 py-6 sm:px-6 lg:border-b-0 lg:border-r lg:px-8 lg:py-8">
            <div className="flex items-center gap-3">
              <UserRound className="h-4 w-4 text-secondary" />

              <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
                Bill To
              </span>
            </div>

            <div className="mt-5">
              <p className="text-base font-semibold text-heading">
                {invoice.project.user.name || invoice.project.user.email}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {invoice.project.user.email}
              </p>
            </div>

            <div className="mt-6 border-t border-border pt-4">
              <span className="font-mono text-[6px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/35">
                Project
              </span>

              <p className="mt-2 text-sm font-medium text-heading">
                {invoice.project.title}
              </p>
            </div>
          </div>

          {/*===== Invoice details =====*/}
          <div className="px-5 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4 text-secondary" />

              <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
                Invoice Details
              </span>
            </div>

            <div className="mt-5 divide-y divide-border">
              <DetailRow
                label="Invoice Date"
                value={format(new Date(invoice.createdAt), "MMM d, yyyy")}
              />

              <DetailRow
                label="Due Date"
                value={
                  invoice.dueDate
                    ? format(new Date(invoice.dueDate), "MMM d, yyyy")
                    : "—"
                }
              />

              <DetailRow label="Currency" value={invoice.currency} />

              {invoice.paidAt && (
                <DetailRow
                  label="Paid On"
                  value={format(new Date(invoice.paidAt), "MMM d, yyyy")}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/*===== Line items =====*/}
      <div className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
          <div>
            <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
              Line Items
            </span>

            <p className="mt-1 text-sm text-muted-foreground">
              Charges included in this invoice.
            </p>
          </div>

          <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/35">
            {invoice.currency}
          </span>
        </div>

        {/*===== Desktop line items =====*/}
        <div className="hidden overflow-x-auto sm:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/10">
                <th className="px-5 py-3 text-left font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40 sm:px-6">
                  Description
                </th>

                <th className="px-5 py-3 text-right font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40 sm:px-6">
                  Amount
                </th>
              </tr>
            </thead>

            <tbody>
              {lineItems && lineItems.length > 0 ? (
                lineItems.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-border last:border-b-0"
                  >
                    <td className="px-5 py-4 text-sm text-muted-foreground sm:px-6">
                      {item.description || (item as React.ReactNode)}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-right text-sm font-semibold text-heading sm:px-6">
                      {item.amount || invoice.amount} {invoice.currency}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border-b border-border">
                  <td className="px-5 py-4 text-sm text-muted-foreground sm:px-6">
                    {invoice.project.title}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-right text-sm font-semibold text-heading sm:px-6">
                    {invoice.amount} {invoice.currency}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/*===== Mobile line items =====*/}
        <div className="divide-y divide-border sm:hidden">
          {lineItems && lineItems.length > 0 ? (
            lineItems.map((item, index) => (
              <div key={index} className="px-5 py-4">
                <span className="font-mono text-[6px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/35">
                  Description
                </span>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description || (item as React.ReactNode)}
                </p>

                <div className="mt-4 flex items-center justify-between gap-4 border-t border-border pt-3">
                  <span className="font-mono text-[6px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/35">
                    Amount
                  </span>

                  <span className="text-sm font-semibold text-heading">
                    {item.amount || invoice.amount} {invoice.currency}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="px-5 py-4">
              <span className="font-mono text-[6px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/35">
                Description
              </span>

              <p className="mt-2 text-sm text-muted-foreground">
                {invoice.project.title}
              </p>

              <div className="mt-4 flex items-center justify-between gap-4 border-t border-border pt-3">
                <span className="font-mono text-[6px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/35">
                  Amount
                </span>

                <span className="text-sm font-semibold text-heading">
                  {invoice.amount} {invoice.currency}
                </span>
              </div>
            </div>
          )}
        </div>

        {/*===== Total =====*/}
        <div className="grid border-t-2 border-secondary bg-secondary/[0.04] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div className="px-5 py-4 sm:px-6">
            <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
              Invoice Total
            </span>
          </div>

          <div className="border-t border-border px-5 py-4 sm:border-l sm:border-t-0 sm:px-6">
            <p className="text-2xl font-semibold tracking-[-0.035em] text-secondary">
              {invoice.amount} {invoice.currency}
            </p>
          </div>
        </div>
      </div>

      {/*===== Notes =====*/}
      {invoice.notes && (
        <div className="border border-border bg-muted/15 px-5 py-5 sm:px-6">
          <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
            Notes
          </span>

          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
            {invoice.notes}
          </p>
        </div>
      )}

      {/*===== Actions =====*/}
      <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/35">
            Document actions
          </span>

          <p className="mt-1 text-sm text-muted-foreground">
            Download or print a copy of this invoice.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            href={`/api/invoices/${invoice.id}/pdf`}
            variant="primary"
            size="md"
            className="inline-flex items-center gap-2 !rounded-md"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>

          <PrintButton />
        </div>
      </div>
    </div>
  );
}

//===== Detail row =====//
function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-5 py-3 first:pt-0 last:pb-0">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>

      <span className="text-right text-sm font-medium text-heading">
        {value}
      </span>
    </div>
  );
}
