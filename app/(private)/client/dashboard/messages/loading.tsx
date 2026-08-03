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
              <div className="h-10 w-1/3 rounded-full bg-muted/60 animate-pulse" />
              <SkeletonLine width="w-1/2" />
            </div>

            <div className="grid gap-4 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-28 rounded-3xl bg-muted/60 animate-pulse"
                />
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-20 rounded-3xl bg-muted/60 animate-pulse"
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
