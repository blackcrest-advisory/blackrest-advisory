"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
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

const serviceOptions = Object.entries(serviceLabels).map(([value, label]) => ({
  value,
  label,
}));

const priorityOptions = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const industryOptions = [
  { value: "fashion", label: "Fashion Tech" },
  { value: "it", label: "IT & Software" },
  { value: "medical", label: "Medical Industry" },
  { value: "beauty", label: "Beauty Industry" },
  { value: "restaurant", label: "Restaurant & Cafe" },
];

const budgetRanges = [
  { value: "under-10k", min: 0, max: 10000 },
  { value: "10k-25k", min: 10000, max: 25000 },
  { value: "25k-50k", min: 25000, max: 50000 },
  { value: "50k-100k", min: 50000, max: 100000 },
  { value: "100k-plus", min: 100000, max: Infinity },
];

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

export function CreateLeadForm() {
  const [formData, setFormData] = useState(createInitialFormData);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

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

  const updateField = <K extends keyof CreateAdminLeadInput>(
    field: K,
    value: CreateAdminLeadInput[K],
  ) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Contact Information
          </h2>
          <Input
            name="name"
            placeholder="Contact name *"
            value={formData.name}
            onChange={(event) => updateField("name", event.target.value)}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="Email address *"
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
            required
          />
          <Input
            name="phone"
            type="tel"
            placeholder="Phone number"
            value={formData.phone}
            onChange={(event) => updateField("phone", event.target.value)}
          />
          <Input
            name="companyName"
            placeholder="Company name"
            value={formData.companyName}
            onChange={(event) => updateField("companyName", event.target.value)}
          />
          <Select
            options={industryOptions}
            value={formData.industry ?? "it"}
            onChange={(value) => updateField("industry", value)}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Lead Details
          </h2>
          <Select
            options={serviceOptions}
            value={formData.services[0]}
            onChange={(value) =>
              updateField("services", [value as LeadService])
            }
          />
          <Select
            options={priorityOptions}
            value={formData.priority}
            onChange={(value) =>
              updateField("priority", value as CreateAdminLeadInput["priority"])
            }
          />
          <Select
            options={budgetOptions}
            value={formData.budget ?? "under-10k"}
            onChange={(value) => updateField("budget", value)}
          />
          <Select
            options={CURRENCY_OPTIONS}
            value={formData.currency}
            onChange={(value) =>
              updateField("currency", value as CreateAdminLeadInput["currency"])
            }
          />
          <Input
            name="assignedTo"
            placeholder="Assigned to"
            value={formData.assignedTo}
            onChange={(event) => updateField("assignedTo", event.target.value)}
          />
          <Input
            name="nextFollowUp"
            type="date"
            value={formData.nextFollowUp}
            onChange={(event) =>
              updateField("nextFollowUp", event.target.value)
            }
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-body"
        >
          Call notes / lead requirements *
        </label>
        <Textarea
          id="description"
          name="description"
          rows={6}
          placeholder="Record the call summary, requirements, and next steps..."
          value={formData.description}
          onChange={(event) => updateField("description", event.target.value)}
          required
        />
      </div>

      <div className="flex flex-wrap justify-end gap-3 border-t border-border pt-6">
        <Button
          variant="outline"
          type="button"
          onClick={() => router.push("/admin/dashboard/leads")}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button variant="primary" type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Lead"}
        </Button>
      </div>
    </form>
  );
}
