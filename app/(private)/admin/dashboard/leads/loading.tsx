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

export default function Loading() {
  return (
    <div className="relative space-y-6" aria-label="Loading leads">
      {/*===== LEADS COMMAND HEADER SKELETON =====*/}

      <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-36 h-[340px] w-[340px] rounded-full bg-secondary/[0.07] blur-[110px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden opacity-[0.05] lg:block"
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
            backgroundSize: "110px 110px",
            maskImage:
              "linear-gradient(to right, transparent, black 38%, black)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 38%, black)",
          }}
        />

        <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/20 to-transparent"/>

        <div className="relative z-10 grid gap-8 px-5 py-7 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-stretch lg:px-8 lg:py-8">
          {/* left */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Skeleton className="h-3.5 w-3.5 rounded-full" />
                <Skeleton className="h-2.5 w-28" />

                <span className="h-px w-8 bg-border" />

                <Skeleton className="h-2.5 w-20" />
              </div>

              <Skeleton className="mt-5 h-10 w-40 sm:h-11"/>

              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-full max-w-2xl" />
                <Skeleton className="h-4 w-[82%] max-w-xl" />
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="border-t border-border pt-3"
                >
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-1.5 w-1.5 rounded-full" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* command panel */}
          <div className="relative overflow-hidden border border-secondary/15 bg-secondary/[0.025] p-5 sm:p-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-20 h-40 w-40 rounded-full bg-secondary/[0.08] blur-3xl"
            />

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Skeleton className="h-2.5 w-24" />
                  <Skeleton className="mt-3 h-5 w-44" />
                </div>

                <Skeleton className="h-9 w-9" />
              </div>

              <div className="mt-4 space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-[80%]" />
              </div>

              <Skeleton className="mt-5 h-9 w-full" />

              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <Skeleton className="h-2.5 w-28" />
                <Skeleton className="h-2.5 w-8" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*===== LEAD STATS SKELETON =====*/}

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <article
            key={index}
            className="relative min-h-[165px] overflow-hidden border border-border bg-card p-5 shadow-[var(--shadow-card)]"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-5 -right-1 font-mono text-[5rem] font-semibold leading-none tracking-[-0.1em] text-foreground/[0.02]"
            >
              0{index + 1}
            </span>

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Skeleton className="h-2 w-16" />
                  <Skeleton className="mt-2 h-3 w-20" />
                </div>

                <Skeleton className="h-9 w-9" />
              </div>

              <Skeleton className="mt-6 h-8 w-14" />

              <div className="mt-5 flex items-center justify-between border-t border-border pt-3">
                <Skeleton className="h-2 w-16" />
                <Skeleton className="h-px w-8" />
              </div>
            </div>
          </article>
        ))}
      </section>

      {/*===== LEAD DIRECTORY WORKSPACE =====*/}

      <section className="relative overflow-visible border border-border bg-card shadow-[var(--shadow-card)]">
        <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/20 to-transparent"/>

        {/* header */}
        <div className="border-b border-border px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-3.5 w-3.5" />
                <Skeleton className="h-2.5 w-24" />
                <span className="h-px w-8 bg-border" />
              </div>

              <Skeleton className="mt-3 h-6 w-36" />
              <Skeleton className="mt-2 h-3 w-80 max-w-full" />
            </div>

            <div className="flex items-center gap-2 border border-border bg-background/60 px-3 py-2">
              <Skeleton className="h-2 w-12" />
              <span className="h-3 w-px bg-border" />
              <Skeleton className="h-3 w-5" />
            </div>
          </div>
        </div>

        {/*===== SIMPLE FILTER BAR =====*/}

        <div className="relative z-20 border-b border-border bg-card px-5 py-4 sm:px-6">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
            <Skeleton className="h-10 min-w-0 flex-1" />

            <div className="grid gap-2 sm:grid-cols-3 xl:flex xl:items-center">
              <Skeleton className="hidden h-9 w-9 xl:block" />
              <Skeleton className="h-10 w-full xl:w-40" />
              <Skeleton className="h-10 w-full xl:w-44" />
              <Skeleton className="h-10 w-full xl:w-40" />
            </div>
          </div>
        </div>

        {/*===== DESKTOP TABLE SKELETON =====*/}

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="border-b border-border bg-muted/15">
              <tr>
                {[
                  "Company",
                  "Contact",
                  "Services",
                  "Status",
                  "Priority",
                  "Assigned To",
                  "Created",
                  "Actions",
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
                        ${index === 0 ? "w-16" : index === 5 ? "w-20" : "w-14"}
                        ${index === 7 ? "ml-auto" : ""}
                      `}
                    />
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {Array.from({ length: 6 }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {/* Company */}
                  <td className="px-5 py-4">
                    <Skeleton className="h-4 w-36" />
                  </td>

                  {/* Contact */}
                  <td className="px-4 py-4">
                    <Skeleton className="h-4 w-24" />
                  </td>

                  {/* Services */}
                  <td className="px-4 py-4">
                    <div className="flex gap-1.5">
                      <Skeleton className="h-6 w-24" />
                      {rowIndex % 2 === 0 && <Skeleton className="h-6 w-16" />}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4">
                    <Skeleton className="h-6 w-20" />
                  </td>

                  {/* Priority */}
                  <td className="px-4 py-4">
                    <Skeleton className="h-6 w-20" />
                  </td>

                  {/* Assigned */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2.5">
                      <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </td>

                  {/* Created */}
                  <td className="px-4 py-4">
                    <Skeleton className="h-4 w-24" />
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <Skeleton className="ml-auto h-7 w-7" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/*===== MOBILE + TABLET LEAD RECORDS =====*/}

        <div className="divide-y divide-border lg:hidden">
          {Array.from({ length: 5 }).map((_, index) => (
            <article
              key={index}
              className="px-5 py-5 sm:px-6"
            >
              {/* heading */}
              <div className="flex items-start gap-3">
                <Skeleton className="h-9 w-9 shrink-0" />

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <Skeleton className="h-4 w-36" />

                      <div className="mt-2 flex items-center gap-2">
                        <Skeleton className="h-3 w-3" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>

                    <Skeleton className="h-6 w-20 shrink-0" />
                  </div>
                </div>
              </div>

              {/* services */}
              <div className="mt-4">
                <Skeleton className="h-2 w-14" />

                <div className="mt-2 flex gap-1.5">
                  <Skeleton className="h-6 w-24" />
                  {index % 2 === 0 && <Skeleton className="h-6 w-20" />}
                </div>
              </div>

              {/* metadata */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="border border-border bg-background/40 p-3">
                  <Skeleton className="h-2 w-14" />
                  <Skeleton className="mt-2 h-6 w-20" />
                </div>

                <div className="border border-border bg-background/40 p-3">
                  <Skeleton className="h-2 w-14" />

                  <div className="mt-2 flex items-center gap-2">
                    <Skeleton className="h-7 w-7 rounded-full" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </div>

              {/* footer */}
              <div className="mt-4 flex items-center justify-between gap-4 border-t border-border pt-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3.5 w-3.5" />
                  <Skeleton className="h-3 w-24" />
                </div>

                <Skeleton className="h-7 w-7" />
              </div>
            </article>
          ))}
        </div>

        {/*===== PAGINATION SKELETON =====*/}

        <div className="border-t border-border bg-muted/15 px-5 py-4 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Skeleton className="h-3 w-36" />

            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
