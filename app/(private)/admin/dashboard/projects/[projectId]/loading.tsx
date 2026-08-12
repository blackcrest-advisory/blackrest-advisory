//===== imports =====//
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-muted rounded ${className}`} />;
}

export default function AdminProjectDetailLoading() {
  return (
    <Section>
      <Container>
        <div className="space-y-6">
          {/* Back link */}
          <Skeleton className="h-5 w-32" />

          {/* Header card */}
          <Card padding="lg">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="space-y-3">
                <Skeleton className="h-4 w-32" />
                <div className="flex flex-wrap items-center gap-3">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <div className="flex flex-wrap gap-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-2 w-48 rounded-full" />
                <Skeleton className="h-4 w-10" />
              </div>
              <Skeleton className="h-8 w-32" />
            </div>
          </Card>

          {/* Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              {/* Project Info */}
              <Card>
                <Skeleton className="h-6 w-40" />
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i}>
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="mt-1 h-4 w-24" />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Milestones */}
              <Card>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-32" />
                </div>
                <div className="mt-4 space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-lg border border-border p-3"
                    >
                      <Skeleton className="h-5 w-5 rounded" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="mt-1 h-3 w-48" />
                      </div>
                      <Skeleton className="h-4 w-4" />
                    </div>
                  ))}
                </div>
                <Skeleton className="mt-4 h-8 w-32" />
              </Card>

              {/* Invoices */}
              <Card>
                <Skeleton className="h-6 w-32" />
                <div className="mt-4 space-y-2">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg border border-border p-3"
                    >
                      <div>
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="mt-1 h-3 w-32" />
                      </div>
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-5 w-12 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Files */}
              <Card>
                <Skeleton className="h-6 w-32" />
                <div className="mt-4 space-y-2">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-lg border border-border p-3"
                    >
                      <Skeleton className="h-8 w-8 rounded" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="mt-1 h-3 w-24" />
                      </div>
                      <Skeleton className="h-4 w-4" />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Brief info */}
              <Card>
                <Skeleton className="h-6 w-32" />
                <div className="mt-4 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
