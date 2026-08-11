"use client";

//===== imports =====//
import { useState, useTransition } from "react";
import {
  Trash2,
  Loader2,
  Clock,
  UserCheck,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Select, SelectOption } from "@/components/ui/Select"; // your custom Select
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import {
  updateBriefStatus,
  deleteBrief,
} from "@/lib/actions/briefs/brief.action";

//===== status options with icons =====//
const STATUS_OPTIONS: SelectOption[] = [
  { value: "SUBMITTED", label: "Submitted", icon: Clock },
  { value: "UNDER_REVIEW", label: "Under Review", icon: UserCheck },
  { value: "ASSIGNED", label: "Assigned", icon: CheckCircle },
  { value: "CLOSED", label: "Closed", icon: XCircle },
];

interface AdminBriefActionsProps {
  briefId: string;
  currentStatus: string;
  assignedTo?: string | null;
}

export function AdminBriefActions({
  briefId,
  currentStatus,
  assignedTo,
}: AdminBriefActionsProps) {
  const [status, setStatus] = useState(currentStatus);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleStatusChange = (newStatus: string) => {
    startTransition(async () => {
      await updateBriefStatus(briefId, newStatus);
      setStatus(newStatus);
    });
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    startTransition(async () => {
      await deleteBrief(briefId);
      setShowDeleteModal(false);
      router.push("/admin/dashboard/project-requests");
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Status select */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Status</span>
        <Select
          options={STATUS_OPTIONS}
          value={status}
          onChange={handleStatusChange}
          disabled={isPending}
          className="w-[160px]"
          align="end"
        />
      </div>

      {/* Assigned To */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Assigned to</span>
        <span className="text-sm font-medium text-foreground">
          {assignedTo || "Unassigned"}
        </span>
      </div>

      {/* Delete button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleDelete}
        disabled={isPending}
        className="text-destructive hover:bg-destructive/10"
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
        <span className="ml-2">Delete</span>
      </Button>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Project Request"
        description="Are you sure you want to delete this request? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        isPending={isPending}
      />
    </div>
  );
}
