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
  const rows = Array.from({ length: 5 });

  return (
    <div className="relative space-y-6">
      {/*===== PAGE HERO SKELETON =====*/}

      <section
        className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
      >
        {/* ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 -top-32 h-72 w-72 rounded-full bg-secondary/[0.08] blur-[100px]"
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
        <div
          className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/20 to-transparent"
        />

        <div
          className="relative z-10 grid gap-7 px-5 py-7 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end lg:px-8 lg:py-8"
        >
          {/* left */}
          <div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-3.5 w-3.5" />

              <Skeleton className="h-2.5 w-28" />

              <span className="h-px w-8 bg-border" />
            </div>

            <Skeleton
              className="mt-5 h-9 w-72 max-w-full sm:h-10"
            />

            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-full max-w-2xl" />
              <Skeleton className="h-4 w-[80%] max-w-xl" />
            </div>
          </div>

          {/* right action area */}
          <div
            className="border-t border-border pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0"
          >
            <div className="flex items-center gap-2">
              <Skeleton className="h-3.5 w-3.5" />
              <Skeleton className="h-2.5 w-24" />
            </div>

            <Skeleton className="mt-4 h-4 w-44" />

            <div className="mt-2 space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-[85%]" />
            </div>

            <Skeleton className="mt-5 h-10 w-full" />
          </div>
        </div>
      </section>

      {/*===== REQUESTS TABLE SKELETON =====*/}

      <section
        className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
      >
        {/* top accent */}
        <div
          className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/20 to-transparent"
        />

        {/*===== TABLE HEADER SKELETON =====*/}

        <div
          className="flex flex-col gap-4 border-b border-border px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
        >
          <div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-3.5 w-3.5" />

              <Skeleton className="h-2.5 w-24" />

              <span className="h-px w-8 bg-border" />
            </div>

            <Skeleton className="mt-3 h-5 w-40" />

            <Skeleton className="mt-2 h-3 w-80 max-w-full" />
          </div>

          <div
            className="flex items-center gap-2 border border-border bg-background/60 px-3 py-2"
          >
            <Skeleton className="h-2 w-12" />

            <span className="h-3 w-px bg-border" />

            <Skeleton className="h-3 w-5" />
          </div>
        </div>

        {/*===== DESKTOP TABLE =====*/}

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full border-collapse text-left text-sm">
            <thead
              className="border-b border-border bg-muted/20"
            >
              <tr>
                <th className="h-11 px-6 py-3">
                  <Skeleton className="h-2.5 w-16" />
                </th>

                <th className="h-11 px-4 py-3">
                  <Skeleton className="h-2.5 w-14" />
                </th>

                <th className="h-11 px-4 py-3">
                  <Skeleton className="h-2.5 w-14" />
                </th>

                <th className="h-11 px-4 py-3">
                  <Skeleton className="h-2.5 w-20" />
                </th>

                <th className="h-11 px-4 py-3">
                  <Skeleton className="h-2.5 w-14" />
                </th>

                <th className="h-11 px-6 py-3">
                  <Skeleton className="ml-auto h-2.5 w-12" />
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {rows.map((_, index) => (
                <tr key={index}>
                  {/* Project */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-9 w-9 shrink-0" />

                      <div className="min-w-0">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="mt-2 h-2.5 w-28" />
                      </div>
                    </div>
                  </td>

                  {/* Service */}
                  <td className="px-4 py-4">
                    <Skeleton className="h-4 w-28" />
                  </td>

                  {/* Budget */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-3.5 w-3.5" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </td>

                  {/* Submitted */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-3.5 w-3.5" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4">
                    <Skeleton className="h-6 w-20" />
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4">
                    <Skeleton className="ml-auto h-3.5 w-12" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/*===== MOBILE + TABLET =====*/}

        <div className="divide-y divide-border lg:hidden">
          {rows.map((_, index) => (
            <article
              key={index}
              className="px-5 py-5 sm:px-6"
            >
              {/* heading */}
              <div className="flex items-start gap-3">
                <Skeleton className="h-9 w-9 shrink-0" />

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <Skeleton className="h-4 w-40 max-w-full" />
                      <Skeleton className="mt-2 h-2.5 w-28" />
                    </div>

                    <Skeleton className="h-6 w-20 shrink-0" />
                  </div>
                </div>
              </div>

              {/* request details */}
              <div
                className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3"
              >
                <div
                  className="border border-border bg-background/50 p-3"
                >
                  <Skeleton className="h-2 w-12" />
                  <Skeleton className="mt-2 h-3 w-24" />
                </div>

                <div
                  className="border border-border bg-background/50 p-3"
                >
                  <Skeleton className="h-2 w-12" />
                  <Skeleton className="mt-2 h-3 w-20" />
                </div>

                <div
                  className="border border-border bg-background/50 p-3"
                >
                  <Skeleton className="h-2 w-16" />
                  <Skeleton className="mt-2 h-3 w-24" />
                </div>
              </div>

              {/* action */}
              <div
                className="mt-5 flex items-center justify-between gap-4 border-t border-border pt-4"
              >
                <Skeleton className="h-2.5 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
            </article>
          ))}
        </div>

        {/*===== FOOTER =====*/}

        <div
          className="flex flex-col gap-2 border-t border-border bg-muted/15 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
        >
          <div className="flex items-center gap-2">
            <Skeleton className="h-1.5 w-1.5 rounded-full" />
            <Skeleton className="h-2 w-28" />
          </div>

          <Skeleton className="h-3 w-32" />
        </div>
      </section>
    </div>
  );
}
