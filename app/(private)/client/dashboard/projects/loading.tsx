//===== imports =====//
import { FolderKanban, Sparkles } from "lucide-react";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";

//===== Skeleton =====//
function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`
        animate-pulse
        bg-muted
        ${className}
      `}
    />
  );
}

export default function ClientProjectsLoading() {
  const rows = Array.from({ length: 4 }, (_, i) => i);

  return (
    <div className="relative">
      {/* ====================================================== */}
      {/* PAGE INTRO SKELETON                                    */}
      {/* ====================================================== */}

      <section
        className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
      >
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
        <div
          className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/40 to-transparent"
        />

        <div
          className="relative z-10 grid gap-7 px-5 py-7 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end lg:px-8 lg:py-8"
        >
          {/* left */}
          <div>
            <div className="flex items-center gap-2">
              <FolderKanban
                className="h-3.5 w-3.5 text-secondary/40"
              />

              <Skeleton className="h-2.5 w-28" />

              <span className="h-px w-8 bg-border" />
            </div>

            <Skeleton
              className="mt-5 h-9 w-44 sm:h-10 sm:w-52"
            />

            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-full max-w-xl" />
              <Skeleton className="h-4 w-[82%] max-w-lg" />
            </div>
          </div>

          {/* right */}
          <div
            className="border-t border-border pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-secondary/30" />

              <Skeleton className="h-2.5 w-24" />
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between gap-6">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-4 w-7" />
              </div>

              <div className="flex items-center justify-between gap-6">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-4 w-7" />
              </div>
            </div>

            <div
              className="mt-4 flex items-center gap-2 border-t border-border pt-4"
            >
              <Skeleton className="h-1.5 w-1.5 rounded-full" />
              <Skeleton className="h-2 w-24" />
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* STATS SKELETON                                        */}
      {/* ====================================================== */}

      <section
        className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
      >
        {[1, 2, 3, 4].map((item) => (
          <article
            key={item}
            className="relative min-h-[150px] overflow-hidden border border-border bg-card p-5 shadow-[var(--shadow-card)]"
          >
            {/* decorative number */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-5 -right-1 font-mono text-[5rem] font-semibold leading-none tracking-[-0.1em] text-foreground/[0.02]"
            >
              0{item}
            </span>

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Skeleton className="h-2 w-16" />
                  <Skeleton className="mt-2 h-3 w-24" />
                </div>

                <Skeleton className="h-9 w-9" />
              </div>

              <Skeleton className="mt-6 h-8 w-14" />

              <Skeleton className="mt-5 h-px w-8" />
            </div>
          </article>
        ))}
      </section>

      {/* ====================================================== */}
      {/* PROJECT PORTFOLIO SKELETON                             */}
      {/* ====================================================== */}

      <section
        className="relative mt-6 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
      >
        {/* top signal */}
        <div
          className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/30 via-secondary/10 to-transparent"
        />

        {/* ==================================================== */}
        {/* PORTFOLIO HEADER                                     */}
        {/* ==================================================== */}

        <div
          className="flex flex-col gap-4 border-b border-border px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
        >
          <div>
            <div className="flex items-center gap-2">
              <FolderKanban className="h-3.5 w-3.5 text-secondary/30" />

              <Skeleton className="h-2.5 w-32" />

              <span className="h-px w-8 bg-border" />
            </div>

            <Skeleton className="mt-3 h-6 w-40" />

            <Skeleton className="mt-2 h-3 w-80 max-w-full" />
          </div>

          <div
            className="flex items-center gap-2 border border-border bg-background/60 px-3 py-2"
          >
            <Skeleton className="h-2 w-12" />

            <span className="h-3 w-px bg-border" />

            <Skeleton className="h-3 w-4" />
          </div>
        </div>

        {/* ==================================================== */}
        {/* DESKTOP TABLE SKELETON                               */}
        {/* ==================================================== */}

        <div className="hidden overflow-x-auto lg:block">
          <Table>
            <TableHeader>
              <TableRow
                className="border-border bg-muted/20 hover:bg-muted/20"
              >
                <TableHead
                  className="h-11 pl-6 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45"
                >
                  Project
                </TableHead>

                <TableHead
                  className="h-11 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45"
                >
                  Service
                </TableHead>

                <TableHead
                  className="h-11 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45"
                >
                  Budget
                </TableHead>

                <TableHead
                  className="h-11 min-w-[170px] font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45"
                >
                  Progress
                </TableHead>

                <TableHead
                  className="h-11 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45"
                >
                  Status
                </TableHead>

                <TableHead
                  className="h-11 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45"
                >
                  Invoices
                </TableHead>

                <TableHead
                  className="h-11 pr-6 text-right font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45"
                >
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rows.map((row) => (
                <TableRow key={row} className="border-border">
                  {/* project */}
                  <TableCell className="py-4 pl-6">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-9 w-9 shrink-0" />

                      <div>
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="mt-2 h-2.5 w-20" />
                      </div>
                    </div>
                  </TableCell>

                  {/* service */}
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>

                  {/* budget */}
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>

                  {/* progress */}
                  <TableCell>
                    <div className="flex min-w-[150px] items-center gap-3">
                      <Skeleton className="h-1.5 flex-1" />
                      <Skeleton className="h-3 w-8" />
                    </div>
                  </TableCell>

                  {/* status */}
                  <TableCell>
                    <Skeleton className="h-6 w-20" />
                  </TableCell>

                  {/* invoices */}
                  <TableCell>
                    <div className="space-y-2">
                      <Skeleton className="h-3.5 w-20" />
                      <Skeleton className="h-2.5 w-14" />
                    </div>
                  </TableCell>

                  {/* action */}
                  <TableCell className="pr-6">
                    <Skeleton className="ml-auto h-4 w-12" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* ==================================================== */}
        {/* MOBILE + TABLET SKELETON                             */}
        {/* ==================================================== */}

        <div className="divide-y divide-border lg:hidden">
          {rows.map((row) => (
            <article
              key={row}
              className="px-5 py-5 sm:px-6"
            >
              {/* heading */}
              <div className="flex items-start gap-3">
                <Skeleton className="h-9 w-9 shrink-0" />

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Skeleton className="h-4 w-36" />
                      <Skeleton className="mt-2 h-2.5 w-20" />
                    </div>

                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
              </div>

              {/* service + budget */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div
                  className="border border-border bg-background/50 p-3"
                >
                  <Skeleton className="h-2 w-12" />
                  <Skeleton className="mt-2 h-3 w-20" />
                </div>

                <div
                  className="border border-border bg-background/50 p-3"
                >
                  <Skeleton className="h-2 w-12" />
                  <Skeleton className="mt-2 h-3 w-16" />
                </div>
              </div>

              {/* progress */}
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between">
                  <Skeleton className="h-2 w-24" />
                  <Skeleton className="h-3 w-8" />
                </div>

                <Skeleton className="h-1.5 w-full" />
              </div>

              {/* bottom */}
              <div
                className="mt-5 flex items-center justify-between gap-4 border-t border-border pt-4"
              >
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-3 w-20" />
              </div>
            </article>
          ))}
        </div>

        {/* ==================================================== */}
        {/* FOOTER SKELETON                                      */}
        {/* ==================================================== */}

        <div
          className="flex flex-col gap-2 border-t border-border bg-muted/15 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
        >
          <div className="flex items-center gap-2">
            <Skeleton className="h-1.5 w-1.5 rounded-full" />
            <Skeleton className="h-2 w-28" />
          </div>

          <Skeleton className="h-3 w-36" />
        </div>
      </section>
    </div>
  );
}
