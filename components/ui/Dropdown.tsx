"use client";

import React, { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface DropdownProps {
  isOpen: boolean;
  children: ReactNode;

  className?: string;
  contentClassName?: string;

  align?: "start" | "center" | "end";
}

const Dropdown = ({
  isOpen,
  children,
  className = "",
  contentClassName = "before:left-4",
  align = "start",
}: DropdownProps) => {
  const alignClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="dropdown"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{
            duration: 0.2,
            ease: [0.25, 0.8, 0.25, 1],
          }}
          className={`absolute w-56 z-50 origin-top ${alignClasses[align]} ${className}`}
        >
          <div
            className={`
               mt-6
              relative
              rounded-xl
              py-2
              backdrop-blur-lg
              bg-popover/80
              dark:bg-gray-800/80
              shadow-xl
              shadow-black/5
              dark:shadow-white/5
              ring-1
              ring-black/5
              dark:ring-white/10
              before:content-['']
              before:absolute
              before:top-[-6px]
              before:w-0
              before:h-0
              before:border-l-8
              before:border-r-8
              before:border-b-8
              before:border-l-transparent
              before:border-r-transparent
              before:border-b-popover
              dark:before:border-b-gray-800
              before:drop-shadow-[0_-1px_1px_rgba(0,0,0,0.05)]
              dark:before:drop-shadow-[0_-1px_1px_rgba(255,255,255,0.1)]
              bg-white
              ${contentClassName}
            `}
          >
            <div role="menu">{children}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dropdown;
