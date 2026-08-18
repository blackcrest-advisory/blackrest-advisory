"use client";

import { useRef, useState } from "react";
import { ChevronDown, LucideIcon } from "lucide-react";
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

  const handleSelect = (nextValue: string) => {
    onChange(nextValue);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        disabled={disabled}
        className={cn(
          "flex min-h-10 w-full items-center justify-between gap-2 rounded-[var(--radius-control)] border border-border bg-background px-3 text-sm text-foreground shadow-[var(--shadow-control-inset)] transition-[border-color,box-shadow,background-color] duration-200",
          "hover:border-secondary/35 focus:border-secondary/60 focus:outline-none focus:ring-4 focus:ring-secondary/10",
          disabled && "pointer-events-none cursor-not-allowed bg-muted/50 opacity-60",
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2 truncate">
          {selectedOption?.icon && (
            <selectedOption.icon className="h-4 w-4 shrink-0 text-body" />
          )}
          {selectedOption?.label}
        </span>

        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-body transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <Dropdown isOpen={isOpen} align={align}>
        <ul role="listbox" className="max-h-64 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
            >
              <button
                type="button"
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition-colors",
                  option.value === value
                    ? "bg-secondary/10 font-medium text-secondary"
                    : "text-foreground hover:bg-muted",
                )}
              >
                {option.icon && <option.icon className="h-4 w-4 shrink-0" />}
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </Dropdown>
    </div>
  );
};
