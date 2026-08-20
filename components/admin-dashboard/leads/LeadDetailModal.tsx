"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  BriefcaseBusiness,
  CalendarDays,
  CircleDot,
  FileText,
  Mail,
  MapPin,
  Phone,
  Save,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";

import {
  Lead,
  LeadPriority,
  LeadService,
  LeadStatus,
  leadStatusLabels,
  serviceLabels,
} from "@/types/dashboard/admin/leadTypes";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

//===== Types =====//
interface LeadDetailModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedLead: Lead) => void;
  mode: "view" | "edit";
}

//===== Options =====//
const statusOptions = Object.entries(leadStatusLabels).map(
  ([value, label]) => ({
    value,
    label,
  }),
);

const priorityOptions = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const serviceOptions = Object.entries(serviceLabels).map(([value, label]) => ({
  value,
  label,
}));

export const LeadDetailModal = ({
  lead,
  isOpen,
  onClose,
  onSave,
  mode,
}: LeadDetailModalProps) => {
  const [editedLead, setEditedLead] = useState<Lead | null>(null);

  useEffect(() => {
    if (lead) {
      setEditedLead({ ...lead });
    }
  }, [lead]);

  if (!isOpen || !lead) {
    return null;
  }

  const isEditing = mode === "edit";

  //===== Change field =====//
  const handleChange = <K extends keyof Lead>(field: K, value: Lead[K]) => {
    if (!editedLead) return;

    setEditedLead({
      ...editedLead,
      [field]: value,
    });
  };

  //===== Save =====//
  const handleSave = () => {
    if (editedLead) {
      onSave(editedLead);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-deep/70 p-3 backdrop-blur-[3px] sm:p-5"
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden border border-border bg-card shadow-[var(--shadow-overlay)]"
      >
        {/*===== TOP SIGNAL =====*/}

        <div
          className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/35 to-transparent"
        />

        {/*===== HEADER =====*/}

        <div
          className="flex shrink-0 items-start justify-between gap-5 border-b border-border px-5 py-5 sm:px-6"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <CircleDot className="h-3.5 w-3.5 text-secondary" />

              <span
                className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary"
              >
                {isEditing ? "Lead management" : "Lead record"}
              </span>
            </div>

            <h2
              className="mt-2 text-xl font-semibold tracking-[-0.03em] text-heading sm:text-2xl"
            >
              {isEditing ? "Edit Lead" : "Lead Details"}
            </h2>

            <p
              className="mt-1 text-xs text-muted-foreground"
            >
              {lead.companyName || lead.contactPerson}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close lead dialog"
            className="flex h-9 w-9 shrink-0 items-center justify-center border border-transparent text-muted-foreground transition-colors hover:border-border hover:bg-muted/30 hover:text-heading"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/*===== SCROLLABLE CONTENT =====*/}

        <div
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
        >
          {/*===== CONTACT =====*/}

          <FormSection
            eyebrow="Identity"
            title="Lead Information"
            icon={UserRound}
          >
            <div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <Field label="Company">
                {isEditing ? (
                  <Input
                    value={editedLead?.companyName || ""}
                    onChange={(e) =>
                      handleChange("companyName", e.target.value)
                    }
                    className="w-full"
                  />
                ) : (
                  <ReadValue value={lead.companyName} />
                )}
              </Field>

              <Field label="Contact Person">
                {isEditing ? (
                  <Input
                    value={editedLead?.contactPerson || ""}
                    onChange={(e) =>
                      handleChange("contactPerson", e.target.value)
                    }
                    className="w-full"
                  />
                ) : (
                  <ReadValue value={lead.contactPerson} />
                )}
              </Field>

              <Field label="Email" icon={Mail}>
                {isEditing ? (
                  <Input
                    value={editedLead?.email || ""}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <ReadValue value={lead.email} breakValue />
                )}
              </Field>

              <Field label="Phone" icon={Phone}>
                {isEditing ? (
                  <Input
                    value={editedLead?.phone || ""}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <ReadValue value={lead.phone || "Not specified"} />
                )}
              </Field>

              <Field label="Industry" icon={BriefcaseBusiness}>
                {isEditing ? (
                  <Input
                    value={editedLead?.industry || ""}
                    onChange={(e) => handleChange("industry", e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <ReadValue value={lead.industry || "Not specified"} />
                )}
              </Field>

              <Field label="Location" icon={MapPin}>
                {isEditing ? (
                  <Input
                    value={editedLead?.location || ""}
                    onChange={(e) => handleChange("location", e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <ReadValue value={lead.location || "Not specified"} />
                )}
              </Field>
            </div>
          </FormSection>

          {/*===== PIPELINE =====*/}

          <FormSection
            eyebrow="Qualification"
            title="Pipeline Information"
            icon={BriefcaseBusiness}
          >
            <div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <Field label="Status">
                {isEditing ? (
                  <Select
                    options={statusOptions}
                    value={editedLead?.status || "new"}
                    onChange={(value) =>
                      handleChange("status", value as LeadStatus)
                    }
                    className="w-full"
                  />
                ) : (
                  <ReadValue value={leadStatusLabels[lead.status]} />
                )}
              </Field>

              <Field label="Priority">
                {isEditing ? (
                  <Select
                    options={priorityOptions}
                    value={editedLead?.priority || "medium"}
                    onChange={(value) =>
                      handleChange("priority", value as LeadPriority)
                    }
                    className="w-full"
                  />
                ) : (
                  <ReadValue value={lead.priority} capitalize />
                )}
              </Field>

              <Field label="Services" className="sm:col-span-2">
                {isEditing ? (
                  <Select
                    options={serviceOptions}
                    value={editedLead?.services?.[0] || "web-development"}
                    onChange={(value) =>
                      handleChange("services", [value as LeadService])
                    }
                    className="w-full"
                  />
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {lead.services.map((service) => (
                      <span
                        key={service}
                        className="inline-flex items-center border border-border bg-muted/20 px-2.5 py-1.5 text-[10px] font-medium text-muted-foreground"
                      >
                        {serviceLabels[service]}
                      </span>
                    ))}
                  </div>
                )}
              </Field>

              <Field label="Assigned To" className="sm:col-span-2">
                {isEditing ? (
                  <Input
                    value={editedLead?.assignedTo || ""}
                    onChange={(e) => handleChange("assignedTo", e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <ReadValue value={lead.assignedTo || "Unassigned"} />
                )}
              </Field>
            </div>
          </FormSection>

          {/*===== COMMERCIAL =====*/}

          <FormSection
            eyebrow="Commercial"
            title="Budget & Activity"
            icon={WalletCards}
          >
            <div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <Field label="Budget" icon={WalletCards}>
                {isEditing ? (
                  <Input
                    value={editedLead?.budget || ""}
                    onChange={(e) => handleChange("budget", e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <ReadValue value={lead.budget || "Not specified"} />
                )}
              </Field>

              <Field label="Last Contacted" icon={CalendarDays}>
                <ReadValue
                  value={
                    lead.lastContacted
                      ? format(lead.lastContacted, "MMM d, yyyy")
                      : "Never"
                  }
                />
              </Field>
            </div>
          </FormSection>

          {/*===== NOTES =====*/}

          <FormSection
            eyebrow="Internal record"
            title="Notes"
            icon={FileText}
            noBorder
          >
            {isEditing ? (
              <textarea
                rows={4}
                value={editedLead?.notes || ""}
                onChange={(e) => handleChange("notes", e.target.value)}
                placeholder="Add internal notes..."
                className="w-full resize-y border border-border bg-background px-3 py-3 text-sm leading-6 text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-secondary/40 focus:ring-2 focus:ring-secondary/10"
              />
            ) : (
              <div
                className="border border-border bg-muted/10 px-4 py-4"
              >
                <p
                  className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground"
                >
                  {lead.notes || "No notes"}
                </p>
              </div>
            )}
          </FormSection>
        </div>

        {/*===== FOOTER =====*/}

        <div
          className="flex shrink-0 flex-col-reverse gap-2 border-t border-border bg-muted/15 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
        >
          <div className="hidden items-center gap-2 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />

            <span
              className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40"
            >
              Lead record loaded
            </span>
          </div>

          <div
            className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center"
          >
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto"
            >
              {isEditing ? "Cancel" : "Close"}
            </Button>

            {isEditing && (
              <Button
                variant="primary"
                onClick={handleSave}
                className="w-full sm:w-auto"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

//==============================================================//
// FORM SECTION
//==============================================================//

function FormSection({
  eyebrow,
  title,
  icon: Icon,
  children,
  noBorder = false,
}: {
  eyebrow: string;
  title: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  children: React.ReactNode;
  noBorder?: boolean;
}) {
  return (
    <section
      className={`
        px-5 py-6
        sm:px-6
        ${noBorder ? "" : "border-b border-border"}
      `}
    >
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <Icon className="h-3.5 w-3.5 text-secondary" />

          <span
            className="font-mono text-[8px] font-semibold uppercase tracking-[0.17em] text-secondary"
          >
            {eyebrow}
          </span>
        </div>

        <h3
          className="mt-2 text-base font-semibold tracking-[-0.02em] text-heading"
        >
          {title}
        </h3>
      </div>

      {children}
    </section>
  );
}

//==============================================================//
// FIELD
//==============================================================//

function Field({
  label,
  icon: Icon,
  children,
  className = "",
}: {
  label: string;
  icon?: React.ComponentType<{
    className?: string;
  }>;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div
        className="mb-2 flex items-center gap-1.5"
      >
        {Icon && <Icon className="h-3.5 w-3.5 text-secondary/70" />}

        <label
          className="font-mono text-[8px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/50"
        >
          {label}
        </label>
      </div>

      {children}
    </div>
  );
}

//==============================================================//
// READ VALUE
//==============================================================//

function ReadValue({
  value,
  capitalize = false,
  breakValue = false,
}: {
  value: string;
  capitalize?: boolean;
  breakValue?: boolean;
}) {
  return (
    <div
      className="min-h-10 border border-border bg-muted/10 px-3 py-2.5"
    >
      <p
        className={`
          text-sm
          font-medium
          text-heading
          ${capitalize ? "capitalize" : ""}
          ${breakValue ? "break-all" : ""}
        `}
      >
        {value}
      </p>
    </div>
  );
}
