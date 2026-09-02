import { TextareaHTMLAttributes, ComponentType } from "react";
import { cn } from "@/lib/utils/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: ComponentType<{ className?: string }>;
}

export const Textarea = ({
  icon: Icon,
  className = "",
  ...props
}: TextareaProps) => {
  return (
    <div className="relative w-full">
      {Icon && (
        <Icon className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      )}

      <textarea
        className={cn(
          "w-full rounded-[var(--radius-control)] border border-border bg-background px-3 py-2.5 text-sm leading-6 text-foreground shadow-[var(--shadow-control-inset)] transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-muted-foreground/70",
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
