import { TextareaHTMLAttributes, ComponentType } from "react";
import { cn } from "@/lib/utils";

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
