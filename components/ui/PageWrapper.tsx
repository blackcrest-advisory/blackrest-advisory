import { cn } from "@/lib/utils/utils";

type PageWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <main
      className={cn("min-h-screen bg-background text-foreground", className)}
    >
      {children}
    </main>
  );
}
