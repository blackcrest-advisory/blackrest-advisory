"use client";

//===== imports =====//
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createInvoice } from "@/lib/actions/projects/invoice.action";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/TextArea";
import { CURRENCY_OPTIONS } from "@/lib/utils/currencies";

interface CreateInvoiceModalProps {
  projectId: string;
  onSuccess?: () => void;
}

export function CreateInvoiceModal({
  projectId,
  onSuccess,
}: CreateInvoiceModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

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

  if (!isOpen) {
    return (
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        <Plus className="h-4 w-4 mr-1" />
        Create Invoice
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-2xl bg-card p-6 shadow-xl ring-1 ring-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Create Invoice
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-muted-foreground hover:text-foreground"
            disabled={isPending}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="amount"
              className="text-sm font-medium text-foreground"
            >
              Amount <span className="text-destructive">*</span>
            </label>
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
          </div>

          <div>
            <label
              htmlFor="currency"
              className="text-sm font-medium text-foreground"
            >
              Currency
            </label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-secondary"
              disabled={isPending}
            >
              {CURRENCY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="text-sm font-medium text-foreground"
            >
              Due Date
            </label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              disabled={isPending}
            />
          </div>

          <div>
            <label
              htmlFor="notes"
              className="text-sm font-medium text-foreground"
            >
              Notes (optional)
            </label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes for the client..."
              rows={3}
              disabled={isPending}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => setIsOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isPending}
            >
              {isPending ? "Creating..." : "Create Invoice"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
