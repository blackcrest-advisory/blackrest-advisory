import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

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
          "w-full rounded-sm border border-border bg-background px-3 py-2 text-sm text-foreground transition-all duration-200 placeholder:text-muted-foreground/60",
          "hover:border-secondary/40",
          "focus:border-transparent focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:ring-offset-2 focus:ring-offset-background",
          "focus-visible:ring-1 focus-visible:ring-secondary focus-visible:ring-offset-1 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          Icon && "pl-9",
          className,
        )}
        {...props}
      />
    </div>
  );
};
