"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/utils";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const Switch = ({
  checked,
  onChange,
  disabled = false,
  className = "",
}: SwitchProps) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:ring-offset-2 focus:ring-offset-background",
        checked ? "bg-secondary" : "bg-muted",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <motion.span
        animate={{ x: checked ? 24 : 4 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute left-0 h-4 w-4 rounded-full bg-white shadow-sm"
      />
    </button>
  );
};
