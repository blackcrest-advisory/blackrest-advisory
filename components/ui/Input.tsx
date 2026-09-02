import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ElementType<{ className?: string }>;
}

export const Input = ({ icon: Icon, className = "", ...props }: InputProps) => {
  return (
    <div className="relative w-full">
      {Icon && (
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      )}
      <input
        className={cn(
          "min-h-10 w-full rounded-[var(--radius-control)] border border-border bg-background px-3 text-sm text-foreground shadow-[var(--shadow-control-inset)] transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-muted-foreground/70",
          "hover:border-secondary/35 focus:border-secondary/60 focus:outline-none focus:ring-4 focus:ring-secondary/10",
          "disabled:cursor-not-allowed disabled:bg-muted/50 disabled:opacity-60",
          Icon && "pl-9",
          className,
        )}
        {...props}
      />
    </div>
  );
};
