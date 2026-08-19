//===== imports =====//
import { redirect } from "next/navigation";
import { Activity, BriefcaseBusiness, CircleDot, Layers3 } from "lucide-react";

import { getAdminUser } from "@/lib/utils/admin-utils";
import { prisma } from "@/lib/db/client";

import { ProjectStats } from "@/components/admin-dashboard/projects/ProjectStats";
import { AdminProjectsClient } from "@/components/admin-dashboard/projects/AdminProjectsClient";

export default async function AdminProjectsPage() {
  //===== auth =====//
  const admin = await getAdminUser();

  if (!admin) {
    redirect("/login");
  }

  //===== fetch all projects with user and proposal data =====//
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
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
    (project) =>
      project.status === "ACTIVE" ||
      project.status === "PLANNING" ||
      project.status === "IN_REVIEW",
  ).length;

  const completed = projects.filter(
    (project) => project.status === "COMPLETED",
  ).length;

  const onHold = projects.filter(
    (project) => project.status === "ON_HOLD" || project.status === "CANCELLED",
  ).length;

  //===== render =====//
  return (
    <div className="relative space-y-6">
      {/* ====================================================== */}
      {/* PORTFOLIO HEADER                                       */}
      {/* ====================================================== */}

      <header
        className="
          relative
          overflow-hidden
          border-y border-border
          bg-card
        "
      >
        {/* left architectural rail */}
        <div
          aria-hidden="true"
          className="
            absolute
            bottom-0 left-0 top-0
            w-[3px]
            bg-gradient-to-b
            from-secondary
            via-secondary/40
            to-transparent
          "
        />

        {/* ambient field */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -right-28 top-1/2
            h-64 w-64
            -translate-y-1/2
            rounded-full
            bg-secondary/[0.055]
            blur-[100px]
          "
        />

        {/* fine vertical architecture */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute right-[290px] top-0
            hidden h-full w-px
            bg-border/70
            xl:block
          "
        />

        <div
          className="
            relative z-10
            grid
            gap-6
            px-5 py-7
            sm:px-6
            lg:px-8
            xl:grid-cols-[minmax(0,1fr)_260px]
            xl:items-stretch
          "
        >
          {/* ================================================== */}
          {/* TITLE                                              */}
          {/* ================================================== */}

          <div className="min-w-0">
            <div
              className="
                flex
                flex-wrap
                items-center
                gap-3
              "
            >
              <div className="flex items-center gap-2">
                <BriefcaseBusiness className="h-3.5 w-3.5 text-secondary" />

                <span
                  className="
                    font-mono
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-secondary
                  "
                >
                  Delivery portfolio
                </span>
              </div>

              <span className="h-px w-8 bg-secondary/30" />

              <span
                className="
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.14em]
                  text-muted-foreground/40
                "
              >
                Admin operations
              </span>
            </div>

            <div className="mt-5">
              <h1
                className="
                  text-3xl
                  font-semibold
                  tracking-[-0.05em]
                  text-heading
                  sm:text-[38px]
                  lg:text-[42px]
                "
              >
                Projects
              </h1>

              <p
                className="
                  mt-3
                  max-w-2xl
                  text-sm
                  leading-7
                  text-muted-foreground
                "
              >
                Manage active client engagements, monitor delivery health, and
                maintain visibility across the complete project portfolio.
              </p>
            </div>

            {/* operational rail */}
            <div
              className="
                mt-7
                flex
                flex-wrap
                items-center
                gap-x-6
                gap-y-3
                border-t border-border
                pt-4
              "
            >
              <div className="flex items-center gap-2">
                <CircleDot className="h-3.5 w-3.5 text-success" />

                <span
                  className="
                    font-mono
                    text-[7px]
                    uppercase
                    tracking-[0.14em]
                    text-muted-foreground/45
                  "
                >
                  Portfolio online
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Layers3 className="h-3.5 w-3.5 text-secondary" />

                <span className="text-xs text-muted-foreground">
                  <span className="font-semibold text-heading">{total}</span>{" "}
                  total project{total === 1 ? "" : "s"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Activity className="h-3.5 w-3.5 text-secondary" />

                <span className="text-xs text-muted-foreground">
                  <span className="font-semibold text-heading">{active}</span>{" "}
                  currently active
                </span>
              </div>
            </div>
          </div>

          {/* ================================================== */}
          {/* PORTFOLIO INDEX                                    */}
          {/* ================================================== */}

          <div
            className="
              flex
              flex-col
              justify-between
              border-t border-border
              pt-5
              xl:border-l
              xl:border-t-0
              xl:pl-7
              xl:pt-0
            "
          >
            <div>
              <span
                className="
                  font-mono
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.17em]
                  text-muted-foreground/40
                "
              >
                Portfolio index
              </span>

              <div className="mt-4 flex items-end gap-3">
                <span
                  className="
                    text-5xl
                    font-semibold
                    tracking-[-0.06em]
                    text-heading
                  "
                >
                  {total}
                </span>

                <span
                  className="
                    pb-1
                    text-xs
                    text-muted-foreground
                  "
                >
                  engagements
                </span>
              </div>
            </div>

            <div
              className="
                mt-6
                border-t border-border
                pt-4
              "
            >
              <div className="flex items-center justify-between gap-4">
                <span
                  className="
                    font-mono
                    text-[7px]
                    uppercase
                    tracking-[0.14em]
                    text-muted-foreground/40
                  "
                >
                  Delivery state
                </span>

                <span
                  className="
                    font-mono
                    text-[7px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-secondary
                  "
                >
                  Live
                </span>
              </div>

              <div className="mt-3 flex gap-1">
                <span className="h-1 flex-[3] bg-secondary" />
                <span className="h-1 flex-[2] bg-success/60" />
                <span className="h-1 flex-1 bg-warning/60" />
                <span className="h-1 flex-1 bg-border" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ====================================================== */}
      {/* PORTFOLIO STATS                                        */}
      {/* ====================================================== */}

      <ProjectStats
        total={total}
        active={active}
        completed={completed}
        onHold={onHold}
      />

      {/* ====================================================== */}
      {/* PROJECT DIRECTORY                                      */}
      {/* ====================================================== */}

      <AdminProjectsClient projects={projects} />
    </div>
  );
}
