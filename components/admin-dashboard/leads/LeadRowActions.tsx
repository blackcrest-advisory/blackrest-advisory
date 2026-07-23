"use client";

import { useState, useRef } from "react";
import { MoreVertical, Eye, Edit, UserCheck, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import DropdownItem from "@/components/ui/DropdownItem";
import { useOutsideClick } from "@/hooks/useOutsideClick";

interface LeadRowActionsProps {
  onView: () => void;
  onEdit: () => void;
  onConvert: () => void;
  onDelete: () => void;
}

export const LeadRowActions = ({
  onView,
  onEdit,
  onConvert,
  onDelete,
}: LeadRowActionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(containerRef, isOpen, () => setIsOpen(false));

  //===== Close dropdown after action =====//
  const handleAction = (callback: () => void) => {
    setIsOpen(false);
    callback();
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 w-8 p-0"
      >
        <MoreVertical className="h-4 w-4" />
      </Button>

      <Dropdown isOpen={isOpen} align="end">
        <DropdownItem onClick={() => handleAction(onView)}>
          <Eye className="mr-2 h-4 w-4" />
          View
        </DropdownItem>
        <DropdownItem onClick={() => handleAction(onEdit)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownItem>
        <DropdownItem onClick={() => handleAction(onConvert)}>
          <UserCheck className="mr-2 h-4 w-4" />
          Convert to Client
        </DropdownItem>
        <DropdownItem danger onClick={() => handleAction(onDelete)}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownItem>
      </Dropdown>
    </div>
  );
};
