//===== imports =====//
import { redirect } from "next/navigation";
import { ClipboardList, CircleDot, Layers3 } from "lucide-react";

import { prisma } from "@/lib/db/client";
import { getCurrentUser } from "@/lib/utils/auth-utils";

import { AdminProjectRequestsClient } from "@/components/admin-dashboard/project-requests/AdminProjectRequestsClient";

export default async function AdminRequestsPage() {
  //===== auth =====//
  const user = await getCurrentUser();

  if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
    redirect("/login");
  }

  //===== data =====//
  const briefs = await prisma.brief.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      pillar: true,
      budget: true,
      status: true,
      currency: true,
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

  //===== render =====//
  return (
    <div className="relative space-y-6">
      {/*===== PROJECT REQUESTS HEADER =====*/}

      <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
        {/* ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 -top-32 h-72 w-72 rounded-full bg-secondary/[0.07] blur-[100px]"
        />

        {/* subtle secondary glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/3 top-4 h-28 w-28 rounded-full bg-primary/[0.04] blur-[70px] dark:bg-secondary/[0.035]"
        />

        {/* architectural grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden opacity-[0.04] lg:block"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                var(--color-border) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                var(--color-border) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "100px 100px",
            maskImage:
              "linear-gradient(to right, transparent, black 42%, black)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 42%, black)",
          }}
        />

        {/* top signal */}
        <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/35 to-transparent"/>

        <div className="relative z-10 grid gap-7 px-5 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-stretch lg:px-8 lg:py-7">
          {/*===== LEFT =====*/}

          <div className="flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <ClipboardList className="h-3.5 w-3.5 text-secondary" />

                  <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
                    Project operations
                  </span>
                </div>

                <span className="h-px w-8 bg-secondary/30" />

                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground/40">
                  Admin workspace
                </span>
              </div>

              <h1 className="mt-5 text-3xl font-semibold tracking-[-0.045em] text-heading sm:text-4xl">
                Project Requests
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                Review client submissions, track request progress, manage
                ownership, and move qualified work into delivery.
              </p>
            </div>

            {/* metadata */}
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="border-t border-border pt-3">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-success"/>

                  <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
                    Intake active
                  </span>
                </div>
              </div>

              <div className="border-t border-border pt-3">
                <div className="flex items-center gap-2">
                  <Layers3 className="h-3.5 w-3.5 text-secondary" />

                  <span className="text-xs text-muted-foreground">
                    {briefs.length} total requests
                  </span>
                </div>
              </div>

              <div className="border-t border-border pt-3">
                <div className="flex items-center gap-2">
                  <CircleDot className="h-3.5 w-3.5 text-secondary" />

                  <span className="text-xs text-muted-foreground">
                    Ordered by latest submission
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/*===== REQUEST SUMMARY =====*/}

          <div className="relative overflow-hidden border border-secondary/15 bg-secondary/[0.025] p-5 sm:p-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-14 -top-16 h-36 w-36 rounded-full bg-secondary/[0.07] blur-3xl"
            />

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.17em] text-secondary">
                    Request inventory
                  </span>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Current submission volume
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center border border-secondary/15 bg-secondary/[0.05] text-secondary">
                  <ClipboardList className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-6">
                <p className="text-4xl font-semibold tracking-[-0.05em] text-heading">
                  {briefs.length}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Total project requests
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-success"/>

                  <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
                    System available
                  </span>
                </div>

                <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-secondary">
                  BRF
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*===== REQUEST WORKSPACE =====*/}

      <AdminProjectRequestsClient briefs={briefs} />
    </div>
  );
}
