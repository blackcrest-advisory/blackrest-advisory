"use client";

//===== imports =====//
import { useEffect, useRef, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check,
  CheckCircle2,
  CirclePause,
  ClipboardCheck,
  Clock3,
  Eye,
  MoreHorizontal,
  RotateCcw,
  Trash2,
  XCircle,
} from "lucide-react";

import Dropdown from "@/components/ui/Dropdown";
import { Button } from "@/components/ui/Button";
import ConfirmationModal from "@/components/ui/ConfirmationModal";

import {
  deleteProject,
  updateProjectStatus,
} from "@/lib/actions/projects/project.action";

//===== status options =====//
const STATUS_OPTIONS = [
  "ACTIVE",
  "ON_HOLD",
  "PLANNING",
  "IN_REVIEW",
  "COMPLETED",
  "CANCELLED",
] as const;

//===== types =====//
type ProjectStatus = (typeof STATUS_OPTIONS)[number];

type DropdownPlacement = "top" | "bottom";

type PendingAction =
  | {
      type: "status";
      status: ProjectStatus;
    }
  | {
      type: "delete";
    }
  | null;

interface AdminProjectActionsProps {
  projectId: string;
  currentStatus: string;
}

export function AdminProjectActions({
  projectId,
  currentStatus,
}: AdminProjectActionsProps) {
  //===== state =====//
  const [isOpen, setIsOpen] = useState(false);

  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  const [isPending, startTransition] = useTransition();

  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
    placement: DropdownPlacement;
  }>({
    top: 0,
    left: 0,
    placement: "bottom",
  });

  const buttonRef = useRef<HTMLButtonElement>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  //===== outside click =====//
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const isInsideButton = buttonRef.current?.contains(target);

      const isInsideDropdown = dropdownRef.current?.contains(target);

      if (isOpen && !isInsideButton && !isInsideDropdown) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  //===== dropdown positioning =====//
  const openDropdown = () => {
    if (!buttonRef.current) {
      setIsOpen(true);
      return;
    }

    const rect = buttonRef.current.getBoundingClientRect();

    const dropdownWidth = 224;
    const dropdownHeight = 400;
    const viewportPadding = 12;
    const gap = 6;

    //===== horizontal =====//
    let left = rect.right - dropdownWidth;

    if (left + dropdownWidth > window.innerWidth - viewportPadding) {
      left = window.innerWidth - dropdownWidth - viewportPadding;
    }

    if (left < viewportPadding) {
      left = viewportPadding;
    }

    //===== vertical =====//
    const spaceBelow = window.innerHeight - rect.bottom - viewportPadding;

    const spaceAbove = rect.top - viewportPadding;

    const shouldOpenUp = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;

    let top: number;

    if (shouldOpenUp) {
      top = Math.max(viewportPadding, rect.top - dropdownHeight - gap);
    } else {
      top = Math.min(
        rect.bottom + gap,
        window.innerHeight - dropdownHeight - viewportPadding,
      );

      top = Math.max(viewportPadding, top);
    }

    setDropdownPosition({
      top,
      left,
      placement: shouldOpenUp ? "top" : "bottom",
    });

    setIsOpen(true);
  };

  //===== status label =====//
  const formatStatus = (status: string) => {
    return status
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  //===== status icon =====//
  const getStatusIcon = (status: ProjectStatus) => {
    switch (status) {
      case "ACTIVE":
        return <CheckCircle2 className="h-3.5 w-3.5" />;

      case "ON_HOLD":
        return <CirclePause className="h-3.5 w-3.5" />;

      case "PLANNING":
        return <Clock3 className="h-3.5 w-3.5" />;

      case "IN_REVIEW":
        return <ClipboardCheck className="h-3.5 w-3.5" />;

      case "COMPLETED":
        return <Check className="h-3.5 w-3.5" />;

      case "CANCELLED":
        return <XCircle className="h-3.5 w-3.5" />;

      default:
        return <RotateCcw className="h-3.5 w-3.5" />;
    }
  };

  //===== request status update =====//
  const requestStatusChange = (status: ProjectStatus) => {
    setPendingAction({
      type: "status",
      status,
    });

    setIsOpen(false);
  };

  //===== request deletion =====//
  const handleDelete = () => {
    setPendingAction({
      type: "delete",
    });

    setIsOpen(false);
  };

  //===== close confirmation =====//
  const closeConfirmation = () => {
    if (isPending) return;

    setPendingAction(null);
  };

  //===== confirm action =====//
  const confirmAction = () => {
    if (!pendingAction) return;

    //===== status =====//
    if (pendingAction.type === "status") {
      const nextStatus = pendingAction.status;

      startTransition(async () => {
        await updateProjectStatus(projectId, nextStatus as any);

        setPendingAction(null);

        router.refresh();
      });

      return;
    }

    //===== delete =====//
    startTransition(async () => {
      await deleteProject(projectId);

      setPendingAction(null);

      router.refresh();
    });
  };

  //===== confirmation config =====//
  const confirmationTitle =
    pendingAction?.type === "delete"
      ? "Delete Project"
      : pendingAction?.type === "status"
        ? `Mark as ${formatStatus(pendingAction.status)}`
        : "Confirm Action";

  const confirmationDescription =
    pendingAction?.type === "delete"
      ? "Are you sure you want to delete this project? This action cannot be undone. All associated data (milestones, invoices, files) will be removed."
      : pendingAction?.type === "status"
        ? `Are you sure you want to change this project from ${formatStatus(
            currentStatus,
          )} to ${formatStatus(pendingAction.status)}?`
        : "";

  const confirmationLabel =
    pendingAction?.type === "delete"
      ? "Delete Project"
      : pendingAction?.type === "status"
        ? `Mark as ${formatStatus(pendingAction.status)}`
        : "Confirm";

  //===== dropdown content =====//
  const dropdownContent = (
    <div className="py-1.5">
      {/*===== VIEW DETAILS =====*/}

      <div className="px-1.5">
        <Link
          href={`/admin/dashboard/projects/${projectId}`}
          onClick={() => setIsOpen(false)}
          className="group flex min-h-10 w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-secondary/[0.05] hover:text-heading"
        >
          <Eye
            className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-secondary"
          />

          <span className="flex-1 text-left">View Details</span>
        </Link>
      </div>

      {/*===== STATUS =====*/}

      <div className="my-1.5 border-t border-border" />

      <div
        className="flex items-center justify-between px-4 pb-1.5 pt-1"
      >
        <span
          className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/40"
        >
          Project status
        </span>

        <span className="h-px w-6 bg-secondary/30" />
      </div>

      <div className="px-1.5">
        {STATUS_OPTIONS.map((option) => {
          const isCurrent = option === currentStatus;

          return (
            <button
              key={option}
              type="button"
              onClick={() => requestStatusChange(option)}
              disabled={isPending}
              className={`
                  group
                  relative
                  flex
                  min-h-10
                  w-full
                  items-center
                  gap-2.5
                  rounded-md
                  px-2.5 py-2
                  text-left
                  text-sm
                  transition-colors
                  duration-150

                  ${
                    isCurrent
                      ? `
                          bg-secondary/[0.08]
                          font-medium
                          text-secondary
                        `
                      : `
                          text-foreground
                          hover:bg-secondary/[0.045]
                          hover:text-heading
                        `
                  }

                  ${isPending ? "cursor-not-allowed opacity-60" : ""}
                `}
            >
              {/* active rail */}
              <span
                aria-hidden="true"
                className={`
                    absolute
                    bottom-2 left-0 top-2
                    w-[2px]
                    bg-secondary
                    transition-transform
                    duration-200

                    ${
                      isCurrent
                        ? "scale-y-100"
                        : "scale-y-0 group-hover:scale-y-75"
                    }
                  `}
              />

              {/* icon */}
              <span
                className={`
                    shrink-0
                    transition-colors

                    ${
                      isCurrent
                        ? "text-secondary"
                        : "text-muted-foreground group-hover:text-secondary"
                    }
                  `}
              >
                {getStatusIcon(option)}
              </span>

              {/* label */}
              <span className="min-w-0 flex-1">
                Mark as {formatStatus(option)}
              </span>

              {/* current */}
              {isCurrent && (
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-secondary/20 bg-secondary/[0.08]"
                >
                  <Check className="h-3 w-3" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/*===== DELETE =====*/}

      <div className="my-1.5 border-t border-border" />

      <div className="px-1.5">
        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          className="group flex min-h-10 w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm font-medium text-destructive transition-colors duration-150 hover:bg-destructive/[0.07] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Trash2 className="h-4 w-4 shrink-0" />

          <span className="flex-1">Delete Project</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative inline-block">
      {/*===== TRIGGER =====*/}

      <Button
        ref={buttonRef}
        variant="ghost"
        size="sm"
        type="button"
        disabled={isPending}
        aria-label="Project actions"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className={`
          h-8
          w-8
          !rounded-md
          !p-0
          border

          ${
            isOpen
              ? `
                  border-secondary/30
                  bg-secondary/[0.07]
                  text-secondary
                `
              : `
                  border-transparent
                  text-muted-foreground
                  hover:border-border
                  hover:bg-muted/30
                  hover:text-heading
                `
          }
        `}
        onClick={() => {
          if (isOpen) {
            setIsOpen(false);
          } else {
            openDropdown();
          }
        }}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>

      {/*===== PORTALED DROPDOWN =====*/}

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "fixed",
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              zIndex: 9999,
              maxHeight: "calc(100vh - 24px)",
            }}
            className="w-56"
            data-placement={dropdownPosition.placement}
          >
            <Dropdown
              isOpen
              align="start"
              showArrow={false}
              contentClassName=""
              className="!static !w-56 !translate-x-0"
            >
              <div
                className="max-h-[min(400px,calc(100vh-24px))] overflow-y-auto overscroll-contain"
              >
                {dropdownContent}
              </div>
            </Dropdown>
          </div>,
          document.body,
        )}

      {/*===== CONFIRMATION =====*/}

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
    </div>
  );
}
