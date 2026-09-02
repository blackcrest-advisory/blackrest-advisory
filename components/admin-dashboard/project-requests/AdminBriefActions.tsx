"use client";

//===== imports =====//
import { useState, useTransition } from "react";
import {
  CheckCircle,
  Clock,
  Loader2,
  Trash2,
  UserCheck,
  UserRound,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { Select, type SelectOption } from "@/components/ui/Select";

import ConfirmationModal from "@/components/ui/ConfirmationModal";

import {
  deleteBrief,
  updateBriefStatus,
} from "@/lib/actions/briefs/brief.action";

//===== status options =====//
const STATUS_OPTIONS: SelectOption[] = [
  {
    value: "SUBMITTED",
    label: "Submitted",
    icon: Clock,
  },
  {
    value: "UNDER_REVIEW",
    label: "Under Review",
    icon: UserCheck,
  },
  {
    value: "ASSIGNED",
    label: "Assigned",
    icon: CheckCircle,
  },
  {
    value: "CLOSED",
    label: "Closed",
    icon: XCircle,
  },
];

//===== types =====//
interface AdminBriefActionsProps {
  briefId: string;
  currentStatus: string;
  assignedTo?: string | null;
}

type PendingAction =
  | {
      type: "status";
      status: string;
    }
  | {
      type: "delete";
    }
  | null;

export function AdminBriefActions({
  briefId,
  currentStatus,
  assignedTo,
}: AdminBriefActionsProps) {
  //===== state =====//
  const [status, setStatus] = useState(currentStatus);

  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  //===== format status =====//
  const formatStatus = (value: string) => {
    return value
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  //===== request status change =====//
  const handleStatusChange = (newStatus: string) => {
    if (newStatus === status) {
      return;
    }

    setPendingAction({
      type: "status",
      status: newStatus,
    });
  };

  //===== request delete =====//
  const handleDelete = () => {
    setPendingAction({
      type: "delete",
    });
  };

  //===== close confirmation =====//
  const closeConfirmation = () => {
    if (isPending) {
      return;
    }

    setPendingAction(null);
  };

  //===== confirm action =====//
  const confirmAction = () => {
    if (!pendingAction) {
      return;
    }

    //===== status update =====//
    if (pendingAction.type === "status") {
      const newStatus = pendingAction.status;

      startTransition(async () => {
        await updateBriefStatus(briefId, newStatus);

        setStatus(newStatus);

        setPendingAction(null);
      });

      return;
    }

    //===== delete =====//
    startTransition(async () => {
      await deleteBrief(briefId);

      setPendingAction(null);

      router.push("/admin/dashboard/project-requests");
    });
  };

  //===== confirmation content =====//
  const confirmationTitle =
    pendingAction?.type === "delete"
      ? "Delete Project Request"
      : pendingAction?.type === "status"
        ? `Mark as ${formatStatus(pendingAction.status)}`
        : "Confirm Action";

  const confirmationDescription =
    pendingAction?.type === "delete"
      ? "Are you sure you want to delete this request? This action cannot be undone."
      : pendingAction?.type === "status"
        ? `Are you sure you want to change this project request from ${formatStatus(
            status,
          )} to ${formatStatus(pendingAction.status)}?`
        : "";

  const confirmationLabel =
    pendingAction?.type === "delete"
      ? "Delete"
      : pendingAction?.type === "status"
        ? `Mark as ${formatStatus(pendingAction.status)}`
        : "Confirm";

  //===== render =====//
  return (
    <>
      <div className="flex w-full flex-col gap-3">
        {/*===== STATUS =====*/}

        <div className="border border-border bg-background/35 p-3">
          <div className="mb-2.5 flex items-center justify-between gap-3">
            <div>
              <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/40">
                Workflow state
              </span>

              <p className="mt-0.5 text-xs font-medium text-heading">
                Status
              </p>
            </div>

            <span className="h-1.5 w-1.5 rounded-full bg-secondary"/>
          </div>

          <Select
            options={STATUS_OPTIONS}
            value={status}
            onChange={handleStatusChange}
            disabled={isPending}
            className="w-full"
            align="end"
          />

          <p className="mt-2 text-[10px] leading-4 text-muted-foreground">
            Select a new workflow state to update this request.
          </p>
        </div>

        {/*===== ASSIGNMENT =====*/}

        <div className="flex items-center gap-3 border border-border bg-background/35 px-3 py-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-card text-muted-foreground">
            <UserRound className="h-3.5 w-3.5" />
          </div>

          <div className="min-w-0 flex-1">
            <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
              Assigned to
            </span>

            <p
              className="mt-0.5 truncate text-xs font-medium text-heading"
              title={assignedTo || "Unassigned"}
            >
              {assignedTo || "Unassigned"}
            </p>
          </div>
        </div>

        {/*===== DELETE =====*/}

        <div className="border-t border-border pt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            disabled={isPending}
            className="w-full !rounded-md border-destructive/20 text-destructive hover:border-destructive/30 hover:bg-destructive/[0.06] hover:text-destructive"
          >
            {isPending && pendingAction?.type === "delete" ? (
              <Loader2 className="h-4 w-4 animate-spin"/>
            ) : (
              <Trash2 className="h-4 w-4" />
            )}

            <span className="ml-2">Delete Request</span>
          </Button>
        </div>
      </div>

      {/*===== CONFIRMATION MODAL =====*/}

      <ConfirmationModal
        isOpen={pendingAction !== null}
        onClose={closeConfirmation}
        onConfirm={confirmAction}
        title={confirmationTitle}
        description={confirmationDescription}
        confirmLabel={confirmationLabel}
        cancelLabel="Cancel"
        isPending={isPending}
        tone={pendingAction?.type === "delete" ? "danger" : "default"}
      />
    </>
  );
}
