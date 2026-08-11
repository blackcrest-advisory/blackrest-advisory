import { notFound } from "next/navigation";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { getAdminUser } from "@/lib/utils/admin-utils";
import { prisma } from "@/lib/db/client";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { format } from "date-fns";

interface AdminProjectRequestPageProps {
  params: {
    id: string;
  };
}

export default async function AdminProjectRequestDetailPage({
  params,
}: AdminProjectRequestPageProps) {
  const admin = await getAdminUser();

  if (!admin) {
    notFound();
  }

  const brief = await prisma.brief.findUnique({
    where: {
      id: params.id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          companyName: true,
        },
      },
    },
  });

  if (!brief) {
    notFound();
  }

  return (
    <PageWrapper>
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground">
                    Project request details
                  </p>
                  <h1 className="mt-3 text-3xl font-semibold text-foreground">
                    {brief.title}
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Submitted by {brief.user.name}
                    {brief.user.companyName
                      ? ` • ${brief.user.companyName}`
                      : ""}
                  </p>
                </div>
                <div className="rounded-3xl bg-secondary/5 px-4 py-3 text-sm font-semibold text-secondary">
                  <span className="block">Status</span>
                  <span>{brief.status}</span>
                </div>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-border bg-background p-6">
                  <h2 className="text-lg font-semibold text-foreground">
                    Project summary
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-body">
                    {brief.problem}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="rounded-3xl border border-border bg-background p-6">
                    <h2 className="text-lg font-semibold text-foreground">
                      Details
                    </h2>
                    <div className="mt-4 space-y-3 text-sm text-body">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Pillar</span>
                        <span className="font-medium text-foreground">
                          {brief.pillar}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Budget</span>
                        <span className="font-medium text-foreground">
                          {brief.budget ?? "—"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Deadline</span>
                        <span className="font-medium text-foreground">
                          {brief.deadline ?? "—"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Submitted</span>
                        <span className="font-medium text-foreground">
                          {format(
                            new Date(brief.createdAt),
                            "MMM d, yyyy h:mm a",
                          )}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">
                          Request status
                        </span>
                        <StatusBadge status={brief.status.toLowerCase()} />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-border bg-background p-6">
                    <h2 className="text-lg font-semibold text-foreground">
                      Attachments
                    </h2>
                    {brief.attachments.length > 0 ? (
                      <ul className="mt-4 space-y-2 text-sm text-body">
                        {brief.attachments.map((attachment) => (
                          <li
                            key={attachment}
                            className="rounded-lg border border-border bg-card p-3"
                          >
                            {attachment}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-4 text-sm text-muted-foreground">
                        No attachments provided.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
