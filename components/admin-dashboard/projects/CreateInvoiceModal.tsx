"use client";

//===== imports =====//
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  CircleDollarSign,
  FileText,
  Plus,
  ReceiptText,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/TextArea";

import { createInvoice } from "@/lib/actions/projects/invoice.action";
import { CURRENCY_OPTIONS } from "@/lib/utils/currencies";

//===== types =====//
interface CreateInvoiceModalProps {
  projectId: string;
  onSuccess?: () => void;
}

export function CreateInvoiceModal({
  projectId,
  onSuccess,
}: CreateInvoiceModalProps) {
  //===== state =====//
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  //===== submit =====//
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    startTransition(async () => {
      const result = await createInvoice({
        projectId,
        amount: parsedAmount,
        currency,
        dueDate: dueDate || undefined,
        notes: notes || undefined,
      });

      if (result.success) {
        toast.success("Invoice created");

        setIsOpen(false);
        setAmount("");
        setCurrency("EUR");
        setDueDate("");
        setNotes("");

        router.refresh();

        onSuccess?.();
      } else {
        toast.error(result.error || "Failed to create invoice");
      }
    });
  };

  //===== closed state =====//
  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="!rounded-md border-secondary/20 bg-secondary/[0.025] hover:border-secondary/30 hover:bg-secondary/[0.055]"
      >
        <Plus className="h-3.5 w-3.5" />

        <span className="ml-1.5">Create Invoice</span>
      </Button>
    );
  }

  //===== modal =====//
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-primary/55 p-4 backdrop-blur-[3px] sm:items-center dark:bg-background/75">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-invoice-title"
        className="relative my-auto flex max-h-[calc(100dvh-2rem)] w-full max-w-xl flex-col overflow-hidden border border-border bg-card shadow-[var(--shadow-overlay)]"
      >
        {/*===== TOP SIGNAL =====*/}

        <div
          aria-hidden="true"
          className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/35 to-transparent"
        />

        {/* ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-secondary/[0.06] blur-[90px]"
        />

        {/*===== HEADER =====*/}

        <div className="relative z-10 flex items-start justify-between gap-4 border-b border-border px-5 py-5 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-secondary/15 bg-secondary/[0.05] text-secondary">
              <ReceiptText className="h-4 w-4" />
            </div>

            <div>
              <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.17em] text-secondary">
                Commercial record
              </span>

              <h2
                id="create-invoice-title"
                className="mt-1 text-lg font-semibold tracking-[-0.025em] text-heading"
              >
                Create Invoice
              </h2>

              <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
                Create a new invoice for this client project.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            disabled={isPending}
            aria-label="Close invoice form"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-colors hover:border-border hover:bg-muted/30 hover:text-heading disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/*===== FORM =====*/}

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="relative z-10 min-h-0 flex-1 space-y-5 overflow-x-hidden overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
            {/*===== AMOUNT + CURRENCY =====*/}

            <div className="border border-border bg-background/25">
              <FormSectionHeader
                icon={CircleDollarSign}
                eyebrow="Invoice value"
                title="Amount & Currency"
              />

              <div className="grid gap-4 p-4 sm:grid-cols-[minmax(0,1fr)_180px] sm:p-5">
                <Field label="Amount" htmlFor="amount" required>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g., 1500.00"
                    required
                    disabled={isPending}
                  />
                </Field>

                <Field label="Currency" htmlFor="currency">
                  <Select
                    options={CURRENCY_OPTIONS}
                    value={currency}
                    onChange={setCurrency}
                    disabled={isPending}
                  />
                </Field>
              </div>
            </div>

            {/*===== DUE DATE =====*/}

            <div className="border border-border bg-background/25">
              <FormSectionHeader
                icon={CalendarDays}
                eyebrow="Payment schedule"
                title="Due Date"
              />

              <div className="p-4 sm:p-5">
                <Field label="Payment due" htmlFor="dueDate">
                  <Input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    disabled={isPending}
                  />
                </Field>
              </div>
            </div>

            {/*===== NOTES =====*/}

            <div className="border border-border bg-background/25">
              <FormSectionHeader
                icon={FileText}
                eyebrow="Client context"
                title="Invoice Notes"
              />

              <div className="p-4 sm:p-5">
                <Field label="Notes" htmlFor="notes">
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any notes for the client..."
                    rows={3}
                    disabled={isPending}
                    className="min-h-[100px] resize-y"
                  />
                </Field>

                <p className="mt-2 text-[10px] leading-4 text-muted-foreground">
                  Optional information that should accompany this invoice.
                </p>
              </div>
            </div>
          </div>

          {/*===== ACTION BAR =====*/}

          <div className="relative z-10 shrink-0 flex flex-col-reverse gap-2 border-t border-border bg-muted/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="hidden items-center gap-2 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />

              <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/40">
                New invoice draft
              </span>
            </div>

            <div className="flex flex-col-reverse gap-2 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => setIsOpen(false)}
                disabled={isPending}
                className="!rounded-md"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={isPending}
                className="!rounded-md"
              >
                <Plus className="h-4 w-4" />

                <span className="ml-2">
                  {isPending ? "Creating..." : "Create Invoice"}
                </span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

//==============================================================//
// FORM SECTION HEADER
//==============================================================//

function FormSectionHeader({
  icon: Icon,
  eyebrow,
  title,
}: {
  icon: typeof ReceiptText;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-border bg-muted/10 px-4 py-3.5 sm:px-5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-card text-secondary">
        <Icon className="h-3.5 w-3.5" />
      </div>

      <div>
        <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
          {eyebrow}
        </span>

        <h3 className="mt-0.5 text-sm font-semibold text-heading">
          {title}
        </h3>
      </div>
    </div>
  );
}

//==============================================================//
// FIELD
//==============================================================//

function Field({
  label,
  htmlFor,
  required = false,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 flex items-center gap-1 text-xs font-semibold text-heading"
      >
        {label}

        {required && <span className="text-destructive">*</span>}
      </label>

      {children}
    </div>
  );
}
