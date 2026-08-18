import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/utils";

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <section className={cn("py-5 md:py-8 lg:py-12", className)} {...props}>
      {children}
    </section>
  );
}
