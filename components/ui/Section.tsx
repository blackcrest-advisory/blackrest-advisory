import { cn } from "@/lib/utils/utils";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
};

export function Section({ children, className }: SectionProps) {
  return (
    <section className={cn("py-5 md:py-8 lg:py-12", className)}>
      {children}
    </section>
  );
}
