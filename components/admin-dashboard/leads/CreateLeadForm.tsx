"use client";

//===== imports =====//
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  BriefcaseBusiness,
  CalendarClock,
  CircleDollarSign,
  ContactRound,
  FileText,
  Target,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/TextArea";

import {
  createAdminLead,
  type CreateAdminLeadInput,
} from "@/lib/actions/leads/admin-lead.action";

import {
  serviceLabels,
  type LeadService,
} from "@/types/dashboard/admin/leadTypes";

import { CURRENCY_OPTIONS, type Currency } from "@/lib/utils/currencies";

//==============================================================//
// OPTIONS
//==============================================================//

const serviceOptions = Object.entries(serviceLabels).map(([value, label]) => ({
  value,
  label,
}));

const priorityOptions = [
  {
    value: "high",
    label: "High",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "low",
    label: "Low",
  },
];

const industryOptions = [
  {
    value: "fashion",
    label: "Fashion Tech",
  },
  {
    value: "it",
    label: "IT & Software",
  },
  {
    value: "medical",
    label: "Medical Industry",
  },
  {
    value: "beauty",
    label: "Beauty Industry",
  },
  {
    value: "restaurant",
    label: "Restaurant & Cafe",
  },
];

const budgetRanges = [
  {
    value: "under-10k",
    min: 0,
    max: 10000,
  },
  {
    value: "10k-25k",
    min: 10000,
    max: 25000,
  },
  {
    value: "25k-50k",
    min: 25000,
    max: 50000,
  },
  {
    value: "50k-100k",
    min: 50000,
    max: 100000,
  },
  {
    value: "100k-plus",
    min: 100000,
    max: Infinity,
  },
];

//==============================================================//
// CURRENCY SYMBOL
//==============================================================//

function getCurrencySymbol(currency: Currency) {
  switch (currency) {
    case "EUR":
      return "€";

    case "GBP":
      return "£";

    case "CHF":
      return "CHF";

    case "BDT":
      return "৳";

    default:
      return "$";
  }
}

//==============================================================//
// INITIAL DATA
//==============================================================//

const createInitialFormData = (): CreateAdminLeadInput => ({
  name: "",
  email: "",
  phone: "",
  companyName: "",
  industry: "it",
  services: ["web-development"],
  priority: "medium",
  budget: "under-10k",
  currency: "USD",
  assignedTo: "",
  description: "",
  nextFollowUp: "",
});

//==============================================================//
// CREATE LEAD FORM
//==============================================================//

export function CreateLeadForm() {
  //===== state =====//
  const [formData, setFormData] = useState(createInitialFormData);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  //===== budget options =====//
  const budgetOptions = budgetRanges.map((range) => {
    const symbol = getCurrencySymbol(formData.currency);

    const minimum = range.min.toLocaleString("en-US");

    const maximum =
      range.max === Infinity ? "+" : range.max.toLocaleString("en-US");

    return {
      value: range.value,
      label: `${symbol}${minimum} – ${symbol}${maximum}`,
    };
  });

  //===== update field =====//
  const updateField = <K extends keyof CreateAdminLeadInput>(
    field: K,
    value: CreateAdminLeadInput[K],
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  //===== submit =====//
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      const result = await createAdminLead(formData);

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Lead created successfully");

      router.push(`/admin/dashboard/leads/${result.data.id}`);
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative min-w-0 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
    >
      {/*===== FORM HEADER =====*/}

      <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
            Lead record
          </span>

          <h2 className="mt-1 text-base font-semibold text-heading">
            New prospect intake
          </h2>
        </div>

        <span className="font-mono text-[7px] uppercase tracking-[0.13em] text-muted-foreground/40">
          Required fields marked *
        </span>
      </div>

      {/*===== PRIMARY INFORMATION =====*/}

      <div className="grid min-w-0 lg:grid-cols-2">
        {/*===== CONTACT INFORMATION =====*/}

        <FormSection
          icon={ContactRound}
          eyebrow="Identity"
          title="Contact Information"
          description="Primary contact and company details for the incoming prospect."
          className="border-b border-border lg:border-b-0 lg:border-r"
        >
          <FormField label="Contact name" required>
            <Input
              name="name"
              placeholder="Contact name"
              value={formData.name}
              onChange={(event) => updateField("name", event.target.value)}
              required
            />
          </FormField>

          <FormField label="Email address" required>
            <Input
              name="email"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(event) => updateField("email", event.target.value)}
              required
            />
          </FormField>

          <FormField label="Phone number">
            <Input
              name="phone"
              type="tel"
              placeholder="Phone number"
              value={formData.phone}
              onChange={(event) => updateField("phone", event.target.value)}
            />
          </FormField>

          <FormField label="Company name">
            <Input
              name="companyName"
              placeholder="Company name"
              value={formData.companyName}
              onChange={(event) =>
                updateField("companyName", event.target.value)
              }
            />
          </FormField>

          <FormField label="Industry">
            <Select
              options={industryOptions}
              value={formData.industry ?? "it"}
              onChange={(value) => updateField("industry", value)}
            />
          </FormField>
        </FormSection>

        {/*===== LEAD DETAILS =====*/}

        <FormSection
          icon={Target}
          eyebrow="Qualification"
          title="Lead Details"
          description="Commercial context, priority, budget, ownership, and next action."
        >
          <FormField label="Service interest">
            <Select
              options={serviceOptions}
              value={formData.services[0]}
              onChange={(value) =>
                updateField("services", [value as LeadService])
              }
            />
          </FormField>

          <FormField label="Priority">
            <Select
              options={priorityOptions}
              value={formData.priority}
              onChange={(value) =>
                updateField(
                  "priority",
                  value as CreateAdminLeadInput["priority"],
                )
              }
            />
          </FormField>

          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_140px]">
            <FormField label="Budget">
              <Select
                options={budgetOptions}
                value={formData.budget ?? "under-10k"}
                onChange={(value) => updateField("budget", value)}
              />
            </FormField>

            <FormField label="Currency">
              <Select
                options={CURRENCY_OPTIONS}
                value={formData.currency}
                onChange={(value) =>
                  updateField(
                    "currency",
                    value as CreateAdminLeadInput["currency"],
                  )
                }
              />
            </FormField>
          </div>

          <FormField label="Assigned to">
            <Input
              name="assignedTo"
              placeholder="Assigned to"
              value={formData.assignedTo}
              onChange={(event) =>
                updateField("assignedTo", event.target.value)
              }
            />
          </FormField>

          <FormField label="Next follow-up">
            <Input
              name="nextFollowUp"
              type="date"
              value={formData.nextFollowUp}
              onChange={(event) =>
                updateField("nextFollowUp", event.target.value)
              }
            />
          </FormField>
        </FormSection>
      </div>

      {/*===== QUALIFICATION NOTES =====*/}

      <div className="border-t border-border bg-background/15 px-5 py-5 sm:px-6">
        <div className="grid gap-5 xl:grid-cols-[220px_minmax(0,1fr)]">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="h-3.5 w-3.5 text-secondary" />

              <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
                Qualification notes
              </span>
            </div>

            <h3 className="mt-2 text-sm font-semibold text-heading">
              Call notes / lead requirements
            </h3>

            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Capture the prospect’s problem, requirements, context, and agreed
              next steps.
            </p>
          </div>

          <div className="min-w-0">
            <label htmlFor="description" className="sr-only">
              Call notes / lead requirements
            </label>

            <Textarea
              id="description"
              name="description"
              rows={7}
              placeholder="Record the call summary, requirements, and next steps..."
              value={formData.description}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              required
            />
          </div>
        </div>
      </div>

      {/*===== COMMERCIAL SUMMARY STRIP =====*/}

      <div className="grid border-t border-border bg-muted/10 sm:grid-cols-3">
        <SummaryItem icon={Target} label="Priority" value={formData.priority} />

        <SummaryItem
          icon={CircleDollarSign}
          label="Budget range"
          value={
            budgetOptions.find((option) => option.value === formData.budget)
              ?.label ??
            formData.budget ??
            "—"
          }
        />

        <SummaryItem
          icon={CalendarClock}
          label="Follow-up"
          value={formData.nextFollowUp || "Not scheduled"}
        />
      </div>

      {/*===== ACTIONS =====*/}

      <div className="flex flex-col-reverse gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-mono text-[7px] uppercase tracking-[0.13em] text-muted-foreground/40">
          New lead will enter the CRM pipeline
        </p>

        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <Button
            variant="outline"
            type="button"
            onClick={() => router.push("/admin/dashboard/leads")}
            disabled={isPending}
            className="!rounded-md"
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            type="submit"
            disabled={isPending}
            className="!rounded-md"
          >
            {isPending ? "Creating..." : "Create Lead"}
          </Button>
        </div>
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
  className = "",
}: {
  icon: typeof ContactRound;
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`
        min-w-0
        px-5 py-5
        sm:px-6
        lg:px-7
        lg:py-6
        ${className}
      `}
    >
      <div className="flex items-start gap-3 border-b border-border pb-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-secondary">
          <Icon className="h-4 w-4" />
        </div>

        <div>
          <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
            {eyebrow}
          </span>

          <h2 className="mt-1 text-base font-semibold text-heading">
            {title}
          </h2>

          <p className="mt-1 max-w-md text-xs leading-5 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

//==============================================================//
// FORM FIELD
//==============================================================//

function FormField({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  icon?: typeof BriefcaseBusiness;
  children: React.ReactNode;
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-1.5 block text-xs font-semibold text-heading">
        {label}

        {required && <span className="ml-1 text-secondary">*</span>}
      </span>

      {children}
    </label>
  );
}

//==============================================================//
// SUMMARY ITEM
//==============================================================//

function SummaryItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Target;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3 border-b border-border px-5 py-3.5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 sm:px-6">
      <Icon className="h-3.5 w-3.5 shrink-0 text-secondary" />

      <div className="min-w-0">
        <p className="font-mono text-[7px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/40">
          {label}
        </p>

        <p
          className="mt-0.5 truncate text-xs font-semibold capitalize text-heading"
          title={value}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
