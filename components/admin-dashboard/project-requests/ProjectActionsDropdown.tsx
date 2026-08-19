"use client";

//===== imports =====//
import { useRef, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check,
  CheckCircle,
  Clock,
  Eye,
  MoreHorizontal,
  Trash2,
  UserCheck,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";

import Dropdown from "@/components/ui/Dropdown";
import { Button } from "@/components/ui/Button";
import ConfirmationModal from "@/components/ui/ConfirmationModal";

import { useOutsideClick } from "@/hooks/useOutsideClick";

import {
  deleteBrief,
  updateBriefStatus,
} from "@/lib/actions/briefs/brief.action";

//===== status options =====//
const STATUS_OPTIONS = [
  "SUBMITTED",
  "UNDER_REVIEW",
  "ASSIGNED",
  "CLOSED",
] as const;

//===== types =====//
type StatusOption = (typeof STATUS_OPTIONS)[number];

interface ProjectActionsDropdownProps {
  briefId: string;
  currentStatus: string;
  basePath: string;
  isAdmin?: boolean;
}

type DropdownPlacement = "top" | "bottom";

type PendingAction =
  | {
      type: "status";
      status: StatusOption;
    }
  | {
      type: "delete";
    }
  | null;

export function ProjectActionsDropdown({
  briefId,
  currentStatus,
  basePath,
  isAdmin = false,
}: ProjectActionsDropdownProps) {
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

  //===== close dropdown on outside click =====//
  useOutsideClick([buttonRef, dropdownRef], isOpen, () => setIsOpen(false));

  //===== compute dropdown position =====//
  const openDropdown = () => {
    if (!buttonRef.current) {
      setIsOpen(true);
      return;
    }

    const rect = buttonRef.current.getBoundingClientRect();

    const dropdownWidth = 224;
    const dropdownHeight = isAdmin ? 330 : 70;

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

  //===== format status label =====//
  const formatStatus = (status: string) => {
    return status
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  //===== request status confirmation =====//
  const requestStatusChange = (status: StatusOption) => {
    setPendingAction({
      type: "status",
      status,
    });

    setIsOpen(false);
  };

  //===== request delete confirmation =====//
  const requestDelete = () => {
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

    //===== status update =====//
    if (pendingAction.type === "status") {
      const nextStatus = pendingAction.status;

      startTransition(async () => {
        const result = await updateBriefStatus(briefId, nextStatus);

        if (!result.success) {
          toast.error(result.error);
          return;
        }

        toast.success(result.message);

        setPendingAction(null);
      });

      return;
    }

    //===== delete =====//
    if (pendingAction.type === "delete") {
      startTransition(async () => {
        const result = await deleteBrief(briefId);

        if (!result.success) {
          toast.error(result.error);
          setPendingAction(null);
          return;
        }

        toast.success(result.message);

        setPendingAction(null);

        router.refresh();
      });
    }
  };

  //===== status icon =====//
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "SUBMITTED":
        return <Clock className="h-3.5 w-3.5" />;

      case "UNDER_REVIEW":
        return <UserCheck className="h-3.5 w-3.5" />;

      case "ASSIGNED":
        return <CheckCircle className="h-3.5 w-3.5" />;

      case "CLOSED":
        return <XCircle className="h-3.5 w-3.5" />;

      default:
        return null;
    }
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
            currentStatus,
          )} to ${formatStatus(pendingAction.status)}?`
        : "";

  const confirmationLabel =
    pendingAction?.type === "delete"
      ? "Delete"
      : pendingAction?.type === "status"
        ? `Mark as ${formatStatus(pendingAction.status)}`
        : "Confirm";

  //===== dropdown content =====//
  const dropdownContent = (
    <div className="py-1.5">
      {/* ====================================================== */}
      {/* VIEW DETAILS                                           */}
      {/* ====================================================== */}

      <div className="px-1.5">
        <Link
          href={`${basePath}/${briefId}`}
          onClick={() => setIsOpen(false)}
          className="
            group
            flex
            min-h-10
            w-full
            items-center
            gap-2.5
            rounded-md
            px-2.5
            py-2
            text-sm
            font-medium
            text-foreground
            transition-colors
            duration-150
            hover:bg-secondary/[0.05]
            hover:text-heading
          "
        >
          <Eye
            className="
              h-4 w-4
              shrink-0
              text-muted-foreground
              transition-colors
              group-hover:text-secondary
            "
          />

          <span className="flex-1 text-left">View Details</span>
        </Link>
      </div>

      {/* ====================================================== */}
      {/* ADMIN ACTIONS                                          */}
      {/* ====================================================== */}

      {isAdmin && (
        <>
          <div className="my-1.5 border-t border-border" />

          {/* status label */}
          <div
            className="
              flex
              items-center
              justify-between
              px-4
              pb-1.5
              pt-1
            "
          >
            <span
              className="
                font-mono
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-muted-foreground/40
              "
            >
              Update status
            </span>

            <span
              className="
                h-px w-6
                bg-secondary/30
              "
            />
          </div>

          {/* ================================================== */}
          {/* STATUS ACTIONS                                     */}
          {/* ================================================== */}

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
                      px-2.5
                      py-2
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
                        bottom-2
                        left-0
                        top-2
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

                  {/* status icon */}
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

                  {/* current indicator */}
                  {isCurrent && (
                    <span
                      className="
                          flex h-5 w-5
                          shrink-0
                          items-center
                          justify-center
                          rounded
                          border border-secondary/20
                          bg-secondary/[0.08]
                        "
                    >
                      <Check
                        className="
                            h-3 w-3
                            text-secondary
                          "
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ================================================== */}
          {/* DELETE                                             */}
          {/* ================================================== */}

          <div className="my-1.5 border-t border-border" />

          <div className="px-1.5">
            <button
              type="button"
              onClick={requestDelete}
              disabled={isPending}
              className="
                group
                flex
                min-h-10
                w-full
                items-center
                gap-2.5
                rounded-md
                px-2.5
                py-2
                text-left
                text-sm
                font-medium
                text-destructive
                transition-colors
                duration-150
                hover:bg-destructive/[0.07]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <Trash2 className="h-4 w-4 shrink-0" />

              <span className="flex-1">Delete Request</span>
            </button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="relative inline-block">
      {/* ====================================================== */}
      {/* TRIGGER                                                */}
      {/* ====================================================== */}

      <Button
        ref={buttonRef}
        variant="ghost"
        size="sm"
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
        disabled={isPending}
        type="button"
        aria-label="Project request actions"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>

      {/* ====================================================== */}
      {/* PORTALED DROPDOWN                                      */}
      {/* ====================================================== */}

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
              className="
                !static
                !w-56
                !translate-x-0
              "
              contentClassName=""
              showArrow={false}
            >
              <div
                className="
                  max-h-[min(330px,calc(100vh-24px))]
                  overflow-y-auto
                  overscroll-contain
                "
              >
                {dropdownContent}
              </div>
            </Dropdown>
          </div>,
          document.body,
        )}

      {/* ====================================================== */}
      {/* ACTION CONFIRMATION                                    */}
      {/* ====================================================== */}

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
