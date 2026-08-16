import { Container } from "@/components/ui/Container";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";

function Skeleton({ className }: { className: string }) {
  return <div className={`animate-pulse rounded bg-muted/60 ${className}`} />;
}

export default function Loading() {
  return (
    <PageWrapper>
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <div className="space-y-6" aria-label="Loading leads">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-9 w-28" />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {Array.from({ length: 5 }, (_, index) => (
                <div key={index} className="rounded-lg border border-border bg-card-bg p-4">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="mt-3 h-8 w-12" />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <Skeleton className="h-10 flex-1" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-10 w-44" />
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-10 w-36" />
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-border bg-card-bg">
              <div className="grid grid-cols-8 gap-4 border-b border-border px-4 py-4">
                {Array.from({ length: 8 }, (_, index) => (
                  <Skeleton key={index} className="h-4 w-full" />
                ))}
              </div>
              {Array.from({ length: 5 }, (_, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-8 gap-4 border-b border-border px-4 py-5 last:border-b-0">
                  {Array.from({ length: 8 }, (_, cellIndex) => (
                    <Skeleton key={cellIndex} className="h-5 w-full" />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
