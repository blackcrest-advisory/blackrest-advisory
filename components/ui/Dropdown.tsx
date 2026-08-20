"use client";

import { type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils/utils";

interface DropdownProps {
  isOpen: boolean;
  children: ReactNode;

  className?: string;
  contentClassName?: string;

  align?: "start" | "center" | "end";

  showArrow?: boolean;
}

const Dropdown = ({
  isOpen,
  children,
  className = "",
  contentClassName = "before:left-4",
  align = "start",
  showArrow = true,
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
          initial={
            shouldReduceMotion
              ? {
                  opacity: 0,
                }
              : {
                  opacity: 0,
                  y: 7,
                  scale: 0.975,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={
            shouldReduceMotion
              ? {
                  opacity: 0,
                }
              : {
                  opacity: 0,
                  y: 5,
                  scale: 0.98,
                }
          }
          transition={{
            duration: shouldReduceMotion ? 0.01 : 0.18,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={cn(
            `
              absolute
              z-[200]
              w-56
              origin-top
            `,
            alignClasses[align],
            className,
          )}
        >
          {/* ================================================== */}
          {/* DROPDOWN SURFACE                                   */}
          {/* ================================================== */}

          <div
            className={cn(
              `
                relative
                mt-2
                overflow-hidden
                rounded-md
                border border-border
                bg-card/95
                shadow-[var(--shadow-overlay)]
                backdrop-blur-xl
              `,

              showArrow &&
                `
                  before:absolute
                  before:-top-[5px]
                  before:z-20
                  before:h-2.5
                  before:w-2.5
                  before:rotate-45
                  before:border-l
                  before:border-t
                  before:border-border
                  before:bg-card
                  before:content-['']
                `,

              showArrow && contentClassName,
            )}
          >
            {/* ================================================ */}
            {/* GOLD SIGNAL LINE                                 */}
            {/* ================================================ */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-10 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/45 to-transparent"
            />

            {/* ================================================ */}
            {/* AMBIENT GLOW                                     */}
            {/* ================================================ */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full bg-secondary/[0.07] blur-[55px]"
            />

            {/* ================================================ */}
            {/* SUBTLE INNER HIGHLIGHT                           */}
            {/* ================================================ */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-[2px] h-px bg-foreground/[0.035]"
            />

            {/* ================================================ */}
            {/* CONTENT                                          */}
            {/* ================================================ */}

            <div className="relative z-10">{children}</div>

            {/* ================================================ */}
            {/* BOTTOM DETAIL                                    */}
            {/* ================================================ */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-4 h-px w-8 bg-secondary/35"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dropdown;
