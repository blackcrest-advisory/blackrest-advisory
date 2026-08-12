import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import { getClientProjects } from "@/lib/actions/projects/project.action";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ClientProjectsTable } from "@/components/client-dashboard/projects/ClientProjectsTable";
import { Folder, CheckCircle, Clock, AlertCircle } from "lucide-react";

export default async function ClientProjectsPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const projects = await getClientProjects();

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

  const stats = [
    {
      label: "Total Projects",
      value: total,
      icon: Folder,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950/20",
    },
    {
      label: "Active",
      value: active,
      icon: Clock,
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-950/20",
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-950/20",
    },
    {
      label: "On Hold",
      value: onHold,
      icon: AlertCircle,
      color: "text-yellow-600",
      bg: "bg-yellow-50 dark:bg-yellow-950/20",
    },
  ];

  return (
    <Section>
      <Container>
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              My Projects
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              View and track all your active and completed projects.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-5">
                <div className="flex items-center gap-4">
                  <div className={`rounded-full p-2.5 ${stat.bg}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Table */}
        <ClientProjectsTable projects={projects} />
      </Container>
    </Section>
  );
}
