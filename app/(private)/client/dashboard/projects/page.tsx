import { redirect } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  FolderKanban,
  Sparkles,
} from "lucide-react";

import { getCurrentUser } from "@/lib/utils/auth-utils";
import { getClientProjects } from "@/lib/actions/projects/project.action";
import { ClientProjectsTable } from "@/components/client-dashboard/projects/ClientProjectsTable";

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
      icon: FolderKanban,
      eyebrow: "Portfolio",
    },
    {
      label: "Active",
      value: active,
      icon: Clock3,
      eyebrow: "In Progress",
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle2,
      eyebrow: "Delivered",
    },
    {
      label: "On Hold",
      value: onHold,
      icon: AlertCircle,
      eyebrow: "Attention",
    },
  ];

  return (
    <div className="relative">
      {/*===== PAGE INTRO =====*/}

      <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
        {/* ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 -top-32 h-72 w-72 rounded-full bg-secondary/[0.09] blur-[100px]"
        />

        {/* architectural grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden opacity-[0.05] lg:block"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                var(--color-border) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "12.5% 100%",
          }}
        />

        {/* top signal */}
        <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/40 to-transparent"/>

        <div className="relative z-10 grid gap-7 px-5 py-7 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end lg:px-8 lg:py-8">
          {/* left */}
          <div>
            <div className="flex items-center gap-2">
              <FolderKanban className="h-3.5 w-3.5 text-secondary" />

              <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
                Project portfolio
              </span>

              <span className="h-px w-8 bg-secondary/30" />
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-heading sm:text-4xl">
              My Projects
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              View every Blackcrest engagement in one place, follow delivery
              progress, and keep track of project status and commercial details.
            </p>
          </div>

          {/* right summary */}
          <div className="border-t border-border pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-secondary" />

              <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.17em] text-secondary">
                Portfolio status
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Total engagements
                </span>

                <span className="text-sm font-semibold text-heading">
                  {total}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Currently active
                </span>

                <span className="text-sm font-semibold text-success">
                  {active}
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />

              <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
                Portfolio synced
              </span>
            </div>
          </div>
        </div>
      </section>

      {/*===== STATS =====*/}

      <section className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className="group relative min-h-[150px] overflow-hidden border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:border-secondary/25 hover:shadow-[var(--shadow-card-hover)]"
            >
              {/* index */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-5 -right-1 font-mono text-[5rem] font-semibold leading-none tracking-[-0.1em] text-foreground/[0.025]"
              >
                0{index + 1}
              </span>

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-secondary">
                      {stat.eyebrow}
                    </p>

                    <p className="mt-1 text-xs font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center border border-secondary/15 bg-secondary/[0.05] text-secondary transition-all duration-300 group-hover:border-secondary/30 group-hover:bg-secondary group-hover:text-secondary-foreground">
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </div>
                </div>

                <p className="mt-6 text-3xl font-semibold tracking-[-0.05em] text-heading">
                  {stat.value}
                </p>

                <div className="mt-4 h-px w-8 bg-secondary/25 transition-all duration-300 group-hover:w-14 group-hover:bg-secondary"/>
              </div>
            </article>
          );
        })}
      </section>

      {/*===== PROJECT WORKSPACE =====*/}

      <section className="mt-6">
        <ClientProjectsTable projects={projects} />
      </section>
    </div>
  );
}
