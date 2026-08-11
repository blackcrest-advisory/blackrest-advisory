import { ChevronLeft } from "lucide-react";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-muted ${className}`} />;
}

export default function AdminProjectRequestDetailLoading() {
  return (
    <PageWrapper>
      <Section>
        <Container>
          <div className="space-y-6">
            {/* Back navigation */}
            <div className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
              <ChevronLeft className="h-4 w-4" />
              Project requests
            </div>

            {/* Header card */}
            <Card padding="lg">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0 flex-1 space-y-3">
                  <Skeleton className="h-3 w-40" />
                  <div className="flex flex-wrap items-center gap-3">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                </div>

                <div className="flex flex-shrink-0 flex-col items-start gap-3 md:items-end">
                  <Skeleton className="h-9 w-28" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </Card>

            {/* Content grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Main column */}
              <div className="space-y-6 lg:col-span-2">
                <Card>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-sm" />
                    <Skeleton className="h-5 w-36" />
                  </div>
                  <div className="mt-4 space-y-2.5">
                    <Skeleton className="h-3.5 w-full" />
                    <Skeleton className="h-3.5 w-full" />
                    <Skeleton className="h-3.5 w-5/6" />
                    <Skeleton className="h-3.5 w-full" />
                    <Skeleton className="h-3.5 w-2/3" />
                  </div>
                </Card>

                <Card>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-sm" />
                    <Skeleton className="h-5 w-28" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <Skeleton className="h-10 w-full rounded-[10px]" />
                    <Skeleton className="h-10 w-full rounded-[10px]" />
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <Skeleton className="h-5 w-20" />
                  <div className="mt-4 divide-y divide-border">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-4 py-2.5 first:pt-0 last:pb-0"
                      >
                        <Skeleton className="h-3.5 w-16" />
                        <Skeleton className="h-3.5 w-20" />
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
