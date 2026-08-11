//===== imports =====//
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/client";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ProjectRequestsTable } from "@/components/admin-dashboard/project-requests/ProjectRequestsTable";

export default async function AdminRequestsPage() {
  const user = await getCurrentUser();

  if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN"))
    redirect("/login");

  const briefs = await prisma.brief.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      pillar: true,
      budget: true,
      status: true,
      createdAt: true,
      deadline: true,
      assignedTo: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return (
    <Section>
      <Container>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              All Project Requests
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage all client submissions and update their statuses.
            </p>
          </div>
        </div>

        <ProjectRequestsTable
          briefs={briefs}
          basePath="/admin/dashboard/project-requests"
          isAdmin={true}
        />
      </Container>
    </Section>
  );
}
