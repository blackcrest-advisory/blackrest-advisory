import Link from "next/link";
import React from "react";

interface DropdownItem {
  id: string | number;
  name: string;
  link: string;
}

interface DropdownMenuProps {
  items: DropdownItem[];
  isOpen: boolean;
  isActive: (path: string) => boolean;
  className?: string;
  onItemClick?: () => void;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
  isOpen,
  isActive,
  className = "",
  onItemClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className={`absolute left-0 w-56 `}>
      <div
        className={`py-1 mt-6 rounded-md bg-popover shadow-lg ring-1 ring-black/5 dark:ring-white/10 ${className} z-50 bg-white dark:bg-gray-800 `}
      >
        {items.map((item) => {
          const childActive = isActive(item.link);
          return (
            <Link
              key={item.id}
              href={item.link}
              className={`block px-4 py-2 text-sm transition-colors hover:bg-muted hover:text-secondary ${
                childActive ? "text-secondary" : "text-body"
              }`}
              aria-current={childActive ? "page" : undefined}
              onClick={onItemClick}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
