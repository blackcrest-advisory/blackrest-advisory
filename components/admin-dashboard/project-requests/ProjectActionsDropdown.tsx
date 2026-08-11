"use client";

//===== imports =====//
import { useState, useTransition, useRef } from "react";
import { createPortal } from "react-dom";
import {
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  UserCheck,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/ui/Dropdown";
import { Button } from "@/components/ui/Button";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import {
  deleteBrief,
  updateBriefStatus,
} from "@/lib/actions/briefs/brief.action";
import toast from "react-hot-toast";

//===== status options =====//
const STATUS_OPTIONS = [
  "SUBMITTED",
  "UNDER_REVIEW",
  "ASSIGNED",
  "CLOSED",
] as const;

interface ProjectActionsDropdownProps {
  briefId: string;
  currentStatus: string;
  basePath: string;
  isAdmin?: boolean;
}

export function ProjectActionsDropdown({
  briefId,
  currentStatus,
  basePath,
  isAdmin = false,
}: ProjectActionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  //===== close on outside click (button + portaled dropdown both count as "inside") =====//
  useOutsideClick([buttonRef, dropdownRef], isOpen, () => setIsOpen(false));

  //===== compute dropdown position when opening =====//
  const openDropdown = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownWidth = 192; // w-48
      let left = rect.right - dropdownWidth;
      if (left + dropdownWidth > window.innerWidth) {
        left = window.innerWidth - dropdownWidth - 8;
      }
      if (left < 8) left = 8;

      setDropdownPosition({
        top: rect.bottom + window.scrollY + 4,
        left: left + window.scrollX,
      });
    }
    setIsOpen(true);
  };

  //===== actions =====//
  const handleStatusChange = (newStatus: string) => {
    startTransition(async () => {
      const result = await updateBriefStatus(briefId, newStatus);
      if (!result.success) {
        toast.error(result.error);
        return;
      }
      toast.success(result.message);
      setIsOpen(false);
    });
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
    setIsOpen(false);
  };

  const confirmDelete = () => {
    startTransition(async () => {
      const result = await deleteBrief(briefId);
      if (!result.success) {
        toast.error(result.error);
        setShowDeleteModal(false);
        return;
      }
      toast.success(result.message);
      setShowDeleteModal(false);
      router.refresh();
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "SUBMITTED":
        return <Clock className="h-3 w-3" />;
      case "UNDER_REVIEW":
        return <UserCheck className="h-3 w-3" />;
      case "ASSIGNED":
        return <CheckCircle className="h-3 w-3" />;
      case "CLOSED":
        return <XCircle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  //===== dropdown content =====//
  const dropdownContent = (
    <div className="py-1">
      <Link
        href={`${basePath}/${briefId}`}
        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
        onClick={() => setIsOpen(false)}
      >
        <Eye className="h-4 w-4" />
        View Details
      </Link>

      {isAdmin && (
        <>
          <div className="border-t border-border my-1" />
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => handleStatusChange(opt)}
              className={`flex items-center gap-2 w-full px-4 py-2 cursor-pointer text-sm hover:bg-accent hover:text-accent-foreground ${
                opt === currentStatus ? "bg-accent/50 font-medium" : ""
              }`}
            >
              {getStatusIcon(opt)}
              Mark as {opt.replace(/_/g, " ")}
            </button>
          ))}
          <div className="border-t border-border my-1" />
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className="relative inline-block">
      <Button
        ref={buttonRef}
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={openDropdown}
        disabled={isPending}
        type="button"
      >
        <Eye className="h-4 w-4" />
      </Button>

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "fixed",
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              zIndex: 9999,
            }}
            className="w-48"
          >
            <Dropdown
              isOpen={true}
              align="end"
              className="w-48"
              contentClassName="before:right-4"
            >
              {dropdownContent}
            </Dropdown>
          </div>,
          document.body,
        )}

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
