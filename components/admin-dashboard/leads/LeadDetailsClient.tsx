"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ChevronLeft, Edit, Mail, Phone, Trash2, UserCheck } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import { LeadDetailModal } from "@/components/admin-dashboard/leads/LeadDetailModal";
import { LeadStatusBadge } from "@/components/admin-dashboard/leads/LeadStatusBadge";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import {
  convertAdminLead,
  deleteAdminLead,
  updateAdminLead,
  type AdminLeadDetails,
} from "@/lib/actions/leads/admin-lead.action";
import {
  serviceLabels,
  type Lead,
} from "@/types/dashboard/admin/leadTypes";

function readMetadata(notes?: string) {
  if (!notes) return null;

  try {
    const value: unknown = JSON.parse(notes);
    return value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

export function LeadDetailsClient({
  lead: initialLead,
  initialEdit,
}: {
  lead: AdminLeadDetails;
  initialEdit: boolean;
}) {
  const [lead, setLead] = useState(initialLead);
  const [isEditing, setIsEditing] = useState(initialEdit);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const metadata = readMetadata(lead.notes);

  const handleSave = async (updatedLead: Lead) => {
    try {
      const savedLead = await updateAdminLead(updatedLead.id, updatedLead);
      setLead({ ...lead, ...savedLead });
      toast.success("Lead updated successfully");
    } catch {
      toast.error("Failed to update lead");
    }
  };

  const handleConvert = async () => {
    try {
      const convertedLead = await convertAdminLead(lead.id);
      setLead({ ...lead, ...convertedLead });
      toast.success(`${lead.companyName} converted to client!`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to convert lead");
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteAdminLead(lead.id);
      toast.success("Lead deleted");
      router.push("/admin/dashboard/leads");
    } catch {
      toast.error("Failed to delete lead");
      setIsDeleting(false);
    }
  };

  const closeEditModal = () => {
    setIsEditing(false);
    router.replace(`/admin/dashboard/leads/${lead.id}`);
  };

  return (
    <div className="space-y-6">
      <Link
        href="/admin/dashboard/leads"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        All Leads
      </Link>

      <Card padding="lg">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Lead Details
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-semibold text-foreground">
                {lead.companyName || lead.contactPerson}
              </h1>
              <LeadStatusBadge status={lead.status} />
              <PriorityBadge priority={lead.priority} />
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span>{lead.contactPerson}</span>
              <span>Created {format(lead.createdAt, "MMM d, yyyy")}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="primary" size="sm" onClick={handleConvert}>
              <UserCheck className="mr-2 h-4 w-4" />
              Convert to Client
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <h2 className="text-lg font-semibold text-foreground">Project Inquiry</h2>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-body">
              {lead.problem}
            </p>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold text-foreground">Project Information</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-muted-foreground">Services</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {lead.services.length ? lead.services.map((service) => (
                    <span key={service} className="rounded-full bg-muted px-2.5 py-1 text-xs text-body">
                      {serviceLabels[service]}
                    </span>
                  )) : <span className="text-sm text-muted-foreground">Not specified</span>}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Project type</dt>
                <dd className="mt-1 text-sm font-medium text-foreground">
                  {lead.pillar?.replaceAll("_", " ") || "Not specified"}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Project title</dt>
                <dd className="mt-1 text-sm font-medium text-foreground">
                  {typeof metadata?.projectTitle === "string" ? metadata.projectTitle : "Not specified"}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Budget</dt>
                <dd className="mt-1 text-sm font-medium text-foreground">{lead.budget || "Not specified"}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Timeline</dt>
                <dd className="mt-1 text-sm font-medium text-foreground">
                  {typeof metadata?.timeline === "string" ? metadata.timeline : "Not specified"}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Currency</dt>
                <dd className="mt-1 text-sm font-medium text-foreground">
                  {typeof metadata?.currency === "string" ? metadata.currency : "Not specified"}
                </dd>
              </div>
            </dl>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-semibold text-foreground">Contact Information</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div><dt className="text-muted-foreground">Contact person</dt><dd className="mt-1 font-medium text-foreground">{lead.contactPerson}</dd></div>
              <div><dt className="flex items-center gap-1.5 text-muted-foreground"><Mail className="h-3.5 w-3.5" />Email</dt><dd className="mt-1 break-all font-medium text-foreground">{lead.email}</dd></div>
              <div><dt className="flex items-center gap-1.5 text-muted-foreground"><Phone className="h-3.5 w-3.5" />Phone</dt><dd className="mt-1 font-medium text-foreground">{lead.phone || "Not specified"}</dd></div>
              <div><dt className="text-muted-foreground">Industry</dt><dd className="mt-1 font-medium text-foreground">{lead.industry || "Not specified"}</dd></div>
              <div><dt className="text-muted-foreground">Assigned to</dt><dd className="mt-1 font-medium text-foreground">{lead.assignedTo || "Unassigned"}</dd></div>
            </dl>
          </Card>

          {typeof metadata?.attachmentUrl === "string" && (
            <Card>
              <h2 className="text-lg font-semibold text-foreground">Attachment</h2>
              <a href={metadata.attachmentUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm font-medium text-secondary hover:text-accent-hover">
                View uploaded file
              </a>
            </Card>
          )}
        </div>
      </div>

      <LeadDetailModal
        lead={lead}
        isOpen={isEditing}
        onClose={closeEditModal}
        onSave={handleSave}
        mode="edit"
      />
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Lead"
        description={`Are you sure you want to delete "${lead.companyName || lead.contactPerson}"? This action cannot be undone.`}
        confirmLabel="Delete"
        isPending={isDeleting}
      />
    </div>
  );
}
