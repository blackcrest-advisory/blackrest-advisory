import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import { getClientInvoices } from "@/lib/data/invoices";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { InvoiceFilters } from "@/components/client-dashboard/invoices/InvoiceFilters";
import {
  ArrowUpRight,
  CalendarDays,
  Download,
  Eye,
  FileText,
  ReceiptText,
  WalletCards,
} from "lucide-react";
import { InvoicePagination } from "@/components/client-dashboard/invoices/InvoicePagination";

interface ClientInvoicesPageProps {
  searchParams?: Promise<{
    search?: string;
    status?: string;
    page?: string;
  }>;
}

const ITEMS_PER_PAGE = 8;

export default async function ClientInvoicesPage({
  searchParams,
}: ClientInvoicesPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const params = await searchParams;

  const search = params?.search?.trim() || "";
  const statusFilter = params?.status || "";
  const requestedPage = Number(params?.page || "1");
  const page =
    Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const invoices = await getClientInvoices(user.id, search, statusFilter);

  const totalCount = invoices.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedInvoices = invoices.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const paidCount = invoices.filter(
    (invoice) => invoice.status === "PAID",
  ).length;
  const pendingCount = invoices.filter(
    (invoice) => invoice.status !== "PAID",
  ).length;

  return (
    <div className="min-w-0 max-w-full space-y-6">
      {/*===== Page header =====*/}
      <div className="grid gap-5 border-b border-border pb-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
              Client Finance
            </span>
            <span className="h-px w-10 bg-secondary/35" />
          </div>

          <h1 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-heading sm:text-3xl">
            My Invoices
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Review project invoices, payment status, due dates, and downloadable
            invoice documents.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          Financial records
        </div>
      </div>

      {/*===== Summary =====*/}
      <div className="grid border border-border bg-card shadow-[var(--shadow-card)] sm:grid-cols-3">
        <SummaryItem
          icon={ReceiptText}
          label="Total invoices"
          value={String(totalCount).padStart(2, "0")}
        />

        <SummaryItem
          icon={WalletCards}
          label="Paid"
          value={String(paidCount).padStart(2, "0")}
          bordered
        />

        <SummaryItem
          icon={CalendarDays}
          label="Open / pending"
          value={String(pendingCount).padStart(2, "0")}
          bordered
        />
      </div>

      {/*===== Invoice register =====*/}
      <div className="relative overflow-visible border border-border bg-card shadow-[var(--shadow-card)]">
        <span className="absolute left-0 top-0 h-[2px] w-28 bg-secondary" />

        {/*===== Register header =====*/}
        <div className="flex flex-col gap-5 border-b border-border px-4 pb-4 pt-5 sm:px-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
              Invoice Register
            </span>

            <p className="mt-1 text-sm text-muted-foreground">
              {search || statusFilter
                ? `${totalCount} matching invoice${totalCount === 1 ? "" : "s"}`
                : `${totalCount} invoice${totalCount === 1 ? "" : "s"} available`}
            </p>
          </div>

          <InvoiceFilters
            search={search}
            status={statusFilter}
            totalCount={totalCount}
          />
        </div>

        {/*===== Desktop table =====*/}
        {paginatedInvoices.length > 0 && (
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[900px] border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/10">
                  <th className="px-5 py-3 text-left font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
                    Invoice
                  </th>
                  <th className="px-5 py-3 text-left font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
                    Project
                  </th>
                  <th className="px-5 py-3 text-left font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
                    Amount
                  </th>
                  <th className="px-5 py-3 text-left font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
                    Status
                  </th>
                  <th className="px-5 py-3 text-left font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
                    Due date
                  </th>
                  <th className="px-5 py-3 text-right font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedInvoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-b border-border last:border-b-0 transition-colors hover:bg-muted/10"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-secondary/15 bg-secondary/[0.04] text-secondary">
                          <FileText className="h-4 w-4" />
                        </div>

                        <div className="min-w-0">
                          <p className="font-mono text-xs font-semibold text-heading">
                            {invoice.invoiceNumber}
                          </p>
                          <span className="mt-0.5 block font-mono text-[6px] uppercase tracking-[0.12em] text-muted-foreground/30">
                            Invoice record
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="max-w-[260px] px-5 py-4">
                      <p className="truncate text-sm font-medium text-heading">
                        {invoice.project.title}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="whitespace-nowrap text-sm font-semibold text-heading">
                        {invoice.amount} {invoice.currency}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={invoice.status.toLowerCase()} />
                    </td>

                    <td className="px-5 py-4">
                      <p className="whitespace-nowrap text-sm text-muted-foreground">
                        {invoice.dueDate
                          ? new Date(invoice.dueDate).toLocaleDateString()
                          : "—"}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/client/dashboard/invoices/${invoice.id}`}
                          aria-label={`View invoice ${invoice.invoiceNumber}`}
                          className="flex h-8 w-8 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-secondary/30 hover:bg-secondary/[0.04] hover:text-secondary"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Link>

                        <a
                          href={`/api/invoices/${invoice.id}/pdf`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Download invoice ${invoice.invoiceNumber}`}
                          className="flex h-8 w-8 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-secondary/30 hover:bg-secondary/[0.04] hover:text-secondary"
                        >
                          <Download className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/*===== Mobile records =====*/}
        {paginatedInvoices.length > 0 && (
          <div className="divide-y divide-border lg:hidden">
            {paginatedInvoices.map((invoice) => (
              <article key={invoice.id} className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-secondary/15 bg-secondary/[0.04] text-secondary">
                      <FileText className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="font-mono text-xs font-semibold text-heading">
                        {invoice.invoiceNumber}
                      </p>

                      <p className="mt-1 truncate text-sm text-muted-foreground">
                        {invoice.project.title}
                      </p>
                    </div>
                  </div>

                  <StatusBadge status={invoice.status.toLowerCase()} />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4 border-y border-border py-4">
                  <div>
                    <span className="font-mono text-[6px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/35">
                      Amount
                    </span>

                    <p className="mt-1.5 text-sm font-semibold text-heading">
                      {invoice.amount} {invoice.currency}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-[6px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/35">
                      Due date
                    </span>

                    <p className="mt-1.5 text-sm font-medium text-heading">
                      {invoice.dueDate
                        ? new Date(invoice.dueDate).toLocaleDateString()
                        : "—"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <Link
                    href={`/client/dashboard/invoices/${invoice.id}`}
                    className="group flex flex-1 items-center justify-between border border-border px-3 py-2.5 text-xs font-medium text-heading transition-colors hover:border-secondary/30 hover:bg-secondary/[0.035]"
                  >
                    View invoice
                    <ArrowUpRight className="h-3.5 w-3.5 text-secondary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>

                  <a
                    href={`/api/invoices/${invoice.id}/pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Download invoice ${invoice.invoiceNumber}`}
                    className="flex h-[38px] w-[38px] items-center justify-center border border-border text-muted-foreground transition-colors hover:border-secondary/30 hover:text-secondary"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {/*===== Empty state =====*/}
        {paginatedInvoices.length === 0 && (
          <div className="px-5 py-16 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center border border-secondary/15 bg-secondary/[0.04] text-secondary">
              <ReceiptText className="h-4 w-4" />
            </div>

            <h2 className="mt-4 text-sm font-semibold text-heading">
              {search || statusFilter
                ? "No matching invoices"
                : "No invoices yet"}
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              {search || statusFilter
                ? "Try adjusting your search or changing the selected invoice status."
                : "Invoices connected to your projects will appear here once they are issued."}
            </p>
          </div>
        )}

        {/*===== Pagination =====*/}
        {totalCount > ITEMS_PER_PAGE && (
          <div className="border-t border-border bg-muted/10 px-4 py-4 sm:px-5">
            <InvoicePagination
              currentPage={currentPage}
              totalItems={totalCount}
              pageSize={ITEMS_PER_PAGE}
            />
          </div>
        )}
      </div>
    </div>
  );
}

//===== Summary item =====//
function SummaryItem({
  icon: Icon,
  label,
  value,
  bordered = false,
}: {
  icon: typeof ReceiptText;
  label: string;
  value: string;
  bordered?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-5 px-5 py-5 ${bordered ? "border-t border-border sm:border-l sm:border-t-0" : ""}`}
    >
      <div>
        <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/35">
          {label}
        </span>

        <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-heading">
          {value}
        </p>
      </div>

      <div className="flex h-9 w-9 items-center justify-center border border-secondary/15 bg-secondary/[0.04] text-secondary">
        <Icon className="h-4 w-4" />
      </div>
    </div>
  );
}
