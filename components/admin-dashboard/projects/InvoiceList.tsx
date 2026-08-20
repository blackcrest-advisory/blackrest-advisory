"use client";

//===== imports =====//
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

//===== types =====//
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
  //===== state =====//
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  //===== send =====//
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

  //===== delete =====//
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

  //===== status =====//
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

  //===== empty state =====//
  if (invoices.length === 0) {
    return (
      <div
        className="flex min-h-[170px] flex-col items-center justify-center border border-dashed border-border bg-background/20 px-6 py-8 text-center"
      >
        <div
          className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card text-muted-foreground"
        >
          <ReceiptText className="h-4 w-4" />
        </div>

        <span
          className="mt-4 font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary"
        >
          Commercial records
        </span>

        <p
          className="mt-1.5 text-sm font-semibold text-heading"
        >
          No invoices yet
        </p>

        <p
          className="mt-1 max-w-xs text-xs leading-5 text-muted-foreground"
        >
          Invoices created for this project will appear here.
        </p>
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden border border-border bg-background/15"
    >
      {/*===== DESKTOP HEADER =====*/}

      <div
        className="hidden grid-cols-[minmax(170px,1.4fr)_minmax(120px,0.8fr)_130px_150px_auto] items-center gap-4 border-b border-border bg-muted/10 px-4 py-3 lg:grid"
      >
        <ColumnLabel>Invoice</ColumnLabel>
        <ColumnLabel>Schedule</ColumnLabel>
        <ColumnLabel>Amount</ColumnLabel>
        <ColumnLabel>Status</ColumnLabel>

        <span
          className="text-right font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40"
        >
          Actions
        </span>
      </div>

      {/*===== INVOICES =====*/}

      <div className="divide-y divide-border">
        {invoices.map((invoice, index) => (
          <article
            key={invoice.id}
            className="relative transition-colors duration-200 hover:bg-secondary/[0.018]"
          >
            {/*===== DESKTOP =====*/}

            <div
              className="hidden min-h-[84px] grid-cols-[minmax(170px,1.4fr)_minmax(120px,0.8fr)_130px_150px_auto] items-center gap-4 px-4 py-4 lg:grid"
            >
              {/* invoice */}
              <div className="flex min-w-0 items-start gap-3">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-card font-mono text-[8px] font-semibold text-muted-foreground/35"
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="min-w-0">
                  <p
                    className="truncate text-sm font-semibold text-heading"
                    title={invoice.invoiceNumber}
                  >
                    {invoice.invoiceNumber}
                  </p>

                  <p
                    className="mt-1 text-[10px] text-muted-foreground"
                  >
                    Created {format(new Date(invoice.createdAt), "MMM d, yyyy")}
                  </p>
                </div>
              </div>

              {/* schedule */}
              <div className="min-w-0">
                {invoice.dueDate ? (
                  <div className="flex items-center gap-2">
                    <Clock3 className="h-3.5 w-3.5 shrink-0 text-secondary" />

                    <div className="min-w-0">
                      <p
                        className="font-mono text-[7px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/40"
                      >
                        Due
                      </p>

                      <p
                        className="mt-1 whitespace-nowrap text-xs font-medium text-heading"
                      >
                        {format(new Date(invoice.dueDate), "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    No due date
                  </span>
                )}

                {invoice.paidAt && (
                  <p
                    className="mt-1.5 text-[10px] text-success"
                  >
                    Paid {format(new Date(invoice.paidAt), "MMM d, yyyy")}
                  </p>
                )}
              </div>

              {/* amount */}
              <div>
                <p
                  className="whitespace-nowrap text-sm font-semibold text-heading"
                >
                  {invoice.amount} {invoice.currency}
                </p>

                <span
                  className="mt-1 block font-mono text-[7px] uppercase tracking-[0.12em] text-muted-foreground/35"
                >
                  Invoice value
                </span>
              </div>

              {/* status */}
              <div>
                <InvoiceStatusBadge status={invoice.status} />
              </div>

              {/* actions */}
              <div
                className="flex items-center justify-end gap-1"
              >
                {!readonly && (
                  <>
                    {/* Send - DRAFT */}
                    {invoice.status === "DRAFT" && (
                      <ActionButton
                        label="Send invoice"
                        onClick={() => handleSend(invoice.id)}
                        disabled={isPending}
                      >
                        <Mail className="h-3.5 w-3.5" />
                      </ActionButton>
                    )}

                    {/* Paid - SENT / OVERDUE */}
                    {(invoice.status === "SENT" ||
                      invoice.status === "OVERDUE") && (
                      <ActionButton
                        label="Mark as paid"
                        tone="success"
                        onClick={() => handleStatusChange(invoice.id, "PAID")}
                        disabled={isPending}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </ActionButton>
                    )}

                    {/* Overdue - SENT */}
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

                    {/* Cancelled - DRAFT */}
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

                    {/* Delete - DRAFT */}
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

                {/* PDF */}
                <Link
                  href={`/api/invoices/${invoice.id}/pdf`}
                  target="_blank"
                  aria-label="Download invoice PDF"
                  title="Download PDF"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-colors hover:border-border hover:bg-muted/30 hover:text-heading"
                >
                  <FileDown className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/*===== MOBILE + TABLET =====*/}

            <div className="px-4 py-4 lg:hidden">
              {/* header */}
              <div
                className="flex items-start justify-between gap-4"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-card font-mono text-[8px] font-semibold text-muted-foreground/35"
                  >
                    {String(index + 1).padStart(2, "0")}
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
                      Created{" "}
                      {format(new Date(invoice.createdAt), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>

                <InvoiceStatusBadge status={invoice.status} />
              </div>

              {/* commercial summary */}
              <div
                className="mt-4 grid gap-3 sm:grid-cols-2"
              >
                <MobileDetail
                  label="Invoice value"
                  value={`${invoice.amount} ${invoice.currency}`}
                />

                <MobileDetail
                  label="Due date"
                  value={
                    invoice.dueDate
                      ? format(new Date(invoice.dueDate), "MMM d, yyyy")
                      : "No due date"
                  }
                />

                {invoice.paidAt && (
                  <MobileDetail
                    label="Paid"
                    value={format(new Date(invoice.paidAt), "MMM d, yyyy")}
                    tone="success"
                  />
                )}
              </div>

              {/* actions */}
              <div
                className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4"
              >
                {!readonly && (
                  <>
                    {invoice.status === "DRAFT" && (
                      <MobileAction
                        onClick={() => handleSend(invoice.id)}
                        disabled={isPending}
                        icon={Mail}
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
                  className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-2.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-secondary/25 hover:text-heading"
                >
                  <FileDown className="h-3.5 w-3.5" />
                  PDF
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/*===== FOOTER =====*/}

      <div
        className="flex flex-col gap-2 border-t border-border bg-muted/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />

          <span
            className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40"
          >
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

//==============================================================//
// INVOICE STATUS BADGE
//==============================================================//

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
      className={`
        inline-flex
        w-fit
        items-center
        gap-1.5
        rounded-md
        border
        px-2.5 py-1
        font-mono
        text-[8px]
        font-semibold
        uppercase
        tracking-[0.1em]
        ${styles[status]}
      `}
    >
      <span
        className="h-1.5 w-1.5 rounded-full bg-current opacity-70"
      />

      {status}
    </span>
  );
}

//==============================================================//
// COLUMN LABEL
//==============================================================//

function ColumnLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40"
    >
      {children}
    </span>
  );
}

//==============================================================//
// DESKTOP ACTION
//==============================================================//

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
      className={`
        h-8
        w-8
        !rounded-md
        border border-transparent
        !p-0
        ${styles[tone]}
      `}
    >
      {children}
    </Button>
  );
}

//==============================================================//
// MOBILE DETAIL
//==============================================================//

function MobileDetail({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "success";
}) {
  return (
    <div
      className="border border-border bg-background/30 p-3"
    >
      <span
        className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40"
      >
        {label}
      </span>

      <p
        className={`
          mt-1.5
          text-xs
          font-semibold

          ${tone === "success" ? "text-success" : "text-heading"}
        `}
      >
        {value}
      </p>
    </div>
  );
}

//==============================================================//
// MOBILE ACTION
//==============================================================//

function MobileAction({
  icon: Icon,
  children,
  tone = "default",
  onClick,
  disabled,
}: {
  icon: typeof Mail;
  children: React.ReactNode;
  tone?: "default" | "success" | "warning" | "danger";
  onClick: () => void;
  disabled?: boolean;
}) {
  const styles = {
    default:
      "border-border text-muted-foreground hover:bg-muted/30 hover:text-heading",

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
      className={`
        inline-flex
        h-8
        items-center
        gap-1.5
        rounded-md
        border
        bg-card
        px-2.5
        text-[11px]
        font-medium
        transition-colors
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${styles[tone]}
      `}
    >
      <Icon className="h-3.5 w-3.5" />

      {children}
    </button>
  );
}
