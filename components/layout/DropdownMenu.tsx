import Link from "next/link";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="dropdown-menu"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2, ease: [0.25, 0.8, 0.25, 1] }}
          className="absolute left-0 w-56 z-50 origin-top"
        >
          <div
            className={`relative py-2 mt-6 rounded-xl backdrop-blur-lg bg-popover/80 dark:bg-gray-800/80 shadow-xl shadow-black/5 dark:shadow-white/5 ring-1 ring-black/5 dark:ring-white/10
              before:content-[''] before:absolute before:top-[-6px] before:left-4 before:w-0 before:h-0 before:border-l-8 before:border-r-8 before:border-b-8 before:border-l-transparent before:border-r-transparent before:border-b-popover dark:before:border-b-gray-800 before:filter before:drop-shadow-[0_-1px_1px_rgba(0,0,0,0.05)] dark:before:drop-shadow-[0_-1px_1px_rgba(255,255,255,0.1)]
              ${className}`}
          >
            <div role="menu">
              {items.map((item) => {
                const childActive = isActive(item.link);
                return (
                  <Link
                    key={item.id}
                    href={item.link}
                    role="menuitem"
                    className={`group relative flex items-center px-4 py-3 text-sm font-medium transition-all duration-150 border-l-2 first:rounded-t-xl last:rounded-b-xl ${
                      childActive
                        ? "border-secondary bg-muted text-secondary"
                        : "border-transparent text-body hover:bg-muted/50 hover:text-secondary hover:border-secondary/30"
                    }`}
                    aria-current={childActive ? "page" : undefined}
                    onClick={onItemClick}
                  >
                    {childActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-secondary rounded-full" />
                    )}

                    <span className="truncate">{item.name}</span>

                    <svg
                      className={`ml-auto h-4 w-4 transition-all duration-200 ${
                        childActive
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
