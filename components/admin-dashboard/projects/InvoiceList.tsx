"use client";

//===== imports =====//
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { InvoiceStatus } from "@prisma/client";
import {
  sendInvoice,
  deleteInvoice,
  updateInvoice,
} from "@/lib/actions/projects/invoice.action";
import { Button } from "@/components/ui/Button";
import { Mail, Trash2, Edit, CheckCircle, XCircle, Clock } from "lucide-react";
import toast from "react-hot-toast";

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
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const statusColors: Record<InvoiceStatus, string> = {
    DRAFT: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    SENT: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    PAID: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    OVERDUE: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    CANCELLED: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
  };

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

  const handleStatusChange = (invoiceId: string, newStatus: InvoiceStatus) => {
    startTransition(async () => {
      const result = await updateInvoice(invoiceId, { status: newStatus });
      if (result.success) {
        toast.success(`Status updated to ${newStatus}`);
        router.refresh();
      } else {
        toast.error(result.error || "Failed to update status");
      }
    });
  };

  if (invoices.length === 0) {
    return <p className="text-sm text-muted-foreground">No invoices yet.</p>;
  }

  return (
    <div className="space-y-3">
      {invoices.map((invoice) => (
        <div
          key={invoice.id}
          className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border p-3"
        >
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">
              {invoice.invoiceNumber}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span>{format(new Date(invoice.createdAt), "MMM d, yyyy")}</span>
              {invoice.dueDate && (
                <span>
                  • Due {format(new Date(invoice.dueDate), "MMM d, yyyy")}
                </span>
              )}
              {invoice.paidAt && (
                <span>
                  • Paid {format(new Date(invoice.paidAt), "MMM d, yyyy")}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground whitespace-nowrap">
              {invoice.amount} {invoice.currency}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap ${statusColors[invoice.status]}`}
            >
              {invoice.status}
            </span>
          </div>
          {!readonly && (
            <div className="flex items-center gap-1">
              {/* Send (only if DRAFT) */}
              {invoice.status === "DRAFT" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSend(invoice.id)}
                  disabled={isPending}
                  className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700"
                >
                  <Mail className="h-4 w-4" />
                </Button>
              )}

              {/* Mark as PAID (if SENT or OVERDUE) */}
              {(invoice.status === "SENT" || invoice.status === "OVERDUE") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleStatusChange(invoice.id, "PAID")}
                  disabled={isPending}
                  className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                >
                  <CheckCircle className="h-4 w-4" />
                </Button>
              )}

              {/* Mark as OVERDUE (if SENT) */}
              {invoice.status === "SENT" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleStatusChange(invoice.id, "OVERDUE")}
                  disabled={isPending}
                  className="h-8 w-8 p-0 text-yellow-600 hover:text-yellow-700"
                >
                  <Clock className="h-4 w-4" />
                </Button>
              )}

              {/* Mark as CANCELLED (if DRAFT) */}
              {invoice.status === "DRAFT" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleStatusChange(invoice.id, "CANCELLED")}
                  disabled={isPending}
                  className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              )}

              {/* Delete (only if DRAFT) */}
              {invoice.status === "DRAFT" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(invoice.id)}
                  disabled={isPending}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive/80"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
