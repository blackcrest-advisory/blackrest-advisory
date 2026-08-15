import { Container } from "@/components/ui/Container";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";

function SkeletonLine({ width = "w-full" }: { width?: string }) {
  return (
    <div className={`h-4 rounded-full bg-muted/60 animate-pulse ${width}`} />
  );
}

function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-xl border border-border bg-card p-6 ${className}`}>
      <SkeletonLine width="w-3/4" />
      <div className="mt-4 space-y-3">
        <SkeletonLine />
        <SkeletonLine width="w-5/6" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <PageWrapper>
      {/* ===== Welcome Section ===== */}
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <div className="h-10 w-2/3 rounded-full bg-muted/60 animate-pulse md:w-1/2" />
              <SkeletonLine width="w-3/4" />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-7 w-28 rounded-full bg-secondary/10 animate-pulse" />
            </div>
          </div>
        </Container>
      </Section>

      {/* ===== Stats ===== */}
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ===== Performance Chart ===== */}
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <div className="rounded-3xl border border-border bg-card p-6">
            <SkeletonLine width="w-1/4" />
            <div className="mt-4 h-64 w-full rounded-2xl bg-muted/60 animate-pulse" />
          </div>
        </Container>
      </Section>

      {/* ===== Active Projects + Upcoming Milestones ===== */}
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Active Projects (col-span-2) */}
            <div className="lg:col-span-2">
              <div className="rounded-3xl border border-border bg-card p-6">
                <SkeletonLine width="w-1/3" />
                <div className="mt-4 space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-muted/60 animate-pulse" />
                      <div className="flex-1 space-y-2">
                        <SkeletonLine width="w-2/3" />
                        <SkeletonLine width="w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Upcoming Milestones */}
            <div>
              <div className="rounded-3xl border border-border bg-card p-6">
                <SkeletonLine width="w-2/3" />
                <div className="mt-4 space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="space-y-1">
                      <SkeletonLine width="w-3/4" />
                      <SkeletonLine width="w-1/2" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ===== Quick Actions + Recent Activity ===== */}
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Quick Actions */}
            <div>
              <div className="rounded-3xl border border-border bg-card p-6">
                <SkeletonLine width="w-1/2" />
                <div className="mt-4 space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-12 rounded-2xl bg-muted/60 animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* Recent Activity (col-span-2) */}
            <div className="lg:col-span-2">
              <div className="rounded-3xl border border-border bg-card p-6">
                <SkeletonLine width="w-1/3" />
                <div className="mt-4 space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted/60 animate-pulse" />
                      <div className="flex-1 space-y-1">
                        <SkeletonLine width="w-2/3" />
                        <SkeletonLine width="w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ===== Support ===== */}
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <div className="rounded-3xl border border-border bg-card p-6">
            <SkeletonLine width="w-1/4" />
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 rounded-2xl bg-muted/60 animate-pulse"
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ===== Footer Stats ===== */}
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <div className="rounded-3xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-muted/60 animate-pulse" />
                  <SkeletonLine width="w-20" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
