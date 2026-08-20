import { format } from "date-fns";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowUpRight,
  CalendarDays,
  FileText,
  FolderKanban,
  Plus,
  Sparkles,
  WalletCards,
} from "lucide-react";

import { prisma } from "@/lib/db/client";
import { getCurrentUser } from "@/lib/utils/auth-utils";

import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
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

  //===== Fetch requests =====//
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
      currency: true,
      status: true,
      createdAt: true,
    },
  });

  return (
    <div className="relative space-y-6">
      {/*===== PAGE HERO =====*/}

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

        {/* top accent */}
        <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/40 to-transparent"/>

        <div className="relative z-10 grid gap-7 px-5 py-7 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end lg:px-8 lg:py-8">
          {/* left */}
          <div>
            <div className="flex items-center gap-2">
              <FileText className="h-3.5 w-3.5 text-secondary" />

              <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
                Project requests
              </span>

              <span className="h-px w-8 bg-secondary/30" />
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-heading sm:text-4xl">
              My Project Requests
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Track the project requests you have submitted to Blackcrest and
              follow each request through review and approval.
            </p>
          </div>

          {/* right */}
          <div className="border-t border-border pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-secondary" />

              <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.17em] text-secondary">
                New engagement
              </span>
            </div>

            <p className="mt-3 text-sm font-semibold text-heading">
              Ready to start something new?
            </p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Submit a new request and Blackcrest will review your project
              requirements.
            </p>

            <Button
              href="/client/dashboard/projects/request"
              variant="primary"
              size="md"
              className="group mt-5 w-full justify-between"
            >
              <span className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Request
              </span>

              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/>
            </Button>
          </div>
        </div>
      </section>

      {/*===== REQUESTS =====*/}

      {briefs.length === 0 ? (
        /* ==================================================== */
        /* EMPTY STATE                                          */
        /* ==================================================== */

        <section className="relative overflow-hidden border border-border bg-card px-6 py-16 text-center shadow-[var(--shadow-card)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-secondary/[0.08] blur-[90px]"
          />

          <div className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center border border-secondary/15 bg-secondary/[0.05] text-secondary">
            <FolderKanban className="h-5 w-5" />
          </div>

          <h2 className="relative z-10 mt-5 text-lg font-semibold tracking-[-0.02em] text-heading">
            No project requests yet
          </h2>

          <p className="relative z-10 mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            You haven&apos;t submitted any project requests yet.
          </p>

          <Button
            href="/client/dashboard/projects/request"
            variant="primary"
            size="md"
            className="relative z-10 mt-6"
          >
            Submit Your First Request
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </section>
      ) : (
        <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
          {/* top line */}
          <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/40 to-transparent"/>

          {/*===== TABLE HEADER =====*/}

          <div className="flex flex-col gap-4 border-b border-border px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <div className="flex items-center gap-2">
                <FolderKanban className="h-3.5 w-3.5 text-secondary" />

                <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
                  Request history
                </span>

                <span className="h-px w-8 bg-secondary/30" />
              </div>

              <h2 className="mt-2 text-lg font-semibold tracking-[-0.025em] text-heading sm:text-xl">
                Submitted Requests
              </h2>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Review your submitted briefs, budgets, services, and current
                request status.
              </p>
            </div>

            <div className="flex items-center gap-2 border border-border bg-background/60 px-3 py-2">
              <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
                Requests
              </span>

              <span className="h-3 w-px bg-border" />

              <span className="text-xs font-semibold text-heading">
                {briefs.length}
              </span>
            </div>
          </div>

          {/*===== DESKTOP TABLE =====*/}

          <div className="hidden overflow-x-auto lg:block">
            <Table>
              <TableHeader>
                <TableRow className="border-border bg-muted/20 hover:bg-muted/20">
                  <TableHead className="h-11 pl-6 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45">
                    Project
                  </TableHead>

                  <TableHead className="h-11 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45">
                    Service
                  </TableHead>

                  <TableHead className="h-11 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45">
                    Budget
                  </TableHead>

                  <TableHead className="h-11 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45">
                    Submitted
                  </TableHead>

                  <TableHead className="h-11 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45">
                    Status
                  </TableHead>

                  <TableHead className="h-11 pr-6 text-right font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {briefs.map((brief, index) => (
                  <TableRow
                    key={brief.id}
                    className="group/row border-border transition-colors duration-200 hover:bg-secondary/[0.025]"
                  >
                    {/* Project */}
                    <TableCell className="py-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-background font-mono text-[8px] font-semibold text-muted-foreground/40 transition-all duration-200 group-hover/row:border-secondary/25 group-hover/row:text-secondary">
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        <div className="min-w-0 max-w-[260px]">
                          <Link
                            href={`/client/dashboard/project-requests/${brief.id}`}
                            className="block truncate text-sm font-semibold text-heading transition-colors hover:text-secondary"
                          >
                            {brief.title}
                          </Link>

                          <p className="mt-1 truncate font-mono text-[8px] uppercase tracking-[0.1em] text-muted-foreground/35">
                            #{brief.id}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Service */}
                    <TableCell>
                      <span className="whitespace-nowrap text-sm text-muted-foreground">
                        {brief.pillar.replace(/_/g, " ")}
                      </span>
                    </TableCell>

                    {/* Budget */}
                    <TableCell>
                      {brief.budget || brief.currency ? (
                        <div className="flex items-center gap-2">
                          <WalletCards className="h-3.5 w-3.5 text-secondary" />

                          <span className="whitespace-nowrap text-sm font-medium text-foreground">
                            {brief.budget || "—"} {brief.currency || ""}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          Not specified
                        </span>
                      )}
                    </TableCell>

                    {/* Submitted */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-3.5 w-3.5 text-secondary" />

                        <span className="whitespace-nowrap text-sm text-muted-foreground">
                          {format(brief.createdAt, "MMM d, yyyy")}
                        </span>
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <StatusBadge status={brief.status} />
                    </TableCell>

                    {/* Action */}
                    <TableCell className="pr-6 text-right">
                      <Link
                        href={`/client/dashboard/project-requests/${brief.id}`}
                        className="group/link inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-secondary"
                      >
                        View
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"/>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/*===== MOBILE + TABLET =====*/}

          <div className="divide-y divide-border lg:hidden">
            {briefs.map((brief, index) => (
              <article
                key={brief.id}
                className="group relative px-5 py-5 transition-colors duration-200 hover:bg-secondary/[0.02] sm:px-6"
              >
                {/* heading */}
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-background font-mono text-[8px] font-semibold text-muted-foreground/40">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          href={`/client/dashboard/project-requests/${brief.id}`}
                          className="block truncate text-sm font-semibold text-heading transition-colors hover:text-secondary"
                        >
                          {brief.title}
                        </Link>

                        <p className="mt-1 truncate font-mono text-[8px] uppercase tracking-[0.1em] text-muted-foreground/35">
                          #{brief.id}
                        </p>
                      </div>

                      <StatusBadge status={brief.status} />
                    </div>
                  </div>
                </div>

                {/* details */}
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="border border-border bg-background/50 p-3">
                    <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
                      Service
                    </p>

                    <p className="mt-1 truncate text-xs font-medium text-foreground">
                      {brief.pillar.replace(/_/g, " ")}
                    </p>
                  </div>

                  <div className="border border-border bg-background/50 p-3">
                    <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
                      Budget
                    </p>

                    <p className="mt-1 truncate text-xs font-medium text-foreground">
                      {brief.budget || brief.currency
                        ? `${brief.budget || "—"} ${brief.currency || ""}`
                        : "Not specified"}
                    </p>
                  </div>

                  <div className="border border-border bg-background/50 p-3">
                    <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
                      Submitted
                    </p>

                    <p className="mt-1 whitespace-nowrap text-xs font-medium text-foreground">
                      {format(brief.createdAt, "MMM d, yyyy")}
                    </p>
                  </div>
                </div>

                {/* action */}
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/35">
                    Request record
                  </span>

                  <Link
                    href={`/client/dashboard/project-requests/${brief.id}`}
                    className="group/link inline-flex items-center gap-1.5 text-xs font-semibold text-secondary"
                  >
                    View request
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"/>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/*===== FOOTER =====*/}

          <div className="flex flex-col gap-2 border-t border-border bg-muted/15 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />

              <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-muted-foreground/40">
                Request history synced
              </span>
            </div>

            <span className="text-xs text-muted-foreground">
              {briefs.length} request{briefs.length === 1 ? "" : "s"} submitted
            </span>
          </div>
        </section>
      )}
    </div>
  );
}
