"use client";

//===== Imports =====//
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { InvoiceStatus } from "@prisma/client";
import {
  CheckCircle2,
  Clock3,
  FileDown,
  Mail,
  ReceiptText,
  Trash2,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/Button";

import {
  deleteInvoice,
  sendInvoice,
  updateInvoice,
} from "@/lib/actions/projects/invoice.action";

//===== Types =====//
interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  dueDate: Date | null;
  paidAt: Date | null;
  createdAt: Date;
}

interface InvoiceListProps {
  invoices: Invoice[];
  projectId: string;
  readonly?: boolean;
}

export function InvoiceList({
  invoices,
  projectId,
  readonly = false,
}: InvoiceListProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  //===== Send =====//
  const handleSend = (invoiceId: string) => {
    startTransition(async () => {
      const result = await sendInvoice(invoiceId);

      if (result.success) {
        toast.success("Invoice sent");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to send");
      }
    });
  };

  //===== Delete =====//
  const handleDelete = (invoiceId: string) => {
    if (!confirm("Delete this invoice?")) return;

    startTransition(async () => {
      const result = await deleteInvoice(invoiceId);

      if (result.success) {
        toast.success("Invoice deleted");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to delete");
      }
    });
  };

  //===== Status =====//
  const handleStatusChange = (invoiceId: string, newStatus: InvoiceStatus) => {
    startTransition(async () => {
      const result = await updateInvoice(invoiceId, {
        status: newStatus,
      });

      if (result.success) {
        toast.success(`Status updated to ${newStatus}`);
        router.refresh();
      } else {
        toast.error(result.error || "Failed to update status");
      }
    });
  };

  //===== Empty state =====//
  if (invoices.length === 0) {
    return (
      <div className="flex min-h-[160px] flex-col items-center justify-center border border-dashed border-border bg-muted/[0.06] px-6 py-8 text-center">
        <div className="flex h-9 w-9 items-center justify-center border border-secondary/15 bg-secondary/[0.04] text-secondary">
          <ReceiptText className="h-4 w-4" />
        </div>

        <span className="mt-4 font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
          Commercial Records
        </span>

        <p className="mt-1.5 text-sm font-semibold text-heading">
          No invoices yet
        </p>

        <p className="mt-1 max-w-xs text-xs leading-5 text-muted-foreground">
          Invoices created for this project will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="min-w-0 max-w-full border border-border bg-card">
      {/*===== Desktop heading =====*/}
      <div className="hidden grid-cols-[minmax(210px,1.4fr)_minmax(135px,0.8fr)_minmax(110px,0.65fr)_105px_minmax(160px,auto)] items-center gap-4 border-b border-border bg-muted/[0.08] px-4 py-3 xl:grid">
        <ColumnLabel>Invoice</ColumnLabel>
        <ColumnLabel>Timeline</ColumnLabel>
        <ColumnLabel>Amount</ColumnLabel>
        <ColumnLabel>Status</ColumnLabel>

        <span className="text-right font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
          Actions
        </span>
      </div>

      {/*===== Records =====*/}
      <div className="divide-y divide-border">
        {invoices.map((invoice, index) => (
          <article
            key={invoice.id}
            className="relative transition-colors duration-200 hover:bg-muted/[0.06]"
          >
            {/*===== Desktop =====*/}
            <div className="hidden grid-cols-[minmax(210px,1.4fr)_minmax(135px,0.8fr)_minmax(110px,0.65fr)_105px_minmax(160px,auto)] items-center gap-4 px-4 py-5 xl:grid">
              {/*===== Invoice identity =====*/}
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-secondary/15 bg-secondary/[0.04] font-mono text-[8px] font-semibold text-secondary">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="min-w-0">
                  <p
                    className="truncate text-sm font-semibold text-heading"
                    title={invoice.invoiceNumber}
                  >
                    {invoice.invoiceNumber}
                  </p>

                  <div className="mt-1.5 flex min-w-0 items-center gap-2">
                    <span className="shrink-0 font-mono text-[7px] uppercase tracking-[0.11em] text-muted-foreground/35">
                      Created
                    </span>

                    <span className="truncate text-[10px] text-muted-foreground">
                      {format(new Date(invoice.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                </div>
              </div>

              {/*===== Timeline =====*/}
              <div className="min-w-0">
                {invoice.paidAt ? (
                  <div className="flex min-w-0 items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-success" />

                    <div className="min-w-0">
                      <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.11em] text-success">
                        Paid
                      </span>

                      <p className="mt-0.5 truncate text-xs font-medium text-heading">
                        {format(new Date(invoice.paidAt), "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                ) : invoice.dueDate ? (
                  <div className="flex min-w-0 items-center gap-2">
                    <Clock3 className="h-3.5 w-3.5 shrink-0 text-secondary" />

                    <div className="min-w-0">
                      <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.11em] text-muted-foreground/40">
                        Due
                      </span>

                      <p className="mt-0.5 truncate text-xs font-medium text-heading">
                        {format(new Date(invoice.dueDate), "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    No due date
                  </span>
                )}
              </div>

              {/*===== Amount =====*/}
              <div className="min-w-0">
                <p className="truncate text-base font-semibold tracking-[-0.02em] text-heading">
                  {invoice.amount}{" "}
                  <span className="text-xs font-medium text-muted-foreground">
                    {invoice.currency}
                  </span>
                </p>

                <span className="mt-1 block font-mono text-[6px] uppercase tracking-[0.12em] text-muted-foreground/30">
                  Invoice value
                </span>
              </div>

              {/*===== Status =====*/}
              <div className="min-w-0">
                <InvoiceStatusBadge status={invoice.status} />
              </div>

              {/*===== Actions =====*/}
              <div className="flex min-w-0 flex-wrap items-center justify-end gap-1.5">
                {!readonly && (
                  <>
                    {invoice.status === "DRAFT" && (
                      <DesktopTextAction
                        label="Send"
                        icon={Mail}
                        onClick={() => handleSend(invoice.id)}
                        disabled={isPending}
                        tone="primary"
                      />
                    )}

                    {(invoice.status === "SENT" ||
                      invoice.status === "OVERDUE") && (
                      <DesktopTextAction
                        label="Mark Paid"
                        icon={CheckCircle2}
                        onClick={() => handleStatusChange(invoice.id, "PAID")}
                        disabled={isPending}
                        tone="success"
                      />
                    )}

                    {invoice.status === "SENT" && (
                      <ActionButton
                        label="Mark as overdue"
                        tone="warning"
                        onClick={() =>
                          handleStatusChange(invoice.id, "OVERDUE")
                        }
                        disabled={isPending}
                      >
                        <Clock3 className="h-3.5 w-3.5" />
                      </ActionButton>
                    )}

                    {invoice.status === "DRAFT" && (
                      <ActionButton
                        label="Cancel invoice"
                        tone="muted"
                        onClick={() =>
                          handleStatusChange(invoice.id, "CANCELLED")
                        }
                        disabled={isPending}
                      >
                        <XCircle className="h-3.5 w-3.5" />
                      </ActionButton>
                    )}

                    {invoice.status === "DRAFT" && (
                      <ActionButton
                        label="Delete invoice"
                        tone="danger"
                        onClick={() => handleDelete(invoice.id)}
                        disabled={isPending}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </ActionButton>
                    )}
                  </>
                )}

                <Link
                  href={`/api/invoices/${invoice.id}/pdf`}
                  target="_blank"
                  aria-label="Download invoice PDF"
                  title="Download PDF"
                  className="flex h-8 w-8 shrink-0 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-secondary/25 hover:bg-secondary/[0.04] hover:text-secondary"
                >
                  <FileDown className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/*===== Mobile and tablet =====*/}
            <div className="px-4 py-5 xl:hidden">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-secondary/15 bg-secondary/[0.04] font-mono text-[8px] font-semibold text-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-heading">
                      {invoice.invoiceNumber}
                    </p>

                    <p className="mt-1 text-[10px] text-muted-foreground">
                      Created{" "}
                      {format(new Date(invoice.createdAt), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>

                <InvoiceStatusBadge status={invoice.status} />
              </div>

              {/*===== Commercial summary =====*/}
              <div className="mt-5 grid grid-cols-2 border-y border-border">
                <MobileDetail
                  label="Invoice value"
                  value={`${invoice.amount} ${invoice.currency}`}
                />

                <MobileDetail
                  label={invoice.paidAt ? "Paid" : "Due date"}
                  value={
                    invoice.paidAt
                      ? format(new Date(invoice.paidAt), "MMM d, yyyy")
                      : invoice.dueDate
                        ? format(new Date(invoice.dueDate), "MMM d, yyyy")
                        : "No due date"
                  }
                  tone={invoice.paidAt ? "success" : "default"}
                  bordered
                />
              </div>

              {/*===== Mobile actions =====*/}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {!readonly && (
                  <>
                    {invoice.status === "DRAFT" && (
                      <MobileAction
                        onClick={() => handleSend(invoice.id)}
                        disabled={isPending}
                        icon={Mail}
                        tone="primary"
                      >
                        Send
                      </MobileAction>
                    )}

                    {(invoice.status === "SENT" ||
                      invoice.status === "OVERDUE") && (
                      <MobileAction
                        onClick={() => handleStatusChange(invoice.id, "PAID")}
                        disabled={isPending}
                        icon={CheckCircle2}
                        tone="success"
                      >
                        Mark Paid
                      </MobileAction>
                    )}

                    {invoice.status === "SENT" && (
                      <MobileAction
                        onClick={() =>
                          handleStatusChange(invoice.id, "OVERDUE")
                        }
                        disabled={isPending}
                        icon={Clock3}
                        tone="warning"
                      >
                        Overdue
                      </MobileAction>
                    )}

                    {invoice.status === "DRAFT" && (
                      <MobileAction
                        onClick={() =>
                          handleStatusChange(invoice.id, "CANCELLED")
                        }
                        disabled={isPending}
                        icon={XCircle}
                      >
                        Cancel
                      </MobileAction>
                    )}

                    {invoice.status === "DRAFT" && (
                      <MobileAction
                        onClick={() => handleDelete(invoice.id)}
                        disabled={isPending}
                        icon={Trash2}
                        tone="danger"
                      >
                        Delete
                      </MobileAction>
                    )}
                  </>
                )}

                <Link
                  href={`/api/invoices/${invoice.id}/pdf`}
                  target="_blank"
                  className="inline-flex h-8 items-center gap-1.5 border border-border bg-card px-2.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-secondary/25 hover:text-heading"
                >
                  <FileDown className="h-3.5 w-3.5" />
                  PDF
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/*===== Footer =====*/}
      <div className="flex flex-col gap-2 border-t border-border bg-muted/[0.06] px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />

          <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
            Commercial records available
          </span>
        </div>

        <span className="text-xs text-muted-foreground">
          <span className="font-semibold text-heading">{invoices.length}</span>{" "}
          {invoices.length === 1 ? "invoice" : "invoices"}
        </span>
      </div>
    </div>
  );
}

//===== Invoice status badge =====//
function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  const styles: Record<InvoiceStatus, string> = {
    DRAFT: "border-border bg-muted/30 text-muted-foreground",
    SENT: "border-info/20 bg-info/[0.06] text-info",
    PAID: "border-success/20 bg-success/[0.06] text-success",
    OVERDUE: "border-destructive/20 bg-destructive/[0.06] text-destructive",
    CANCELLED: "border-border bg-muted/20 text-muted-foreground",
  };

  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.1em] ${styles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}

//===== Column label =====//
function ColumnLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
      {children}
    </span>
  );
}

//===== Primary desktop action =====//
function DesktopTextAction({
  label,
  icon: Icon,
  tone = "primary",
  disabled,
  onClick,
}: {
  label: string;
  icon: typeof Mail;
  tone?: "primary" | "success";
  disabled?: boolean;
  onClick: () => void;
}) {
  const styles = {
    primary:
      "border-secondary/20 bg-secondary/[0.05] text-secondary hover:bg-secondary/[0.09]",
    success:
      "border-success/20 bg-success/[0.05] text-success hover:bg-success/[0.09]",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-[10px] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${styles[tone]}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

//===== Desktop icon action =====//
function ActionButton({
  label,
  tone = "default",
  disabled,
  onClick,
  children,
}: {
  label: string;
  tone?: "default" | "success" | "warning" | "muted" | "danger";
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const styles = {
    default:
      "text-muted-foreground hover:border-secondary/20 hover:bg-secondary/[0.05] hover:text-secondary",
    success: "text-success hover:border-success/20 hover:bg-success/[0.06]",
    warning: "text-warning hover:border-warning/20 hover:bg-warning/[0.06]",
    muted:
      "text-muted-foreground hover:border-border hover:bg-muted/40 hover:text-heading",
    danger:
      "text-destructive hover:border-destructive/20 hover:bg-destructive/[0.06]",
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`h-8 w-8 !rounded-md border border-transparent !p-0 ${styles[tone]}`}
    >
      {children}
    </Button>
  );
}

//===== Mobile detail =====//
function MobileDetail({
  label,
  value,
  tone = "default",
  bordered = false,
}: {
  label: string;
  value: string;
  tone?: "default" | "success";
  bordered?: boolean;
}) {
  return (
    <div
      className={`min-w-0 py-4 ${bordered ? "border-l border-border pl-4" : "pr-4"}`}
    >
      <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
        {label}
      </span>

      <p
        className={`mt-1.5 truncate text-xs font-semibold ${tone === "success" ? "text-success" : "text-heading"}`}
      >
        {value}
      </p>
    </div>
  );
}

//===== Mobile action =====//
function MobileAction({
  icon: Icon,
  children,
  tone = "default",
  onClick,
  disabled,
}: {
  icon: typeof Mail;
  children: React.ReactNode;
  tone?: "default" | "primary" | "success" | "warning" | "danger";
  onClick: () => void;
  disabled?: boolean;
}) {
  const styles = {
    default:
      "border-border text-muted-foreground hover:bg-muted/30 hover:text-heading",
    primary:
      "border-secondary/20 bg-secondary/[0.04] text-secondary hover:bg-secondary/[0.08]",
    success: "border-success/20 text-success hover:bg-success/[0.05]",
    warning: "border-warning/20 text-warning hover:bg-warning/[0.05]",
    danger:
      "border-destructive/20 text-destructive hover:bg-destructive/[0.05]",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex h-8 items-center gap-1.5 rounded-md border bg-card px-2.5 text-[11px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${styles[tone]}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {children}
    </button>
  );
}
