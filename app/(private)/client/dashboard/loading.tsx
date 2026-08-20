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
    <div className="relative">
      {/* ====================================================== */}
      {/* CLIENT WELCOME SKELETON                                */}
      {/* ====================================================== */}

      <section
        className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
      >
        {/* ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-36 h-[360px] w-[360px] rounded-full bg-secondary/[0.08] blur-[110px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 left-[20%] h-[280px] w-[280px] rounded-full bg-primary/[0.05] blur-[110px]"
        />

        {/* architectural grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden opacity-[0.06] lg:block"
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
              "linear-gradient(to right, transparent, black 40%, black)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 40%, black)",
          }}
        />

        {/* top signal */}
        <div
          className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/20 to-transparent"
        />

        <div
          className="relative z-10 grid gap-8 px-5 py-7 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-stretch lg:px-8 lg:py-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:px-9"
        >
          {/* left */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-2 w-2 rounded-full" />
                <Skeleton className="h-2.5 w-24" />
                <span className="h-px w-8 bg-border" />
                <Skeleton className="h-2.5 w-28" />
              </div>

              <Skeleton
                className="mt-6 h-10 w-[80%] max-w-xl sm:h-12"
              />

              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-full max-w-2xl" />
                <Skeleton className="h-4 w-[85%] max-w-xl" />
              </div>
            </div>

            <div
              className="mt-7 grid gap-3 sm:grid-cols-3"
            >
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

          {/* right workspace panel */}
          <div
            className="relative overflow-hidden border border-secondary/15 bg-secondary/[0.025] p-5 sm:p-6"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-secondary/[0.08] blur-3xl"
            />

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3.5 w-3.5" />
                    <Skeleton className="h-2.5 w-24" />
                  </div>

                  <Skeleton className="mt-3 h-5 w-40" />
                </div>

                <Skeleton className="h-2.5 w-16" />
              </div>

              <div className="mt-6 space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-border pb-3 last:border-b-0 last:pb-0"
                  >
                    <Skeleton className="h-2.5 w-20" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                ))}
              </div>

              <div
                className="mt-6 flex items-center justify-between border-t border-border pt-4"
              >
                <div className="flex items-center gap-2">
                  <Skeleton className="h-2 w-2 rounded-full" />
                  <Skeleton className="h-2.5 w-24" />
                </div>

                <Skeleton className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* STATS SKELETON                                        */}
      {/* ====================================================== */}

      <section
        className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <article
            key={index}
            className="relative min-h-[190px] overflow-hidden border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-6 -right-1 font-mono text-[6rem] font-semibold leading-none tracking-[-0.1em] text-foreground/[0.02]"
            >
              0{index + 1}
            </span>

            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div>
                  <Skeleton className="h-2 w-20" />
                  <Skeleton className="mt-2 h-3 w-28" />
                </div>

                <Skeleton className="h-10 w-10" />
              </div>

              <Skeleton className="mt-7 h-8 w-20" />

              <div
                className="mt-5 flex items-center justify-between border-t border-border pt-3"
              >
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-2 w-12" />
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* ====================================================== */}
      {/* PERFORMANCE CHART SKELETON                             */}
      {/* ====================================================== */}

      <section
        className="relative mt-6 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
      >
        <div
          className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/20 to-transparent"
        />

        {/* header */}
        <div
          className="grid gap-6 border-b border-border px-5 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end xl:px-7"
        >
          <div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-3.5 w-3.5" />
              <Skeleton className="h-2.5 w-28" />
              <span className="h-px w-8 bg-border" />
            </div>

            <Skeleton className="mt-3 h-6 w-48" />

            <div className="mt-2 space-y-2">
              <Skeleton className="h-3 w-96 max-w-full" />
              <Skeleton className="h-3 w-72 max-w-full" />
            </div>
          </div>

          <div
            className="flex items-center gap-2 border border-border bg-background/60 px-3 py-2"
          >
            <Skeleton className="h-2 w-12" />
            <span className="h-3 w-px bg-border" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>

        {/* summary */}
        <div
          className="grid border-b border-border bg-muted/10 sm:grid-cols-3"
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={`
                px-5 py-4
                sm:px-6
                ${
                  index > 0
                    ? "border-t border-border sm:border-l sm:border-t-0"
                    : ""
                }
              `}
            >
              <Skeleton className="h-2 w-20" />
              <Skeleton className="mt-2 h-6 w-24" />
            </div>
          ))}
        </div>

        {/* legend */}
        <div className="flex gap-6 px-5 pt-5 sm:px-6 xl:px-7">
          <div className="flex items-center gap-2">
            <Skeleton className="h-2 w-2 rounded-full" />
            <Skeleton className="h-3 w-24" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-2 w-2 rounded-full" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>

        {/* chart */}
        <div
          className="px-5 pb-5 pt-5 sm:px-6 lg:px-7"
        >
          <div
            className="relative h-[270px] overflow-hidden sm:h-[310px] lg:h-[350px]"
          >
            {/* chart grid */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-px w-full bg-border/60" />
              ))}
            </div>

            {/* approximate graph skeleton */}
            <div className="absolute inset-x-4 bottom-8 top-8">
              <div
                className="absolute bottom-[18%] left-[2%] h-[2px] w-[18%] origin-left -rotate-[10deg] bg-muted"
              />

              <div
                className="absolute bottom-[32%] left-[19%] h-[2px] w-[18%] origin-left rotate-[8deg] bg-muted"
              />

              <div
                className="absolute bottom-[25%] left-[36%] h-[2px] w-[20%] origin-left -rotate-[15deg] bg-muted"
              />

              <div
                className="absolute bottom-[44%] left-[54%] h-[2px] w-[20%] origin-left -rotate-[9deg] bg-muted"
              />

              <div
                className="absolute bottom-[57%] left-[72%] h-[2px] w-[24%] origin-left -rotate-[5deg] bg-muted"
              />
            </div>

            <div className="absolute inset-0 animate-pulse bg-muted/[0.06]" />
          </div>
        </div>

        {/* footer */}
        <div
          className="flex flex-col gap-3 border-t border-border bg-muted/15 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
        >
          <Skeleton className="h-2.5 w-40" />
          <Skeleton className="h-3 w-52 max-w-full" />
        </div>
      </section>

      {/* ====================================================== */}
      {/* PROJECTS + MILESTONES                                  */}
      {/* ====================================================== */}

      <section
        className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.4fr)]"
      >
        {/* active projects */}
        <div
          className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
        >
          <div
            className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/20 to-transparent"
          />

          <div
            className="flex flex-col gap-4 border-b border-border px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
          >
            <div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-3.5 w-3.5" />
                <Skeleton className="h-2.5 w-28" />
              </div>

              <Skeleton className="mt-3 h-5 w-36" />
              <Skeleton className="mt-2 h-3 w-72 max-w-full" />
            </div>

            <Skeleton className="h-8 w-20" />
          </div>

          <div className="divide-y divide-border">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="px-5 py-5 sm:px-6"
              >
                <div className="flex items-start gap-4">
                  <Skeleton className="h-10 w-10 shrink-0" />

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-5 w-20" />
                    </div>

                    <Skeleton className="mt-2 h-3 w-32" />

                    <div className="mt-4 flex items-center gap-3">
                      <Skeleton className="h-1.5 flex-1" />
                      <Skeleton className="h-3 w-8" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="flex flex-col gap-2 border-t border-border bg-muted/15 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
          >
            <Skeleton className="h-2.5 w-36" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>

        {/* milestones */}
        <div
          className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
        >
          <div
            className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/20 to-transparent"
          />

          <div className="border-b border-border px-5 py-5 sm:px-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3.5 w-3.5" />
                  <Skeleton className="h-2.5 w-24" />
                </div>

                <Skeleton className="mt-3 h-5 w-40" />
                <Skeleton className="mt-2 h-3 w-48" />
              </div>

              <Skeleton className="h-10 w-10" />
            </div>
          </div>

          <div className="divide-y divide-border">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="px-5 py-5 sm:px-6"
              >
                <div className="flex items-start gap-3">
                  <Skeleton className="h-8 w-8 shrink-0" />

                  <div className="flex-1">
                    <Skeleton className="h-4 w-[75%]" />
                    <Skeleton className="mt-2 h-3 w-[55%]" />

                    <div className="mt-4 flex items-center justify-between">
                      <Skeleton className="h-2.5 w-16" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="border-t border-border bg-muted/15 px-5 py-4 sm:px-6"
          >
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* QUICK ACTIONS + ACTIVITY                               */}
      {/* ====================================================== */}

      <section
        className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(280px,0.38fr)_minmax(0,1.62fr)]"
      >
        {/* quick actions */}
        <div
          className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
        >
          <div
            className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/20 to-transparent"
          />

          <div className="border-b border-border px-5 py-5 sm:px-6">
            <Skeleton className="h-2.5 w-24" />
            <Skeleton className="mt-3 h-5 w-28" />
            <Skeleton className="mt-2 h-3 w-48" />
          </div>

          <div className="divide-y divide-border">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-5 py-4 sm:px-6"
              >
                <Skeleton className="h-9 w-9 shrink-0" />

                <div className="flex-1">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="mt-2 h-3 w-40 max-w-full" />
                </div>

                <Skeleton className="h-4 w-4" />
              </div>
            ))}
          </div>

          <div
            className="flex items-center justify-between border-t border-border bg-muted/15 px-5 py-3.5 sm:px-6"
          >
            <Skeleton className="h-2 w-32" />
            <Skeleton className="h-2 w-16" />
          </div>
        </div>

        {/* activity */}
        <div
          className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
        >
          <div
            className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/20 to-transparent"
          />

          <div
            className="flex items-center justify-between gap-4 border-b border-border px-5 py-5 sm:px-6"
          >
            <div>
              <Skeleton className="h-2.5 w-28" />
              <Skeleton className="mt-3 h-5 w-36" />
              <Skeleton className="mt-2 h-3 w-72 max-w-full" />
            </div>

            <Skeleton className="h-10 w-10" />
          </div>

          <div className="divide-y divide-border">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="px-5 py-4 sm:px-6"
              >
                <div className="flex items-start gap-4">
                  <Skeleton className="h-9 w-9 shrink-0" />

                  <div className="flex-1">
                    <div
                      className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"
                    >
                      <div className="flex-1">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="mt-2 h-3 w-[85%]" />
                      </div>

                      <Skeleton className="h-2.5 w-16" />
                    </div>

                    <Skeleton className="mt-3 h-2.5 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="flex items-center justify-between border-t border-border bg-muted/15 px-5 py-4 sm:px-6"
          >
            <Skeleton className="h-2.5 w-36" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* SUPPORT SKELETON                                       */}
      {/* ====================================================== */}

      <section
        className="relative mt-6 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
      >
        <div
          className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/20 to-transparent"
        />

        <div
          className="grid gap-6 px-5 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:px-7 lg:py-7 xl:px-8"
        >
          {/* account manager */}
          <div className="flex items-start gap-4 sm:gap-5">
            <Skeleton className="h-16 w-16 shrink-0" />

            <div className="min-w-0 flex-1">
              <Skeleton className="h-2.5 w-28" />

              <Skeleton className="mt-3 h-3 w-32" />
              <Skeleton className="mt-2 h-6 w-40" />

              <div className="mt-3 space-y-2">
                <Skeleton className="h-3 w-full max-w-xl" />
                <Skeleton className="h-3 w-[75%] max-w-lg" />
              </div>

              <div className="mt-4 flex flex-wrap gap-4">
                <Skeleton className="h-3 w-48" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          </div>

          {/* actions */}
          <div
            className="border-t border-border pt-5 lg:min-w-[310px] lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0"
          >
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-2 w-20" />
                <Skeleton className="mt-2 h-4 w-28" />
              </div>

              <Skeleton className="h-9 w-9" />
            </div>

            <div className="mt-4 space-y-2">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>

            <div
              className="mt-4 flex items-center justify-between border-t border-border pt-4"
            >
              <Skeleton className="h-2.5 w-32" />
              <Skeleton className="h-2.5 w-8" />
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* FOOTER STATS SKELETON                                  */}
      {/* ====================================================== */}

      <section
        className="relative mt-6 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
      >
        <div
          className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/20 to-transparent"
        />

        <div
          className="flex flex-col gap-3 border-b border-border px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6"
        >
          <div>
            <Skeleton className="h-2.5 w-28" />
            <Skeleton className="mt-3 h-5 w-52" />
            <Skeleton className="mt-2 h-3 w-80 max-w-full" />
          </div>

          <Skeleton className="h-2 w-20" />
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`
                px-5 py-5
                sm:px-6

                ${index > 0 ? "border-t border-border sm:border-t-0" : ""}

                ${index % 2 !== 0 ? "sm:border-l" : ""}

                ${index > 1 ? "sm:border-t xl:border-t-0" : ""}

                ${index > 0 ? "xl:border-l" : ""}
              `}
            >
              <div className="flex items-start justify-between">
                <div>
                  <Skeleton className="h-2 w-20" />
                  <Skeleton className="mt-2 h-3 w-24" />
                </div>

                <Skeleton className="h-9 w-9" />
              </div>

              <Skeleton className="mt-5 h-7 w-24" />
              <Skeleton className="mt-4 h-px w-8" />
            </div>
          ))}
        </div>

        <div
          className="flex flex-col gap-2 border-t border-border bg-muted/15 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
        >
          <Skeleton className="h-2.5 w-28" />
          <Skeleton className="h-3 w-44" />
        </div>
      </section>
    </div>
  );
}
