import { Container } from "@/components/ui/Container";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-muted/60 rounded ${className}`} />;
}

function SkeletonText({
  width = "w-full",
  height = "h-4",
}: {
  width?: string;
  height?: string;
}) {
  return <Skeleton className={`${height} ${width}`} />;
}

export default function Loading() {
  return (
    <PageWrapper>
      <Section>
        <Container>
          {/* Header */}
          <div className="mb-6 space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>

          {/* Main Card */}
          <Card className="p-6">
            {/* Filters row */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {/* Search input */}
              <div className="flex-1 min-w-[200px]">
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              {/* Status dropdown */}
              <div className="w-48">
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              {/* Buttons */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-20 rounded-md" />
                <Skeleton className="h-9 w-16 rounded-md" />
              </div>
              {/* Count */}
              <Skeleton className="ml-auto h-4 w-24" />
            </div>

            {/* Table */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 text-left">
                      <SkeletonText width="w-24" />
                    </th>
                    <th className="pb-3 text-left">
                      <SkeletonText width="w-20" />
                    </th>
                    <th className="pb-3 text-left">
                      <SkeletonText width="w-16" />
                    </th>
                    <th className="pb-3 text-left">
                      <SkeletonText width="w-16" />
                    </th>
                    <th className="pb-3 text-left">
                      <SkeletonText width="w-20" />
                    </th>
                    <th className="pb-3 text-right">
                      <SkeletonText width="w-12" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <tr
                      key={i}
                      className="border-b border-border last:border-0"
                    >
                      <td className="py-4">
                        <SkeletonText width="w-28" />
                      </td>
                      <td className="py-4">
                        <SkeletonText width="w-32" />
                      </td>
                      <td className="py-4">
                        <SkeletonText width="w-20" />
                      </td>
                      <td className="py-4">
                        <Skeleton className="h-6 w-16 rounded-full" />
                      </td>
                      <td className="py-4">
                        <SkeletonText width="w-24" />
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <Skeleton className="h-8 w-8 rounded-full" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Container>
      </Section>
    </PageWrapper>
  );
}
