//===== imports =====//
import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/utils/admin-utils";
import { prisma } from "@/lib/db/client";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ProjectStats } from "@/components/admin-dashboard/projects/ProjectStats";
import { AdminProjectsTable } from "@/components/admin-dashboard/projects/AdminProjectsTable";

export default async function AdminProjectsPage() {
  const admin = await getAdminUser();
  if (!admin) {
    redirect("/login");
  }

  //===== fetch all projects with user and proposal data =====//
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      proposal: {
        select: {
          id: true,
          brief: {
            select: {
              title: true,
              pillar: true,
            },
          },
        },
      },
    },
  });

  //===== stats =====//
  const total = projects.length;
  const active = projects.filter(
    (p) =>
      p.status === "ACTIVE" ||
      p.status === "PLANNING" ||
      p.status === "IN_REVIEW",
  ).length;
  const completed = projects.filter((p) => p.status === "COMPLETED").length;
  const onHold = projects.filter(
    (p) => p.status === "ON_HOLD" || p.status === "CANCELLED",
  ).length;

  return (
    <Section>
      <Container>
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Projects</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage all client projects created from accepted proposals.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <ProjectStats
            total={total}
            active={active}
            completed={completed}
            onHold={onHold}
          />
        </div>

        {/* Table */}
        <AdminProjectsTable projects={projects} />
      </Container>
    </Section>
  );
}
