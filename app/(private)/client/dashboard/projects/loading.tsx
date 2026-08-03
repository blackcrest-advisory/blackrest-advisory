import { Container } from "@/components/ui/Container";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";

function SkeletonLine({ width = "w-full" }: { width?: string }) {
  return (
    <div className={`h-4 rounded-full bg-muted/60 animate-pulse ${width}`} />
  );
}

export default function Loading() {
  return (
    <PageWrapper>
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="h-10 w-2/5 rounded-full bg-muted/60 animate-pulse" />
              <SkeletonLine width="w-1/3" />
            </div>

            <div className="grid gap-4 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-border bg-card p-6"
                >
                  <SkeletonLine width="w-2/3" />
                  <div className="mt-4 space-y-3">
                    <SkeletonLine />
                    <SkeletonLine width="w-5/6" />
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-border bg-card p-6">
              <SkeletonLine width="w-1/4" />
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-10 rounded-full bg-muted/60 animate-pulse"
                  />
                ))}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-border bg-card p-6"
                >
                  <div className="h-6 w-1/2 rounded-full bg-muted/60 animate-pulse" />
                  <div className="mt-4 space-y-3">
                    <SkeletonLine />
                    <SkeletonLine />
                    <SkeletonLine width="w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
