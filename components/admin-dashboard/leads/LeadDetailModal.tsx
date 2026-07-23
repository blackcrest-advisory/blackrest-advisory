"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  Lead,
  LeadStatus,
  LeadPriority,
  LeadService,
  leadStatusLabels,
  serviceLabels,
} from "@/types/dashboard/admin/leadTypes";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { format } from "date-fns";

// We'll use a simple textarea with styling for now; if you have a Textarea component in ui, import it.

interface LeadDetailModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedLead: Lead) => void;
  mode: "view" | "edit";
}

const statusOptions = Object.entries(leadStatusLabels).map(
  ([value, label]) => ({ value, label }),
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
    if (lead) setEditedLead({ ...lead });
  }, [lead]);

  if (!isOpen || !lead) return null;

  const isEditing = mode === "edit";

  const handleChange = <K extends keyof Lead>(field: K, value: Lead[K]) => {
    if (!editedLead) return;
    setEditedLead({ ...editedLead, [field]: value });
  };

  const handleSave = () => {
    if (editedLead) {
      onSave(editedLead);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-border bg-card-bg p-6 shadow-xl">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 hover:bg-muted"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-semibold text-heading">
          {isEditing ? "Edit Lead" : "Lead Details"}
        </h2>

        <div className="mt-4 space-y-4">
          {/* Company / Contact */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-body">
                Company
              </label>
              {isEditing ? (
                <Input
                  value={editedLead?.companyName || ""}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 text-foreground">{lead.companyName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-body">
                Contact Person
              </label>
              {isEditing ? (
                <Input
                  value={editedLead?.contactPerson || ""}
                  onChange={(e) =>
                    handleChange("contactPerson", e.target.value)
                  }
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 text-foreground">{lead.contactPerson}</p>
              )}
            </div>
          </div>

          {/* Email / Phone */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-body">
                Email
              </label>
              {isEditing ? (
                <Input
                  value={editedLead?.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 text-foreground">{lead.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-body">
                Phone
              </label>
              {isEditing ? (
                <Input
                  value={editedLead?.phone || ""}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 text-foreground">{lead.phone}</p>
              )}
            </div>
          </div>

          {/* Industry / Location */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-body">
                Industry
              </label>
              {isEditing ? (
                <Input
                  value={editedLead?.industry || ""}
                  onChange={(e) => handleChange("industry", e.target.value)}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 text-foreground">{lead.industry}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-body">
                Location
              </label>
              {isEditing ? (
                <Input
                  value={editedLead?.location || ""}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 text-foreground">{lead.location}</p>
              )}
            </div>
          </div>

          {/* Status / Priority */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-body">
                Status
              </label>
              {isEditing ? (
                <Select
                  options={statusOptions}
                  value={editedLead?.status || "new"}
                  onChange={(v) => handleChange("status", v as LeadStatus)}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 text-foreground">
                  {leadStatusLabels[lead.status]}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-body">
                Priority
              </label>
              {isEditing ? (
                <Select
                  options={priorityOptions}
                  value={editedLead?.priority || "medium"}
                  onChange={(v) => handleChange("priority", v as LeadPriority)}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 text-foreground capitalize">
                  {lead.priority}
                </p>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <label className="block text-sm font-medium text-body">
              Services
            </label>
            {isEditing ? (
              <Select
                options={serviceOptions}
                value={editedLead?.services?.[0] || "web-development"} // simplified: multi-select not supported, just pick one for demo
                onChange={(v) => handleChange("services", [v as LeadService])}
                className="mt-1"
              />
            ) : (
              <div className="mt-1 flex flex-wrap gap-2">
                {lead.services.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-muted px-2 py-0.5 text-xs text-body"
                  >
                    {serviceLabels[s]}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Assigned To */}
          <div>
            <label className="block text-sm font-medium text-body">
              Assigned To
            </label>
            {isEditing ? (
              <Input
                value={editedLead?.assignedTo || ""}
                onChange={(e) => handleChange("assignedTo", e.target.value)}
                className="mt-1"
              />
            ) : (
              <p className="mt-1 text-foreground">{lead.assignedTo}</p>
            )}
          </div>

          {/* Budget / Dates */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-body">
                Budget
              </label>
              {isEditing ? (
                <Input
                  value={editedLead?.budget || ""}
                  onChange={(e) => handleChange("budget", e.target.value)}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 text-foreground">
                  {lead.budget || "Not specified"}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-body">
                Last Contacted
              </label>
              <p className="mt-1 text-foreground">
                {lead.lastContacted
                  ? format(lead.lastContacted, "MMM d, yyyy")
                  : "Never"}
              </p>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-body">Notes</label>
            {isEditing ? (
              <textarea
                rows={3}
                value={editedLead?.notes || ""}
                onChange={(e) => handleChange("notes", e.target.value)}
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/40"
              />
            ) : (
              <p className="mt-1 text-foreground">{lead.notes || "No notes"}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3 border-t border-border pt-4">
          <Button variant="outline" onClick={onClose}>
            {isEditing ? "Cancel" : "Close"}
          </Button>
          {isEditing && (
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
