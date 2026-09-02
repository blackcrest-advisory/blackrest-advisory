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

export default function AdminRequestsLoading() {
  const rows = Array.from({ length: 5 }, (_, index) => index);

  return (
    <div className="relative space-y-6" aria-label="Loading project requests">
      {/*===== PROJECT REQUESTS HEADER SKELETON =====*/}

      <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
        {/* ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 -top-32 h-72 w-72 rounded-full bg-secondary/[0.07] blur-[100px]"
        />

        {/* secondary glow */}
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
        <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/20 to-transparent"/>

        <div className="relative z-10 grid gap-7 px-5 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-stretch lg:px-8 lg:py-7">
          {/*===== LEFT =====*/}

          <div className="flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Skeleton className="h-3.5 w-3.5 rounded-full" />
                <Skeleton className="h-2.5 w-28" />

                <span className="h-px w-8 bg-border" />

                <Skeleton className="h-2.5 w-24" />
              </div>

              <Skeleton className="mt-5 h-10 w-[72%] max-w-sm sm:h-11"/>

              <div className="mt-4 space-y-2">
                <Skeleton className="h-3.5 w-full max-w-2xl" />
                <Skeleton className="h-3.5 w-[82%] max-w-xl" />
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="border-t border-border pt-3">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-1.5 w-1.5 rounded-full" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                </div>
              ))}
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
                  <Skeleton className="h-2.5 w-24" />
                  <Skeleton className="mt-3 h-3 w-36" />
                </div>

                <Skeleton className="h-9 w-9" />
              </div>

              <Skeleton className="mt-6 h-10 w-16" />

              <Skeleton className="mt-2 h-3 w-32" />

              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <Skeleton className="h-2.5 w-24" />
                <Skeleton className="h-2.5 w-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*===== CONTROL WORKSPACE =====*/}

      <section className="relative">
        <div className="relative z-20 border border-border bg-card shadow-[var(--shadow-card)]">
          {/* top signal */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/20 to-transparent"
          />

          {/*===== CONTROL BAR =====*/}

          <div className="flex flex-col gap-3 px-4 py-4 sm:px-5 lg:px-6 xl:flex-row xl:items-center">
            <Skeleton className="h-10 min-w-0 flex-1 rounded-md" />

            <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2 xl:flex xl:flex-row xl:items-center">
              <Skeleton className="hidden h-10 w-10 rounded-md xl:block" />

              <Skeleton className="h-10 w-full rounded-md xl:w-44" />

              <Skeleton className="h-10 w-full rounded-md xl:w-52" />
            </div>
          </div>

          {/*===== RESULT METADATA =====*/}

          <div className="flex min-h-11 flex-wrap items-center justify-between gap-3 border-t border-border bg-muted/10 px-4 py-2.5 sm:px-5 lg:px-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-1.5 w-1.5 rounded-full" />
              <Skeleton className="h-3 w-40" />
            </div>

            <Skeleton className="h-2.5 w-20" />
          </div>
        </div>

        {/*===== REQUEST RECORDS =====*/}

        <div className="relative z-10 mt-3 min-w-0">
          <div className="relative border border-border bg-card shadow-[var(--shadow-card)]">
            {/* top signal */}
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 z-10 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/15 to-transparent"
            />

            {/*===== DESKTOP TABLE =====*/}

            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="border-b border-border bg-muted/15">
                  <tr>
                    {[
                      "Project",
                      "Service",
                      "Budget",
                      "Submitted",
                      "Client",
                      "Deadline",
                      "Status",
                      "Action",
                    ].map((item, index) => (
                      <th
                        key={item}
                        className={`
                          h-11
                          px-4
                          py-3
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
                                : index === 5
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
                  {rows.map((rowIndex) => (
                    <tr key={rowIndex}>
                      {/* project */}
                      <td className="px-5 py-4">
                        <div className="max-w-[220px]">
                          <Skeleton className="h-4 w-36" />
                          <Skeleton className="mt-2 h-2.5 w-28" />
                        </div>
                      </td>

                      {/* service */}
                      <td className="px-4 py-4">
                        <Skeleton className="h-6 w-28 rounded-md" />
                      </td>

                      {/* budget */}
                      <td className="px-4 py-4">
                        <Skeleton className="h-4 w-20" />
                      </td>

                      {/* submitted */}
                      <td className="px-4 py-4">
                        <Skeleton className="h-4 w-24" />
                      </td>

                      {/* client */}
                      <td className="px-4 py-4">
                        <div>
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="mt-2 h-2.5 w-28" />
                        </div>
                      </td>

                      {/* deadline */}
                      <td className="px-4 py-4">
                        <Skeleton className="h-4 w-24" />
                      </td>

                      {/* status */}
                      <td className="px-4 py-4">
                        <Skeleton className="h-6 w-20 rounded-md" />
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
              {rows.map((index) => (
                <article
                  key={index}
                  className="px-5 py-5 sm:px-6"
                >
                  {/* header */}
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-9 w-9 shrink-0 rounded-md" />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <Skeleton className="h-4 w-36" />
                          <Skeleton className="mt-2 h-2.5 w-24" />
                        </div>

                        <Skeleton className="h-8 w-8 shrink-0 rounded-md" />
                      </div>

                      <Skeleton className="mt-3 h-6 w-20 rounded-md" />
                    </div>
                  </div>

                  {/* service + budget */}
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <RecordSkeleton />
                    <RecordSkeleton />
                  </div>

                  {/* client + deadline */}
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <RecordSkeleton />
                    <RecordSkeleton />
                  </div>

                  {/* footer */}
                  <div className="mt-4 flex items-center justify-between gap-4 border-t border-border pt-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-3.5 w-3.5" />
                      <Skeleton className="h-3 w-32" />
                    </div>

                    <Skeleton className="h-2.5 w-12" />
                  </div>
                </article>
              ))}
            </div>

            {/*===== TABLE FOOTER =====*/}

            <div className="flex flex-col gap-2 border-t border-border bg-muted/10 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-center gap-2">
                <Skeleton className="h-1.5 w-1.5 rounded-full" />
                <Skeleton className="h-2.5 w-32" />
              </div>

              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </div>

        {/*===== PAGINATION SKELETON =====*/}

        <div className="mt-3 border border-border bg-card px-4 py-4 shadow-[var(--shadow-card)] sm:px-5 lg:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
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
// RECORD SKELETON
//==============================================================//

function RecordSkeleton() {
  return (
    <div className="rounded-md border border-border bg-background/40 p-3">
      <div className="flex items-center gap-2">
        <Skeleton className="h-3.5 w-3.5" />
        <Skeleton className="h-2.5 w-14" />
      </div>

      <Skeleton className="mt-2 h-3.5 w-[72%]" />
    </div>
  );
}
