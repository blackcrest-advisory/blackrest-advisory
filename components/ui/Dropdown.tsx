"use client";

import React, { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

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
  const shouldReduceMotion = useReducedMotion();
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
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.98 }}
          transition={{
            duration: shouldReduceMotion ? 0.01 : 0.2,
            ease: [0.25, 0.8, 0.25, 1],
          }}
          className={`absolute z-50 w-56 origin-top ${alignClasses[align]} ${className}`}
        >
          <div
            className={`
              mt-3
              relative
              rounded-[var(--radius-surface)]
              border border-border/80
              bg-popover/95
              py-1.5
              shadow-[var(--shadow-overlay)]
              backdrop-blur-xl
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
