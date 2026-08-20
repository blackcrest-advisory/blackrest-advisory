"use client";

import { useRef, useState } from "react";
import { Check, ChevronDown, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils/utils";
import Dropdown from "@/components/ui/Dropdown";
import { useOutsideClick } from "@/hooks/useOutsideClick";

export interface SelectOption {
  value: string;
  label: string;
  icon?: LucideIcon;
}

interface SelectProps {
  options: readonly SelectOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  align?: "start" | "center" | "end";
  disabled?: boolean;
}

export const Select = ({
  options,
  value,
  onChange,
  className = "",
  align = "start",
  disabled = false,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(containerRef, isOpen, () => setIsOpen(false));

  const selectedOption =
    options.find((option) => option.value === value) ?? options[0];

  //===== Select option =====//
  const handleSelect = (nextValue: string) => {
    onChange(nextValue);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative", isOpen && "z-[80]", className)}
    >
      {/*===== TRIGGER =====*/}

      <button
        type="button"
        onClick={() => {
          if (!disabled) {
            setIsOpen((previous) => !previous);
          }
        }}
        disabled={disabled}
        className={cn(
          `
            group
            relative
            flex
            min-h-10
            w-full
            items-center
            justify-between
            gap-3
            overflow-hidden
            rounded-md
            border border-border
            bg-background
            px-3
            text-left
            text-sm
            text-foreground
            shadow-[var(--shadow-control-inset)]
            outline-none
            transition-[border-color,box-shadow,background-color]
            duration-200
          `,
          `
            hover:border-secondary/35
            hover:bg-secondary/[0.015]

            focus:border-secondary/50
            focus:ring-2
            focus:ring-secondary/10
          `,
          isOpen &&
            `
              border-secondary/40
              bg-secondary/[0.02]
              ring-2
              ring-secondary/10
            `,
          disabled &&
            `
              cursor-not-allowed
              bg-muted/40
              opacity-60
            `,
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {/* subtle active rail */}
        <span
          aria-hidden="true"
          className={cn(
            `
              absolute
              bottom-2 left-0 top-2
              w-[2px]
              origin-center
              bg-secondary
              transition-transform
              duration-200
            `,
            isOpen ? "scale-y-100" : "scale-y-0",
          )}
        />

        {/* selected value */}
        <span className="flex min-w-0 items-center gap-2">
          {selectedOption?.icon && (
            <selectedOption.icon
              className="h-4 w-4 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-secondary"
            />
          )}

          <span className="truncate">{selectedOption?.label}</span>
        </span>

        {/* chevron */}
        <ChevronDown
          className={cn(
            `
              h-4 w-4
              shrink-0
              text-muted-foreground
              transition-all
              duration-200
            `,
            isOpen
              ? "rotate-180 text-secondary"
              : "group-hover:text-foreground",
          )}
        />
      </button>

      {/*===== DROPDOWN MENU =====*/}

      <Dropdown
        isOpen={isOpen}
        align={align}
        className="z-[200] !w-full min-w-[180px]"
        contentClassName=""
        showArrow={false}
      >
        <ul
          role="listbox"
          className="max-h-64 overflow-y-auto overscroll-contain py-1.5"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            const Icon = option.icon;

            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    `
                      group
                      relative
                      flex
                      min-h-10
                      w-full
                      items-center
                      gap-2.5
                      px-3
                      py-2
                      text-left
                      text-sm
                      outline-none
                      transition-[background-color,color]
                      duration-150

                      before:absolute
                      before:bottom-1.5
                      before:left-0
                      before:top-1.5
                      before:w-[2px]
                      before:origin-center
                      before:bg-secondary
                      before:transition-transform
                      before:duration-200
                    `,
                    isSelected
                      ? `
                          bg-secondary/[0.08]
                          font-medium
                          text-secondary

                          before:scale-y-100
                        `
                      : `
                          text-foreground

                          before:scale-y-0

                          hover:bg-secondary/[0.045]
                          hover:text-heading

                          hover:before:scale-y-75
                        `,
                  )}
                >
                  {/* icon */}
                  {Icon && (
                    <Icon
                      className={cn(
                        `
                          h-4 w-4
                          shrink-0
                          transition-colors
                          duration-150
                        `,
                        isSelected
                          ? "text-secondary"
                          : `
                              text-muted-foreground
                              group-hover:text-secondary
                            `,
                      )}
                    />
                  )}

                  {/* label */}
                  <span
                    className="min-w-0 flex-1 truncate"
                  >
                    {option.label}
                  </span>

                  {/* selected indicator */}
                  {isSelected && (
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-secondary/20 bg-secondary/[0.08]"
                    >
                      <Check
                        className="h-3 w-3 text-secondary"
                        strokeWidth={2.5}
                      />
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/*===== BOTTOM DETAIL =====*/}

        <div
          aria-hidden="true"
          className="flex items-center justify-between border-t border-border bg-muted/10 px-3 py-2"
        >
          <span
            className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/35"
          >
            Select option
          </span>

          <span
            className="h-px w-6 bg-secondary/30"
          />
        </div>
      </Dropdown>
    </div>
  );
};
