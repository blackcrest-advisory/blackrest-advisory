//===== imports =====//
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

//===== skeleton helper =====//
function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-muted rounded ${className}`} />;
}

export default function ProjectRequestDetailsLoading() {
  return (
    <Section>
      <Container>
        {/* Back link */}
        <div className="mb-6">
          <Skeleton className="h-5 w-48" />
        </div>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-40" />
          </div>
          <Skeleton className="h-8 w-28 rounded-full" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Project Description */}
            <Card className="p-6">
              <Skeleton className="h-6 w-40" />
              <div className="mt-4 space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-10/12" />
                <Skeleton className="h-4 w-9/12" />
              </div>
            </Card>

            {/* Project Goals */}
            <Card className="p-6">
              <Skeleton className="h-6 w-32" />
              <div className="mt-4 space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-10/12" />
                <Skeleton className="h-4 w-8/12" />
              </div>
            </Card>

            {/* Target Audience */}
            <Card className="p-6">
              <Skeleton className="h-6 w-36" />
              <div className="mt-4 space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-9/12" />
              </div>
            </Card>

            {/* Reference Links */}
            <Card className="p-6">
              <Skeleton className="h-6 w-40" />
              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-10/12" />
              </div>
            </Card>

            {/* Attachments */}
            <Card className="p-6">
              <Skeleton className="h-6 w-32" />
              <div className="mt-4 space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Request Information */}
            <Card className="p-6">
              <Skeleton className="h-6 w-40" />
              <div className="mt-5 space-y-5">
                <div>
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="mt-1 h-4 w-24" />
                </div>
                <div>
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="mt-1 h-4 w-20" />
                </div>
                <div>
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="mt-1 h-4 w-28" />
                </div>
                <div>
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="mt-1 h-4 w-28" />
                </div>
                <div>
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="mt-1 h-4 w-28" />
                </div>
              </div>
            </Card>

            {/* Current Status */}
            <Card className="p-6">
              <Skeleton className="h-6 w-32" />
              <div className="mt-4">
                <Skeleton className="h-8 w-24 rounded-full" />
              </div>
              <div className="mt-3 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-10/12" />
              </div>
            </Card>

            {/* Back Button */}
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
