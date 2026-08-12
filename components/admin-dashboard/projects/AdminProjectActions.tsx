"use client";

//===== imports =====//
import { useState, useTransition, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Eye, Trash2, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/ui/Dropdown";
import { Button } from "@/components/ui/Button";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import {
  updateProjectStatus,
  deleteProject,
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

interface AdminProjectActionsProps {
  projectId: string;
  currentStatus: string;
}

export function AdminProjectActions({
  projectId,
  currentStatus,
}: AdminProjectActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const openDropdown = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      let left = rect.right + window.scrollX;
      if (left < 8) left = 8;
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 4,
        left,
      });
    }
    setIsOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const isInsideButton = buttonRef.current?.contains(target);
      const isInsideDropdown = dropdownRef.current?.contains(target);
      if (isOpen && !isInsideButton && !isInsideDropdown) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleStatusChange = (newStatus: string) => {
    startTransition(async () => {
      await updateProjectStatus(projectId, newStatus as any);
      setIsOpen(false);
      router.refresh();
    });
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
    setIsOpen(false);
  };

  const confirmDelete = () => {
    startTransition(async () => {
      await deleteProject(projectId);
      setShowDeleteModal(false);
      router.refresh();
    });
  };

  const dropdownContent = (
    <div className="py-1">
      <Link
        href={`/admin/dashboard/projects/${projectId}`}
        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
        onClick={() => setIsOpen(false)}
      >
        <Eye className="h-4 w-4" />
        View Details
      </Link>

      <div className="border-t border-border my-1" />
      {STATUS_OPTIONS.map((opt) => (
        <button
          key={opt}
          onClick={() => handleStatusChange(opt)}
          className={`flex w-full px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground ${
            opt === currentStatus ? "bg-accent/50 font-medium" : ""
          }`}
        >
          {opt === currentStatus && "✓ "}
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
      >
        <MoreVertical className="h-4 w-4" />
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
          >
            <Dropdown
              isOpen={true}
              align="end"
              className="w-56"
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
        title="Delete Project"
        description="Are you sure you want to delete this project? This action cannot be undone. All associated data (milestones, invoices, files) will be removed."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        isPending={isPending}
      />
    </div>
  );
}
