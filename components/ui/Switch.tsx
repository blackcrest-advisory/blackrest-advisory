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
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-border/70 transition-[background-color,border-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/10",
        checked ? "border-secondary bg-secondary" : "bg-muted",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <motion.span
        animate={{ x: checked ? 24 : 4 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute left-0 h-4 w-4 rounded-full bg-white shadow-[0_1px_2px_rgb(15_23_42/0.25)]"
      />
    </button>
  );
};
