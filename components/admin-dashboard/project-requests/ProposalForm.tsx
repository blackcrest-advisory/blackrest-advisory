"use client";

//===== imports =====//
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Banknote,
  BriefcaseBusiness,
  Clock3,
  FileCheck2,
  FileText,
  ReceiptText,
} from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/TextArea";

import { upsertProposal } from "@/lib/actions/proposals/proposal.action";
import { CURRENCY_OPTIONS } from "@/lib/utils/currencies";

//===== types =====//
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
  //===== state =====//
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

  //===== submit =====//
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

  //===== render =====//
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/*===== FORM INTRO =====*/}

      <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-secondary/15 bg-secondary/[0.05] text-secondary">
            <FileText className="h-4 w-4" />
          </div>

          <div>
            <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-secondary">
              Proposal details
            </span>

            <h3 className="mt-1 text-base font-semibold text-heading">
              {initialData
                ? "Edit proposal details"
                : "Prepare client proposal"}
            </h3>

            <p className="mt-1 max-w-xl text-xs leading-5 text-muted-foreground">
              Define the scope, deliverables, commercial terms and expected
              timeline for this engagement.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:pt-1">
          <span className="h-1.5 w-1.5 rounded-full bg-warning"/>

          <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/40">
            Draft proposal
          </span>
        </div>
      </div>

      {/*===== SCOPE + DELIVERABLES =====*/}

      <FormSection
        icon={BriefcaseBusiness}
        eyebrow="Engagement"
        title="Scope & Deliverables"
        description="Define exactly what the engagement covers and what the client will receive."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {/* scope */}
          <Field label="Scope" htmlFor="scope" required>
            <Textarea
              id="scope"
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              placeholder="What work will be done?"
              className="min-h-[130px] resize-y"
              required
            />
          </Field>

          {/* deliverables */}
          <Field label="Deliverables" htmlFor="deliverables" required>
            <Textarea
              id="deliverables"
              value={deliverables}
              onChange={(e) => setDeliverables(e.target.value)}
              placeholder="What will the client receive?"
              className="min-h-[130px] resize-y"
              required
            />
          </Field>
        </div>
      </FormSection>

      {/*===== TIMELINE =====*/}

      <FormSection
        icon={Clock3}
        eyebrow="Delivery"
        title="Timeline"
        description="Set expectations for the anticipated delivery period."
      >
        <Field label="Estimated timeline" htmlFor="timeline" required>
          <Textarea
            id="timeline"
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            placeholder="Estimated timeline (e.g., 4 weeks)"
            className="min-h-[90px] resize-y"
            required
          />
        </Field>
      </FormSection>

      {/*===== COMMERCIAL =====*/}

      <FormSection
        icon={Banknote}
        eyebrow="Commercial"
        title="Pricing"
        description="Set the proposed amount and billing currency."
      >
        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_220px]">
          {/* amount */}
          <Field label="Amount" htmlFor="amount">
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g., 5000"
              className="w-full"
            />
          </Field>

          {/* currency */}
          <Field label="Currency" htmlFor="currency">
            <div className="relative">
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground shadow-sm outline-none transition-colors hover:border-secondary/30 focus:border-secondary/40 focus:ring-2 focus:ring-secondary/10"
              >
                {CURRENCY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </Field>
        </div>
      </FormSection>

      {/*===== TERMS =====*/}

      <FormSection
        icon={ReceiptText}
        eyebrow="Agreement"
        title="Terms & Conditions"
        description="Add payment terms, conditions, milestones or other commercial requirements."
      >
        <Field label="Terms & Conditions" htmlFor="terms">
          <Textarea
            id="terms"
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
            placeholder="Payment terms, deadlines, etc."
            className="min-h-[110px] resize-y"
          />
        </Field>
      </FormSection>

      {/*===== ACTION BAR =====*/}

      <div className="flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <FileCheck2 className="h-3.5 w-3.5 text-secondary"/>

          <span className="text-xs text-muted-foreground">
            Required fields must be completed before saving.
          </span>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={isPending}
          className="w-full !rounded-md sm:w-auto"
        >
          {isPending
            ? "Saving..."
            : initialData
              ? "Save Changes"
              : "Save Proposal"}
        </Button>
      </div>
    </form>
  );
}

//==============================================================//
// FORM SECTION
//==============================================================//

function FormSection({
  icon: Icon,
  eyebrow,
  title,
  description,
  children,
}: {
  icon: typeof FileText;
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-border bg-background/25">
      {/* section header */}
      <div className="flex items-start gap-3 border-b border-border bg-muted/10 px-4 py-4 sm:px-5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-card text-secondary">
          <Icon className="h-3.5 w-3.5" />
        </div>

        <div>
          <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/40">
            {eyebrow}
          </span>

          <h4 className="mt-0.5 text-sm font-semibold text-heading">
            {title}
          </h4>

          <p className="mt-1 max-w-2xl text-xs leading-5 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      {/* fields */}
      <div className="px-4 py-5 sm:px-5">
        {children}
      </div>
    </section>
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

        {required && (
          <span className="text-destructive">
            *
          </span>
        )}
      </label>

      {children}
    </div>
  );
}
