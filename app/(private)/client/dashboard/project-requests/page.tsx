import { format } from "date-fns";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/client";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";

export default async function page() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  // Fetch requests
  const briefs = await prisma.brief.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      pillar: true,
      budget: true,
      status: true,
      createdAt: true,
    },
  });

  return (
    <Section>
      <Container>
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              My Project Requests
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Track the project requests you have submitted to Blackcrest.
            </p>
          </div>

          <Button
            href="/client/dashboard/projects/request"
            variant="primary"
            size="md"
          >
            + New Request
          </Button>
        </div>

        {/* Empty State */}
        {briefs.length === 0 ? (
          <div className="rounded-lg border border-border bg-card py-16 text-center">
            <h2 className="text-lg font-semibold text-foreground">
              No project requests yet
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              You haven&apos;t submitted any project requests yet.
            </p>

            <Button
              href="/client/dashboard/requests/new"
              variant="primary"
              size="md"
              className="mt-5"
            >
              Submit Your First Request
            </Button>
          </div>
        ) : (
          /* Requests Table */
          <div className="rounded-lg border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {briefs.map((brief) => (
                  <TableRow key={brief.id}>
                    {/* Project */}
                    <TableCell>
                      <div className="max-w-[260px]">
                        <p className="truncate font-medium text-foreground">
                          {brief.title}
                        </p>

                        <p className="mt-1 truncate text-xs text-muted-foreground">
                          #{brief.id}
                        </p>
                      </div>
                    </TableCell>

                    {/* Service */}
                    <TableCell>
                      <span className="whitespace-nowrap">
                        {brief.pillar.replace(/_/g, " ")}
                      </span>
                    </TableCell>

                    {/* Budget */}
                    <TableCell>
                      {brief.budget || (
                        <span className="text-muted-foreground">
                          Not specified
                        </span>
                      )}
                    </TableCell>

                    {/* Submitted */}
                    <TableCell className="whitespace-nowrap">
                      {format(brief.createdAt, "MMM d, yyyy")}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <StatusBadge status={brief.status} />
                    </TableCell>

                    {/* Action */}
                    <TableCell className="text-right">
                      <Link
                        href={`/client/dashboard/project-requests/${brief.id}`}
                        className="text-sm font-medium  hover:underline"
                      >
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Container>
    </Section>
  );
}
