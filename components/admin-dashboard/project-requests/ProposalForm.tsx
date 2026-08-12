"use client";

//===== imports =====//
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { upsertProposal } from "@/lib/actions/proposals/proposal.action";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/TextArea";
import { CURRENCY_OPTIONS } from "@/lib/utils/currencies";

interface ProposalFormProps {
  briefId: string;
  initialData?: {
    scope: string;
    deliverables: string;
    timeline: string;
    amount: number | null;
    currency: string;
    terms: string | null;
  };
  onSuccess?: () => void;
}

export function ProposalForm({
  briefId,
  initialData,
  onSuccess,
}: ProposalFormProps) {
  const [scope, setScope] = useState(initialData?.scope || "");
  const [deliverables, setDeliverables] = useState(
    initialData?.deliverables || "",
  );
  const [timeline, setTimeline] = useState(initialData?.timeline || "");
  const [amount, setAmount] = useState(initialData?.amount?.toString() || "");
  const [currency, setCurrency] = useState(initialData?.currency || "EUR");
  const [terms, setTerms] = useState(initialData?.terms || "");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await upsertProposal({
        briefId,
        scope,
        deliverables,
        timeline,
        amount: amount ? parseFloat(amount) : undefined,
        currency,
        terms: terms || undefined,
      });

      if (result.success) {
        toast.success("Proposal saved successfully");
        router.refresh();
        onSuccess?.();
      } else {
        toast.error(result.error || "Failed to save proposal");
      }
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-foreground">
        {initialData ? "Edit Proposal" : "Create Proposal"}
      </h2>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label
            htmlFor="scope"
            className="text-sm font-medium text-foreground"
          >
            Scope <span className="text-destructive">*</span>
          </label>
          <Textarea
            id="scope"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            placeholder="What work will be done?"
            className="mt-1 min-h-[100px]"
            required
          />
        </div>

        <div>
          <label
            htmlFor="deliverables"
            className="text-sm font-medium text-foreground"
          >
            Deliverables <span className="text-destructive">*</span>
          </label>
          <Textarea
            id="deliverables"
            value={deliverables}
            onChange={(e) => setDeliverables(e.target.value)}
            placeholder="What will the client receive?"
            className="mt-1 min-h-[100px]"
            required
          />
        </div>

        <div>
          <label
            htmlFor="timeline"
            className="text-sm font-medium text-foreground"
          >
            Timeline <span className="text-destructive">*</span>
          </label>
          <Textarea
            id="timeline"
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            placeholder="Estimated timeline (e.g., 4 weeks)"
            className="mt-1 min-h-[80px]"
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="amount"
              className="text-sm font-medium text-foreground"
            >
              Amount
            </label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g., 5000"
              className="mt-1"
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
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-secondary"
            >
              {CURRENCY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="terms"
            className="text-sm font-medium text-foreground"
          >
            Terms & Conditions
          </label>
          <Textarea
            id="terms"
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
            placeholder="Payment terms, deadlines, etc."
            className="mt-1 min-h-[80px]"
          />
        </div>

        <div className="flex gap-3">
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save Proposal"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
