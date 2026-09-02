import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils/utils";

type SectionProps = ComponentPropsWithoutRef<"section">;

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("py-5 md:py-8 lg:py-12", className)}
        {...props}
      >
        {children}
      </section>
    );
  },
);

Section.displayName = "Section";
