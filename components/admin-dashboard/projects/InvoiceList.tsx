"use client";

//===== Imports =====//
import { useState, useTransition } from "react";
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
import ConfirmationModal from "@/components/ui/ConfirmationModal";

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
  readonly?: boolean;
}

type PendingInvoiceAction =
  | { invoiceId: string; type: "send" }
  | { invoiceId: string; type: "status"; status: InvoiceStatus }
  | { invoiceId: string; type: "delete" };

export function InvoiceList({
  invoices,
  readonly = false,
}: InvoiceListProps) {
  const [isPending, startTransition] = useTransition();
  const [pendingAction, setPendingAction] =
    useState<PendingInvoiceAction | null>(null);
  const router = useRouter();

  //===== Confirm selected invoice action =====//
  const handleConfirmAction = () => {
    if (!pendingAction) return;

    startTransition(async () => {
      const result =
        pendingAction.type === "send"
          ? await sendInvoice(pendingAction.invoiceId)
          : pendingAction.type === "delete"
            ? await deleteInvoice(pendingAction.invoiceId)
            : await updateInvoice(pendingAction.invoiceId, {
                status: pendingAction.status,
              });

      if (result.success) {
        const successMessage =
          pendingAction.type === "send"
            ? "Invoice sent"
            : pendingAction.type === "delete"
              ? "Invoice deleted"
              : `Status updated to ${pendingAction.status}`;

        toast.success(successMessage);
        setPendingAction(null);
        router.refresh();
      } else {
        toast.error(
          result.error ||
            (pendingAction.type === "delete"
              ? "Failed to delete invoice"
              : "Failed to update invoice"),
        );
      }
    });
  };

  const pendingInvoice = pendingAction
    ? (invoices.find((invoice) => invoice.id === pendingAction.invoiceId) ??
      null)
    : null;

  const confirmation = getConfirmationContent(pendingAction, pendingInvoice);

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
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[760px]">
      {/*===== Desktop heading =====*/}
      <div className="grid grid-cols-[minmax(160px,1.35fr)_minmax(120px,0.85fr)_minmax(100px,0.62fr)_minmax(96px,0.62fr)_minmax(132px,auto)] items-center gap-3 border-b border-border bg-muted/[0.08] px-4 py-3">
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
            <div className="grid grid-cols-[minmax(160px,1.35fr)_minmax(120px,0.85fr)_minmax(100px,0.62fr)_minmax(96px,0.62fr)_minmax(132px,auto)] items-center gap-3 px-4 py-5">
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
                        onClick={() =>
                          setPendingAction({ invoiceId: invoice.id, type: "send" })
                        }
                        disabled={isPending}
                        tone="primary"
                      />
                    )}

                    {(invoice.status === "SENT" ||
                      invoice.status === "OVERDUE") && (
                      <DesktopTextAction
                        label="Mark Paid"
                        icon={CheckCircle2}
                        onClick={() =>
                          setPendingAction({
                            invoiceId: invoice.id,
                            type: "status",
                            status: "PAID",
                          })
                        }
                        disabled={isPending}
                        tone="success"
                      />
                    )}

                    {invoice.status === "SENT" && (
                      <ActionButton
                        label="Mark as overdue"
                        tone="warning"
                        onClick={() =>
                          setPendingAction({
                            invoiceId: invoice.id,
                            type: "status",
                            status: "OVERDUE",
                          })
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
                          setPendingAction({
                            invoiceId: invoice.id,
                            type: "status",
                            status: "CANCELLED",
                          })
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
                        onClick={() =>
                          setPendingAction({ invoiceId: invoice.id, type: "delete" })
                        }
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

          </article>
        ))}
      </div>
        </div>
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

      <ConfirmationModal
        isOpen={Boolean(pendingAction && pendingInvoice)}
        onClose={() => setPendingAction(null)}
        onConfirm={handleConfirmAction}
        title={confirmation.title}
        description={confirmation.description}
        confirmLabel={confirmation.confirmLabel}
        tone={confirmation.tone}
        isPending={isPending}
      />
    </div>
  );
}

function getConfirmationContent(
  action: PendingInvoiceAction | null,
  invoice: Invoice | null,
) {
  const invoiceLabel = invoice?.invoiceNumber ?? "this invoice";

  if (action?.type === "delete") {
    return {
      title: "Delete invoice",
      description: `Delete ${invoiceLabel}? This action cannot be undone.`,
      confirmLabel: "Delete invoice",
      tone: "danger" as const,
    };
  }

  if (action?.type === "send") {
    return {
      title: "Send invoice",
      description: `Send ${invoiceLabel} to the client? The invoice status will change from draft to sent.`,
      confirmLabel: "Send invoice",
      tone: "default" as const,
    };
  }

  if (action?.status === "PAID") {
    return {
      title: "Mark invoice as paid",
      description: `Mark ${invoiceLabel} as paid? This updates the invoice payment status.`,
      confirmLabel: "Mark as paid",
      tone: "success" as const,
    };
  }

  if (action?.status === "OVERDUE") {
    return {
      title: "Mark invoice as overdue",
      description: `Mark ${invoiceLabel} as overdue?`,
      confirmLabel: "Mark overdue",
      tone: "warning" as const,
    };
  }

  return {
    title: "Cancel invoice",
    description: `Cancel ${invoiceLabel}? The invoice will no longer be available for payment.`,
    confirmLabel: "Cancel invoice",
    tone: "warning" as const,
  };
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

