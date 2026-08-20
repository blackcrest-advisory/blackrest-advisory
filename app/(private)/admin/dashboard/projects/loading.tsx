//===== imports =====//
import { BriefcaseBusiness, CircleDot, Layers3 } from "lucide-react";

//===== skeleton helper =====//
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

export default function AdminProjectsLoading() {
  const rows = Array.from({ length: 5 }, (_, index) => index);

  return (
    <div className="relative space-y-6" aria-label="Loading projects">
      {/*===== PORTFOLIO HEADER =====*/}

      <header
        className="relative overflow-hidden border-y border-border bg-card"
      >
        {/* left rail */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 top-0 w-[3px] bg-gradient-to-b from-secondary/60 via-secondary/20 to-transparent"
        />

        {/* ambient field */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-secondary/[0.055] blur-[100px]"
        />

        {/* right divider */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[290px] top-0 hidden h-full w-px bg-border/70 xl:block"
        />

        <div
          className="relative z-10 grid gap-6 px-5 py-7 sm:px-6 lg:px-8 xl:grid-cols-[minmax(0,1fr)_260px] xl:items-stretch"
        >
          {/*===== TITLE =====*/}

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <BriefcaseBusiness className="h-3.5 w-3.5 text-secondary/40" />

              <Skeleton className="h-2.5 w-28" />

              <span className="h-px w-8 bg-border" />

              <Skeleton className="h-2.5 w-24" />
            </div>

            <div className="mt-5">
              <Skeleton
                className="h-11 w-44 sm:h-12 sm:w-52"
              />

              <div className="mt-4 space-y-2.5">
                <Skeleton className="h-3.5 w-full max-w-2xl" />
                <Skeleton className="h-3.5 w-[82%] max-w-xl" />
              </div>
            </div>

            {/* operational rail */}
            <div
              className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-4"
            >
              <div className="flex items-center gap-2">
                <CircleDot className="h-3.5 w-3.5 text-muted-foreground/20" />
                <Skeleton className="h-2.5 w-24" />
              </div>

              <div className="flex items-center gap-2">
                <Layers3 className="h-3.5 w-3.5 text-muted-foreground/20" />
                <Skeleton className="h-3 w-24" />
              </div>

              <div className="flex items-center gap-2">
                <Skeleton className="h-3.5 w-3.5 rounded-full" />
                <Skeleton className="h-3 w-28" />
              </div>
            </div>
          </div>

          {/*===== PORTFOLIO INDEX =====*/}

          <div
            className="flex flex-col justify-between border-t border-border pt-5 xl:border-l xl:border-t-0 xl:pl-7 xl:pt-0"
          >
            <div>
              <Skeleton className="h-2.5 w-24" />

              <div className="mt-4 flex items-end gap-3">
                <Skeleton className="h-12 w-20" />
                <Skeleton className="mb-1 h-3 w-20" />
              </div>
            </div>

            <div
              className="mt-6 border-t border-border pt-4"
            >
              <div className="flex items-center justify-between gap-4">
                <Skeleton className="h-2.5 w-20" />
                <Skeleton className="h-2.5 w-10" />
              </div>

              <div className="mt-3 flex gap-1">
                <Skeleton className="h-1 flex-[3]" />
                <Skeleton className="h-1 flex-[2]" />
                <Skeleton className="h-1 flex-1" />
                <Skeleton className="h-1 flex-1" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/*===== PROJECT STATS =====*/}

      <section
        className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
      >
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/10 to-transparent"
        />

        <div
          className="grid sm:grid-cols-2 xl:grid-cols-4"
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="relative min-w-0 border-b border-border px-5 py-5 xl:border-b-0 xl:border-r xl:last:border-r-0"
            >
              <span
                aria-hidden="true"
                className="absolute right-4 top-3 font-mono text-[24px] font-semibold leading-none text-muted-foreground/[0.04]"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <Skeleton className="h-2.5 w-20" />
                  <Skeleton className="mt-3 h-8 w-14" />
                  <Skeleton className="mt-2 h-3 w-24" />
                </div>

                <Skeleton className="h-9 w-9 rounded-md" />
              </div>

              <div className="mt-5 h-px bg-border">
                <Skeleton className="h-px w-2/3" />
              </div>
            </div>
          ))}
        </div>

        <div
          className="flex items-center gap-2 border-t border-border bg-muted/10 px-5 py-3"
        >
          <Skeleton className="h-1.5 w-1.5 rounded-full" />
          <Skeleton className="h-2.5 w-36" />
        </div>
      </section>

      {/*===== PROJECT DIRECTORY =====*/}

      <section className="relative">
        {/*===== DIRECTORY CONTROLS =====*/}

        <div
          className="relative z-20 border border-border bg-card shadow-[var(--shadow-card)]"
        >
          {/* directory heading */}
          <div
            className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-md" />

              <div>
                <Skeleton className="h-2.5 w-24" />
                <Skeleton className="mt-2 h-3 w-44" />
              </div>
            </div>

            <Skeleton className="h-3 w-28" />
          </div>

          {/* controls */}
          <div
            className="flex flex-col gap-3 px-5 py-4 sm:px-6 xl:flex-row xl:items-center"
          >
            <Skeleton className="h-10 min-w-0 flex-1 rounded-md" />

            <div
              className="flex flex-col gap-2 sm:grid sm:grid-cols-2 xl:flex xl:flex-row xl:items-center"
            >
              <Skeleton className="hidden h-10 w-10 rounded-md xl:block" />

              <Skeleton className="h-10 w-full rounded-md xl:w-44" />

              <Skeleton className="h-10 w-full rounded-md xl:w-52" />
            </div>
          </div>

          {/* filter state */}
          <div
            className="flex min-h-10 flex-wrap items-center justify-between gap-3 border-t border-border bg-muted/10 px-5 py-2.5 sm:px-6"
          >
            <div className="flex items-center gap-2">
              <Skeleton className="h-1.5 w-1.5 rounded-full" />
              <Skeleton className="h-2.5 w-36" />
            </div>

            <Skeleton className="h-2.5 w-20" />
          </div>
        </div>

        {/*===== PROJECT RECORDS =====*/}

        <div className="relative z-10 mt-3 min-w-0">
          <div
            className="relative border border-border bg-card shadow-[var(--shadow-card)]"
          >
            {/* top signal */}
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 z-10 h-[2px] w-full bg-gradient-to-r from-secondary/35 via-secondary/10 to-transparent"
            />

            {/*===== DESKTOP TABLE =====*/}

            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full border-collapse text-left text-sm">
                <thead
                  className="border-b border-border bg-muted/15"
                >
                  <tr>
                    {[
                      "Project",
                      "Client",
                      "Service",
                      "Budget",
                      "Progress",
                      "Status",
                      "Assigned To",
                      "Action",
                    ].map((heading, index) => (
                      <th
                        key={heading}
                        className={`
                            h-11
                            px-4 py-3
                            ${index === 0 ? "pl-5" : ""}
                            ${index === 7 ? "pr-5 text-right" : ""}
                          `}
                      >
                        <Skeleton
                          className={`
                              h-2.5
                              ${
                                index === 0
                                  ? "w-16"
                                  : index === 6
                                    ? "w-20"
                                    : "w-14"
                              }
                              ${index === 7 ? "ml-auto" : ""}
                            `}
                        />
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {rows.map((row) => (
                    <tr key={row}>
                      {/* project */}
                      <td className="px-5 py-4">
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="mt-2 h-2.5 w-20" />
                      </td>

                      {/* client */}
                      <td className="px-4 py-4">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="mt-2 h-2.5 w-28" />
                      </td>

                      {/* service */}
                      <td className="px-4 py-4">
                        <Skeleton className="h-6 w-28 rounded-md" />
                      </td>

                      {/* budget */}
                      <td className="px-4 py-4">
                        <Skeleton className="h-4 w-20" />
                      </td>

                      {/* progress */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2.5">
                          <Skeleton className="h-1.5 w-20" />
                          <Skeleton className="h-3 w-8" />
                        </div>
                      </td>

                      {/* status */}
                      <td className="px-4 py-4">
                        <Skeleton className="h-6 w-20 rounded-md" />
                      </td>

                      {/* assigned */}
                      <td className="px-4 py-4">
                        <Skeleton className="h-4 w-24" />
                      </td>

                      {/* action */}
                      <td className="px-5 py-4">
                        <Skeleton className="ml-auto h-8 w-8 rounded-md" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/*===== MOBILE + TABLET =====*/}

            <div className="divide-y divide-border lg:hidden">
              {rows.map((row) => (
                <article
                  key={row}
                  className="px-5 py-5 sm:px-6"
                >
                  {/* header */}
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-9 w-9 shrink-0 rounded-md" />

                    <div className="min-w-0 flex-1">
                      <div
                        className="flex items-start justify-between gap-3"
                      >
                        <div className="min-w-0 flex-1">
                          <Skeleton className="h-4 w-36" />
                          <Skeleton className="mt-2 h-2.5 w-20" />
                        </div>

                        <Skeleton className="h-8 w-8 shrink-0 rounded-md" />
                      </div>

                      <Skeleton className="mt-3 h-6 w-20 rounded-md" />
                    </div>
                  </div>

                  {/* progress */}
                  <div
                    className="mt-4 border border-border bg-background/40 p-3"
                  >
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-2.5 w-28" />
                      <Skeleton className="h-3 w-8" />
                    </div>

                    <Skeleton className="mt-2 h-1.5 w-full" />
                  </div>

                  {/* details */}
                  <div
                    className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2"
                  >
                    <RecordSkeleton />
                    <RecordSkeleton />
                    <RecordSkeleton />
                    <RecordSkeleton />
                  </div>

                  {/* footer */}
                  <div
                    className="mt-4 flex items-center justify-between gap-4 border-t border-border pt-4"
                  >
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-1.5 w-1.5 rounded-full" />
                      <Skeleton className="h-2.5 w-24" />
                    </div>

                    <Skeleton className="h-2.5 w-12" />
                  </div>
                </article>
              ))}
            </div>

            {/*===== TABLE FOOTER =====*/}

            <div
              className="flex flex-col gap-2 border-t border-border bg-muted/10 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
            >
              <div className="flex items-center gap-2">
                <Skeleton className="h-1.5 w-1.5 rounded-full" />
                <Skeleton className="h-2.5 w-36" />
              </div>

              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </div>

        {/*===== PAGINATION =====*/}

        <div
          className="mt-3 border border-border bg-card px-5 py-4 shadow-[var(--shadow-card)] sm:px-6"
        >
          <div
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-2">
              <Skeleton className="h-1.5 w-1.5 rounded-full" />
              <Skeleton className="h-3 w-36" />
            </div>

            <div className="flex items-center gap-1">
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-9 w-9" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

//==============================================================//
// MOBILE RECORD SKELETON
//==============================================================//

function RecordSkeleton() {
  return (
    <div
      className="rounded-md border border-border bg-background/40 p-3"
    >
      <div className="flex items-center gap-2">
        <Skeleton className="h-3.5 w-3.5" />
        <Skeleton className="h-2.5 w-16" />
      </div>

      <Skeleton className="mt-2 h-3.5 w-[72%]" />
    </div>
  );
}
