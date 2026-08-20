"use client";

//===== imports =====//
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Banknote,
  CircleDollarSign,
  Download,
  FileText,
  ReceiptText,
  Search,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { StatusBadge } from "@/components/ui/StatusBadge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

import { Pagination } from "@/components/shared/Pagination";

import type { AdminInvoice } from "@/types/dashboard/admin/assetTypes";

//===== constants =====//
const PAGE_SIZE = 10;

const statuses = [
  {
    value: "all",
    label: "All statuses",
  },
  {
    value: "DRAFT",
    label: "Draft",
  },
  {
    value: "SENT",
    label: "Sent",
  },
  {
    value: "PAID",
    label: "Paid",
  },
  {
    value: "OVERDUE",
    label: "Overdue",
  },
  {
    value: "CANCELLED",
    label: "Cancelled",
  },
];

//===== helpers =====//
const formatMoney = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (value: string | null) =>
  value
    ? new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(value))
    : "—";

export function AdminInvoicesClient({
  initialInvoices,
}: {
  initialInvoices: AdminInvoice[];
}) {
  //===== state =====//
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("all");

  const [page, setPage] = useState(1);

  //===== filtered invoices =====//
  const invoices = useMemo(
    () =>
      initialInvoices.filter(
        (invoice) =>
          (status === "all" || invoice.status === status) &&
          `${invoice.invoiceNumber} ${invoice.project.title} ${invoice.project.clientName}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      ),
    [initialInvoices, search, status],
  );

  //===== pagination =====//
  const totalPages = Math.max(1, Math.ceil(invoices.length / PAGE_SIZE));

  const activePage = Math.min(page, totalPages);

  const visibleInvoices = invoices.slice(
    (activePage - 1) * PAGE_SIZE,
    activePage * PAGE_SIZE,
  );

  //===== metrics =====//
  const paid = initialInvoices.filter(
    (invoice) => invoice.status === "PAID",
  ).length;

  const overdue = initialInvoices.filter(
    (invoice) => invoice.status === "OVERDUE",
  ).length;

  //===== handlers =====//
  const updateSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const updateStatus = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  //===== render =====//
  return (
    <div className="relative space-y-6">
      {/*===== BILLING HEADER =====*/}

      <header
        className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
      >
        {/* top signal */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/25 to-transparent"
        />

        {/* ambient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-secondary/[0.055] blur-[100px]"
        />

        <div
          className="relative z-10 grid gap-7 px-5 py-6 sm:px-6 lg:px-8 lg:py-7 xl:grid-cols-[minmax(0,1fr)_280px]"
        >
          {/*===== TITLE =====*/}

          <div className="min-w-0">
            <div
              className="flex flex-wrap items-center gap-3"
            >
              <ReceiptText className="h-3.5 w-3.5 text-secondary" />

              <span
                className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary"
              >
                Billing ledger
              </span>

              <span className="h-px w-8 bg-secondary/30" />

              <span
                className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground/40"
              >
                Finance operations
              </span>
            </div>

            <h1
              className="mt-5 text-3xl font-semibold tracking-[-0.05em] text-heading sm:text-[38px]"
            >
              Invoices
            </h1>

            <p
              className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground"
            >
              Track billing activity, payment status, and invoice records across
              all client projects.
            </p>

            <div
              className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-4"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-success" />

                <span
                  className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/40"
                >
                  Ledger available
                </span>
              </div>

              <span
                className="text-xs text-muted-foreground"
              >
                <span
                  className="font-semibold text-heading"
                >
                  {initialInvoices.length}
                </span>{" "}
                total invoice
                {initialInvoices.length === 1 ? "" : "s"}
              </span>
            </div>
          </div>

          {/*===== FINANCE INDEX =====*/}

          <div
            className="border-t border-border pt-5 xl:border-l xl:border-t-0 xl:pl-7 xl:pt-0"
          >
            <span
              className="font-mono text-[8px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/40"
            >
              Payment state
            </span>

            <div
              className="mt-4 flex items-end gap-3"
            >
              <CircleDollarSign className="mb-1 h-5 w-5 text-secondary" />

              <span
                className="text-4xl font-semibold tracking-[-0.06em] text-heading"
              >
                {paid}
              </span>

              <span
                className="pb-1 text-xs text-muted-foreground"
              >
                paid
              </span>
            </div>

            <p
              className="mt-2 text-xs leading-5 text-muted-foreground"
            >
              Paid invoices currently recorded across the project portfolio.
            </p>

            <div
              className="mt-5 border-t border-border pt-4"
            >
              <div
                className="flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2">
                  <TriangleAlert className="h-3.5 w-3.5 text-warning" />

                  <span
                    className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/40"
                  >
                    Overdue
                  </span>
                </div>

                <span
                  className="text-sm font-semibold text-heading"
                >
                  {overdue}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/*===== BILLING METRICS =====*/}

      <section
        className="overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
      >
        <div className="grid sm:grid-cols-3">
          <Metric
            icon={ReceiptText}
            eyebrow="Ledger"
            label="All invoices"
            value={initialInvoices.length}
          />

          <Metric
            icon={Banknote}
            eyebrow="Settled"
            label="Paid invoices"
            value={paid}
            tone="success"
          />

          <Metric
            icon={TriangleAlert}
            eyebrow="Attention"
            label="Overdue invoices"
            value={overdue}
            tone="warning"
          />
        </div>
      </section>

      {/*===== INVOICE DIRECTORY =====*/}

      <section className="relative">
        {/*===== CONTROLS =====*/}

        <div
          className="relative z-20 border border-border bg-card shadow-[var(--shadow-card)]"
        >
          <div
            className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
          >
            <div>
              <span
                className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary"
              >
                Invoice directory
              </span>

              <p
                className="mt-1 text-xs text-muted-foreground"
              >
                Search and refine billing records across all projects.
              </p>
            </div>

            <span
              className="text-xs text-muted-foreground"
            >
              <span
                className="font-semibold text-heading"
              >
                {invoices.length}
              </span>{" "}
              matching invoice
              {invoices.length === 1 ? "" : "s"}
            </span>
          </div>

          <div
            className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:px-6"
          >
            <div className="min-w-0 flex-1">
              <Input
                icon={Search}
                value={search}
                onChange={(event) => updateSearch(event.target.value)}
                placeholder="Search invoice, project, or client..."
                className="w-full"
              />
            </div>

            <Select
              options={statuses}
              value={status}
              onChange={updateStatus}
              className="w-full sm:w-48"
            />
          </div>

          <div
            className="flex items-center justify-between gap-3 border-t border-border bg-muted/10 px-5 py-2.5 sm:px-6"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full bg-success"
              />

              <span
                className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/40"
              >
                Billing records available
              </span>
            </div>

            {(search || status !== "all") && (
              <span
                className="font-mono text-[7px] font-semibold uppercase tracking-[0.13em] text-secondary"
              >
                Filters active
              </span>
            )}
          </div>
        </div>

        {/*===== LEDGER =====*/}

        <div
          className="relative z-10 mt-3"
        >
          <div
            className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
          >
            {/* top signal */}
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 z-10 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/10 to-transparent"
            />

            {/*===== DESKTOP TABLE =====*/}

            <div className="hidden overflow-x-auto lg:block">
              <Table>
                <TableHeader>
                  <TableRow
                    className="bg-muted/15 hover:bg-muted/15"
                  >
                    <TableHead className="pl-5">Invoice</TableHead>

                    <TableHead>Project / Client</TableHead>

                    <TableHead>Amount</TableHead>

                    <TableHead>Status</TableHead>

                    <TableHead>Due date</TableHead>

                    <TableHead className="pr-5 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {visibleInvoices.map((invoice) => (
                    <TableRow
                      key={invoice.id}
                      className="transition-colors duration-200 hover:bg-secondary/[0.02]"
                    >
                      {/* invoice */}
                      <TableCell className="py-4 pl-5">
                        <div className="flex items-start gap-3">
                          <div
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-secondary"
                          >
                            <ReceiptText className="h-4 w-4" />
                          </div>

                          <div className="min-w-0">
                            <p
                              className="truncate text-sm font-semibold text-heading"
                            >
                              {invoice.invoiceNumber}
                            </p>

                            <p
                              className="mt-1 text-[10px] text-muted-foreground"
                            >
                              Created {formatDate(invoice.createdAt)}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* project */}
                      <TableCell>
                        <Link
                          href={`/admin/dashboard/projects/${invoice.project.id}`}
                          className="group block max-w-[240px]"
                        >
                          <p
                            className="truncate text-sm font-medium text-heading transition-colors group-hover:text-secondary"
                          >
                            {invoice.project.title}
                          </p>

                          <p
                            className="mt-1 truncate text-[10px] text-muted-foreground"
                          >
                            {invoice.project.clientName}
                          </p>
                        </Link>
                      </TableCell>

                      {/* amount */}
                      <TableCell>
                        <span
                          className="whitespace-nowrap text-sm font-semibold text-heading"
                        >
                          {formatMoney(invoice.amount, invoice.currency)}
                        </span>
                      </TableCell>

                      {/* status */}
                      <TableCell>
                        <StatusBadge status={invoice.status.toLowerCase()} />
                      </TableCell>

                      {/* due date */}
                      <TableCell>
                        <span
                          className="whitespace-nowrap text-xs text-muted-foreground"
                        >
                          {formatDate(invoice.dueDate)}
                        </span>
                      </TableCell>

                      {/* actions */}
                      <TableCell className="pr-5 text-right">
                        <a
                          href={`/api/invoices/${invoice.id}/pdf`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Download ${invoice.invoiceNumber}`}
                          title="Download invoice PDF"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-colors hover:border-secondary/20 hover:bg-secondary/[0.05] hover:text-secondary"
                        >
                          <Download className="h-3.5 w-3.5" />
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/*===== MOBILE + TABLET =====*/}

            <div className="divide-y divide-border lg:hidden">
              {visibleInvoices.map((invoice) => (
                <article
                  key={invoice.id}
                  className="px-5 py-5 transition-colors hover:bg-secondary/[0.02] sm:px-6"
                >
                  {/* header */}
                  <div
                    className="flex items-start gap-3"
                  >
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-background text-secondary"
                    >
                      <ReceiptText className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div
                        className="flex items-start justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <h3
                            className="truncate text-sm font-semibold text-heading"
                          >
                            {invoice.invoiceNumber}
                          </h3>

                          <p
                            className="mt-1 text-[10px] text-muted-foreground"
                          >
                            Created {formatDate(invoice.createdAt)}
                          </p>
                        </div>

                        <a
                          href={`/api/invoices/${invoice.id}/pdf`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Download ${invoice.invoiceNumber}`}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:border-secondary/20 hover:text-secondary"
                        >
                          <Download className="h-3.5 w-3.5" />
                        </a>
                      </div>

                      <div className="mt-3">
                        <StatusBadge status={invoice.status.toLowerCase()} />
                      </div>
                    </div>
                  </div>

                  {/* amount */}
                  <div
                    className="mt-4 flex items-center justify-between gap-4 border border-border bg-background/30 px-3 py-3"
                  >
                    <div>
                      <span
                        className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40"
                      >
                        Invoice value
                      </span>

                      <p
                        className="mt-1 text-base font-semibold tracking-[-0.02em] text-heading"
                      >
                        {formatMoney(invoice.amount, invoice.currency)}
                      </p>
                    </div>

                    <CircleDollarSign className="h-4 w-4 text-secondary" />
                  </div>

                  {/* details */}
                  <div
                    className="mt-3 grid gap-3 sm:grid-cols-2"
                  >
                    <RecordItem label="Project" value={invoice.project.title} />

                    <RecordItem
                      label="Client"
                      value={invoice.project.clientName}
                    />

                    <RecordItem
                      label="Due date"
                      value={formatDate(invoice.dueDate)}
                    />

                    <RecordItem
                      label="Status"
                      value={invoice.status}
                      capitalize
                    />
                  </div>

                  {/* footer */}
                  <div
                    className="mt-4 flex items-center justify-between gap-4 border-t border-border pt-4"
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-secondary" />

                      <span
                        className="font-mono text-[7px] uppercase tracking-[0.13em] text-muted-foreground/40"
                      >
                        Billing record
                      </span>
                    </div>

                    <Link
                      href={`/admin/dashboard/projects/${invoice.project.id}`}
                      className="font-mono text-[7px] font-semibold uppercase tracking-[0.13em] text-secondary"
                    >
                      Open project
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/*===== EMPTY =====*/}

            {!visibleInvoices.length && (
              <div
                className="flex min-h-[260px] flex-col items-center justify-center px-6 py-12 text-center"
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-muted/20 text-muted-foreground"
                >
                  <FileText className="h-4 w-4" />
                </div>

                <span
                  className="mt-4 font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary"
                >
                  Billing ledger
                </span>

                <p
                  className="mt-1.5 text-sm font-semibold text-heading"
                >
                  No matching invoices
                </p>

                <p
                  className="mt-1 text-xs text-muted-foreground"
                >
                  No invoices match your current filters.
                </p>
              </div>
            )}

            {/*===== FOOTER =====*/}

            {visibleInvoices.length > 0 && (
              <div
                className="flex items-center justify-between gap-3 border-t border-border bg-muted/10 px-5 py-3 sm:px-6"
              >
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />

                  <span
                    className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/40"
                  >
                    Billing records indexed
                  </span>
                </div>

                <span
                  className="text-xs text-muted-foreground"
                >
                  <span
                    className="font-semibold text-heading"
                  >
                    {visibleInvoices.length}
                  </span>{" "}
                  shown
                </span>
              </div>
            )}
          </div>
        </div>

        {/*===== PAGINATION =====*/}

        {totalPages > 1 && (
          <div
            className="mt-3 border border-border bg-card px-5 py-4 shadow-[var(--shadow-card)] sm:px-6"
          >
            <Pagination
              currentPage={activePage}
              totalItems={invoices.length}
              pageSize={PAGE_SIZE}
              itemLabel="invoices"
              onPageChange={setPage}
            />
          </div>
        )}
      </section>
    </div>
  );
}

//==============================================================//
// METRIC
//==============================================================//

function Metric({
  icon: Icon,
  eyebrow,
  label,
  value,
  tone = "default",
}: {
  icon: typeof ReceiptText;
  eyebrow: string;
  label: string;
  value: number;
  tone?: "default" | "success" | "warning";
}) {
  const styles = {
    default: "border-secondary/15 bg-secondary/[0.05] text-secondary",

    success: "border-success/20 bg-success/[0.05] text-success",

    warning: "border-warning/20 bg-warning/[0.05] text-warning",
  };

  return (
    <div
      className="flex items-start justify-between gap-4 border-b border-border px-5 py-5 sm:border-b-0 sm:border-r sm:last:border-r-0"
    >
      <div>
        <span
          className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40"
        >
          {eyebrow}
        </span>

        <p
          className="mt-1 text-xs text-muted-foreground"
        >
          {label}
        </p>

        <p
          className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-heading"
        >
          {value}
        </p>
      </div>

      <div
        className={`
          flex h-9 w-9
          shrink-0
          items-center
          justify-center
          rounded-md
          border
          ${styles[tone]}
        `}
      >
        <Icon className="h-4 w-4" />
      </div>
    </div>
  );
}

//==============================================================//
// MOBILE RECORD ITEM
//==============================================================//

function RecordItem({
  label,
  value,
  capitalize = false,
}: {
  label: string;
  value: string;
  capitalize?: boolean;
}) {
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
        className={`
          mt-1.5
          truncate
          text-xs
          font-medium
          text-heading

          ${capitalize ? "capitalize" : ""}
        `}
        title={value}
      >
        {value}
      </p>
    </div>
  );
}
