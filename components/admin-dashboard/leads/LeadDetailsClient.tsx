"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  ChevronLeft,
  CircleDot,
  Edit,
  FileText,
  Mail,
  Paperclip,
  Phone,
  Target,
  Trash2,
  UserCheck,
  UserRound,
  WalletCards,
} from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/Button";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import { PriorityBadge } from "@/components/ui/PriorityBadge";

import { LeadDetailModal } from "@/components/admin-dashboard/leads/LeadDetailModal";
import { LeadStatusBadge } from "@/components/admin-dashboard/leads/LeadStatusBadge";

import {
  convertAdminLead,
  deleteAdminLead,
  updateAdminLead,
  type AdminLeadDetails,
} from "@/lib/actions/leads/admin-lead.action";

import { serviceLabels, type Lead } from "@/types/dashboard/admin/leadTypes";

//===== Metadata helper =====//
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

  //===== Save =====//
  const handleSave = async (updatedLead: Lead) => {
    try {
      const savedLead = await updateAdminLead(updatedLead.id, updatedLead);

      setLead({
        ...lead,
        ...savedLead,
      });

      toast.success("Lead updated successfully");
    } catch {
      toast.error("Failed to update lead");
    }
  };

  //===== Convert =====//
  const handleConvert = async () => {
    try {
      const convertedLead = await convertAdminLead(lead.id);

      setLead({
        ...lead,
        ...convertedLead,
      });

      toast.success(`${lead.companyName} converted to client!`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to convert lead",
      );
    }
  };

  //===== Delete =====//
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

  //===== Close edit =====//
  const closeEditModal = () => {
    setIsEditing(false);

    router.replace(`/admin/dashboard/leads/${lead.id}`);
  };

  return (
    <div className="relative space-y-6">
      {/*===== BACK =====*/}

      <div>
        <Link
          href="/admin/dashboard/leads"
          className="group inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-secondary"
        >
          <ChevronLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"/>
          All Leads
        </Link>
      </div>

      {/*===== LEAD HEADER =====*/}

      <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
        {/* subtle glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 -top-32 h-72 w-72 rounded-full bg-secondary/[0.07] blur-[100px]"
        />

        {/* top signal */}
        <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/35 to-transparent"/>

        <div className="relative z-10 grid gap-7 px-5 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:px-8 lg:py-7">
          {/* identity */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <CircleDot className="h-3.5 w-3.5 text-secondary" />

                <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
                  Lead record
                </span>
              </div>

              <span className="h-px w-8 bg-secondary/30" />

              <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground/40">
                #{lead.id.slice(-8)}
              </span>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <h1 className="min-w-0 text-3xl font-semibold tracking-[-0.045em] text-heading sm:text-4xl">
                {lead.companyName || lead.contactPerson}
              </h1>

              <div className="flex flex-wrap items-center gap-2">
                <LeadStatusBadge status={lead.status} />
                <PriorityBadge priority={lead.priority} />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <UserRound className="h-3.5 w-3.5 text-secondary" />

                {lead.contactPerson}
              </span>

              <span className="flex items-center gap-2">
                <CalendarDays className="h-3.5 w-3.5 text-secondary" />
                Created {format(lead.createdAt, "MMM d, yyyy")}
              </span>
            </div>
          </div>

          {/* actions */}
          <div className="flex flex-col gap-2 border-t border-border pt-5 sm:flex-row lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="justify-center"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={handleConvert}
              className="justify-center"
            >
              <UserCheck className="mr-2 h-4 w-4" />
              Convert to Client
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDeleteModalOpen(true)}
              className="justify-center hover:border-destructive/30 hover:bg-destructive/[0.05] hover:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        {/* bottom summary */}
        <div className="relative z-10 grid border-t border-border bg-muted/10 sm:grid-cols-3">
          <div className="px-5 py-3.5 sm:px-6">
            <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
              Pipeline status
            </p>

            <div className="mt-1.5">
              <LeadStatusBadge status={lead.status} />
            </div>
          </div>

          <div className="border-t border-border px-5 py-3.5 sm:border-l sm:border-t-0 sm:px-6">
            <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
              Priority
            </p>

            <div className="mt-1.5">
              <PriorityBadge priority={lead.priority} />
            </div>
          </div>

          <div className="border-t border-border px-5 py-3.5 sm:border-l sm:border-t-0 sm:px-6">
            <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
              Assigned owner
            </p>

            <p className="mt-1.5 text-sm font-medium text-heading">
              {lead.assignedTo || "Unassigned"}
            </p>
          </div>
        </div>
      </section>

      {/*===== DETAIL GRID =====*/}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.45fr)]">
        {/*===== MAIN COLUMN =====*/}

        <div className="space-y-6">
          {/* Project Inquiry */}
          <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/30 to-transparent"/>

            <div className="border-b border-border px-5 py-5 sm:px-6">
              <div className="flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-secondary" />

                <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
                  Lead requirement
                </span>
              </div>

              <h2 className="mt-2 text-lg font-semibold tracking-[-0.025em] text-heading">
                Project Inquiry
              </h2>
            </div>

            <div className="px-5 py-6 sm:px-6">
              <p className="whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                {lead.problem}
              </p>
            </div>
          </section>

          {/* Project Information */}
          <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/30 to-transparent"/>

            <div className="border-b border-border px-5 py-5 sm:px-6">
              <div className="flex items-center gap-2">
                <BriefcaseBusiness className="h-3.5 w-3.5 text-secondary" />

                <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
                  Opportunity profile
                </span>
              </div>

              <h2 className="mt-2 text-lg font-semibold tracking-[-0.025em] text-heading">
                Project Information
              </h2>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
              {/* Services */}
              <div className="px-5 py-5 sm:px-6">
                <dt className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
                  Services
                </dt>

                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {lead.services.length ? (
                    lead.services.map((service) => (
                      <span
                        key={service}
                        className="border border-border bg-muted/20 px-2 py-1 text-[10px] font-medium text-muted-foreground"
                      >
                        {serviceLabels[service]}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      Not specified
                    </span>
                  )}
                </dd>
              </div>

              {/* Project type */}
              <InfoItem
                label="Project type"
                value={lead.pillar?.replaceAll("_", " ") || "Not specified"}
                icon={Target}
              />

              {/* Project title */}
              <InfoItem
                label="Project title"
                value={
                  typeof metadata?.projectTitle === "string"
                    ? metadata.projectTitle
                    : "Not specified"
                }
                icon={FileText}
              />

              {/* Budget */}
              <InfoItem
                label="Budget"
                value={lead.budget || "Not specified"}
                icon={WalletCards}
              />

              {/* Timeline */}
              <InfoItem
                label="Timeline"
                value={
                  typeof metadata?.timeline === "string"
                    ? metadata.timeline
                    : "Not specified"
                }
                icon={CalendarDays}
              />

              {/* Currency */}
              <InfoItem
                label="Currency"
                value={
                  typeof metadata?.currency === "string"
                    ? metadata.currency
                    : "Not specified"
                }
                icon={WalletCards}
              />
            </dl>
          </section>
        </div>

        {/*===== SIDEBAR =====*/}

        <aside className="space-y-6">
          {/* Contact Information */}
          <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/30 to-transparent"/>

            <div className="border-b border-border px-5 py-5 sm:px-6">
              <div className="flex items-center gap-2">
                <UserRound className="h-3.5 w-3.5 text-secondary" />

                <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
                  Contact record
                </span>
              </div>

              <h2 className="mt-2 text-lg font-semibold tracking-[-0.025em] text-heading">
                Contact Information
              </h2>
            </div>

            <dl className="divide-y divide-border">
              <ContactItem
                label="Contact person"
                value={lead.contactPerson}
                icon={UserRound}
              />

              <ContactItem
                label="Email"
                value={lead.email}
                icon={Mail}
                breakValue
              />

              <ContactItem
                label="Phone"
                value={lead.phone || "Not specified"}
                icon={Phone}
              />

              <ContactItem
                label="Industry"
                value={lead.industry || "Not specified"}
                icon={BriefcaseBusiness}
              />

              <ContactItem
                label="Assigned to"
                value={lead.assignedTo || "Unassigned"}
                icon={UserCheck}
              />
            </dl>

            <div className="flex items-center gap-2 border-t border-border bg-muted/15 px-5 py-3.5 sm:px-6">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />

              <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
                Contact record available
              </span>
            </div>
          </section>

          {/* Attachment */}
          {typeof metadata?.attachmentUrl === "string" && (
            <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
              <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/30 to-transparent"/>

              <div className="px-5 py-5 sm:px-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Paperclip className="h-3.5 w-3.5 text-secondary" />

                      <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
                        Supporting file
                      </span>
                    </div>

                    <h2 className="mt-2 text-lg font-semibold tracking-[-0.025em] text-heading">
                      Attachment
                    </h2>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center border border-secondary/15 bg-secondary/[0.05] text-secondary">
                    <FileText className="h-4 w-4" />
                  </div>
                </div>

                <a
                  href={metadata.attachmentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-5 flex items-center justify-between gap-3 border border-border bg-background/50 px-4 py-3 text-sm font-medium text-heading transition-colors duration-200 hover:border-secondary/30 hover:text-secondary"
                >
                  <span>View uploaded file</span>

                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/>
                </a>
              </div>
            </section>
          )}
        </aside>
      </div>

      {/*===== EDIT MODAL =====*/}

      <LeadDetailModal
        lead={lead}
        isOpen={isEditing}
        onClose={closeEditModal}
        onSave={handleSave}
        mode="edit"
      />

      {/*===== DELETE MODAL =====*/}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Lead"
        description={`Are you sure you want to delete "${
          lead.companyName || lead.contactPerson
        }"? This action cannot be undone.`}
        confirmLabel="Delete"
        isPending={isDeleting}
      />
    </div>
  );
}

//==============================================================//
// PROJECT INFO ITEM
//==============================================================//

function InfoItem({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
}) {
  return (
    <div className="border-t border-border px-5 py-5 sm:px-6 sm:[&:nth-child(2n)]:border-l xl:border-t xl:[&:nth-child(3n+1)]:border-l-0 xl:[&:not(:nth-child(3n+1))]:border-l">
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />

        <div className="min-w-0">
          <dt className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
            {label}
          </dt>

          <dd className="mt-1.5 break-words text-sm font-medium text-heading">
            {value}
          </dd>
        </div>
      </div>
    </div>
  );
}

//==============================================================//
// CONTACT ITEM
//==============================================================//

function ContactItem({
  label,
  value,
  icon: Icon,
  breakValue = false,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  breakValue?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 px-5 py-4 sm:px-6">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />

      <div className="min-w-0">
        <dt className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
          {label}
        </dt>

        <dd
          className={`
            mt-1
            text-sm
            font-medium
            text-heading
            ${breakValue ? "break-all" : ""}
          `}
        >
          {value}
        </dd>
      </div>
    </div>
  );
}
