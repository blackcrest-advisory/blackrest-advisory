import { InputHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
}

export const Input = ({ icon: Icon, className = "", ...props }: InputProps) => {
  return (
    <div className="relative w-full">
      {Icon && (
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-body" />
      )}
      <input
        className={cn(
          "w-full rounded-md border border-border bg-background text-sm text-foreground placeholder:text-body/60",
          "px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/40",
          Icon && "pl-9",
          className,
        )}
        {...props}
      />
    </div>
  );
};
