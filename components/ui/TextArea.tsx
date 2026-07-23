import { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Textarea = ({
  className = "",
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      className={cn(
        "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-body/60",
        "focus:outline-none focus:ring-2 focus:ring-secondary/40",
        className,
      )}
      {...props}
    />
  );
};
