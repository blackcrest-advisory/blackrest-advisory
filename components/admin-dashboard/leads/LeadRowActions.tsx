"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick([buttonRef, dropdownRef], isOpen, () => setIsOpen(false));

  const openDropdown = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownWidth = 224;
      const left = Math.max(8, Math.min(rect.right - dropdownWidth, window.innerWidth - dropdownWidth - 8));

      setDropdownPosition({
        top: rect.bottom + 4,
        left,
      });
    }
    setIsOpen(true);
  };

  //===== Close dropdown after action =====//
  const handleAction = (callback: () => void) => {
    setIsOpen(false);
    callback();
  };

  return (
    <div className="relative inline-block">
      <Button
        ref={buttonRef}
        variant="ghost"
        size="sm"
        onClick={openDropdown}
        className="h-8 w-8 p-0"
      >
        <MoreVertical className="h-4 w-4" />
      </Button>

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed z-[9999] w-56"
            style={dropdownPosition}
          >
            <Dropdown
              isOpen={true}
              align="end"
              className="w-56"
              contentClassName="before:right-4"
            >
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
          </div>,
          document.body,
        )}
    </div>
  );
};
