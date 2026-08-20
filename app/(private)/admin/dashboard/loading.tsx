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

export default function Loading() {
  return (
    <div className="relative">
      {/* ====================================================== */}
      {/* ADMIN COMMAND HEADER                                   */}
      {/* ====================================================== */}

      <section
        className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
      >
        {/* ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-36 h-[340px] w-[340px] rounded-full bg-secondary/[0.07] blur-[110px]"
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
              ),
              linear-gradient(
                to bottom,
                var(--color-border) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "110px 110px",
            maskImage:
              "linear-gradient(to right, transparent, black 35%, black)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 35%, black)",
          }}
        />

        {/* top signal */}
        <div
          className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/20 to-transparent"
        />

        <div
          className="relative z-10 grid gap-8 px-5 py-7 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-stretch lg:px-8 lg:py-8"
        >
          {/* left */}
          <div className="flex flex-col justify-between">
            <div>
              {/* metadata */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-2 w-2 rounded-full" />
                  <Skeleton className="h-2.5 w-24" />
                </div>

                <span className="h-px w-8 bg-border" />

                <Skeleton className="h-2.5 w-12" />

                <span className="h-px w-8 bg-border" />

                <Skeleton className="h-2.5 w-16" />
              </div>

              {/* welcome heading */}
              <Skeleton
                className="mt-6 h-10 w-[78%] max-w-xl sm:h-12"
              />

              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-full max-w-2xl" />
                <Skeleton className="h-4 w-[82%] max-w-xl" />
              </div>
            </div>

            {/* operational categories */}
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
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* quick command */}
          <div
            className="relative overflow-hidden border border-secondary/15 bg-secondary/[0.025] p-5 sm:p-6"
          >
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

              <div className="mt-6 space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>

              <div
                className="mt-5 flex items-center justify-between border-t border-border pt-4"
              >
                <div className="flex items-center gap-2">
                  <Skeleton className="h-1.5 w-1.5 rounded-full" />
                  <Skeleton className="h-2 w-28" />
                </div>

                <Skeleton className="h-2 w-12" />
              </div>
            </div>
          </div>
        </div>

        {/* command status strip */}
        <div
          className="relative z-10 grid border-t border-border bg-muted/15 sm:grid-cols-3"
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={`
                flex
                items-center
                justify-between
                gap-4
                px-5 py-3.5
                sm:px-6

                ${
                  index > 0
                    ? "border-t border-border sm:border-l sm:border-t-0"
                    : ""
                }
              `}
            >
              <Skeleton className="h-2 w-16" />
              <Skeleton className="h-3 w-24" />
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================== */}
      {/* ADMIN KPI STATS                                        */}
      {/* ====================================================== */}

      <section
        className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5"
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <article
            key={index}
            className="relative min-h-[165px] overflow-hidden border border-border bg-card p-5 shadow-[var(--shadow-card)]"
          >
            {/* large index */}
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
                  <Skeleton className="mt-2 h-3 w-24" />
                </div>

                <Skeleton className="h-9 w-9" />
              </div>

              <Skeleton className="mt-7 h-8 w-16" />

              <div
                className="mt-5 flex items-center justify-between border-t border-border pt-3"
              >
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-2.5 w-10" />
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* ====================================================== */}
      {/* REVENUE CHART                                          */}
      {/* ====================================================== */}

      <section
        className="relative mt-6 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
      >
        {/* signal */}
        <div
          className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/20 to-transparent"
        />

        {/* header */}
        <div
          className="grid gap-6 border-b border-border px-5 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end"
        >
          <div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-3.5 w-3.5" />
              <Skeleton className="h-2.5 w-28" />
              <span className="h-px w-8 bg-border" />
            </div>

            <Skeleton className="mt-3 h-6 w-44" />

            <Skeleton className="mt-2 h-3 w-80 max-w-full" />
          </div>

          <div
            className="flex items-center gap-5 border-l border-border pl-5"
          >
            <div>
              <Skeleton className="h-2 w-20" />
              <Skeleton className="mt-2 h-6 w-28" />
            </div>

            <div>
              <Skeleton className="h-2 w-16" />
              <Skeleton className="mt-2 h-4 w-16" />
            </div>
          </div>
        </div>

        {/* chart */}
        <div
          className="px-5 py-6 sm:px-6"
        >
          <div
            className="relative h-[280px] overflow-hidden sm:h-[320px] lg:h-[350px]"
          >
            {/* horizontal grid */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-px w-full bg-border/60" />
              ))}
            </div>

            {/* fake line */}
            <div className="absolute inset-x-5 bottom-8 top-8">
              <div
                className="absolute bottom-[20%] left-[2%] h-[2px] w-[18%] -rotate-[12deg] bg-muted"
              />

              <div
                className="absolute bottom-[35%] left-[19%] h-[2px] w-[19%] rotate-[7deg] bg-muted"
              />

              <div
                className="absolute bottom-[29%] left-[36%] h-[2px] w-[22%] -rotate-[13deg] bg-muted"
              />

              <div
                className="absolute bottom-[48%] left-[56%] h-[2px] w-[20%] -rotate-[8deg] bg-muted"
              />

              <div
                className="absolute bottom-[61%] left-[74%] h-[2px] w-[22%] -rotate-[5deg] bg-muted"
              />
            </div>

            <div className="absolute inset-0 animate-pulse bg-muted/[0.05]" />
          </div>
        </div>

        {/* footer */}
        <div
          className="flex flex-col gap-2 border-t border-border bg-muted/15 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
        >
          <Skeleton className="h-2 w-32" />
          <Skeleton className="h-3 w-40" />
        </div>
      </section>

      {/* ====================================================== */}
      {/* ACTIVE PROJECTS + DEADLINES                            */}
      {/* ====================================================== */}

      <section
        className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.35fr)]"
      >
        {/* ==================================================== */}
        {/* ACTIVE PROJECTS                                      */}
        {/* ==================================================== */}

        <div
          className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
        >
          <div
            className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/20 to-transparent"
          />

          {/* header */}
          <div
            className="flex flex-col gap-4 border-b border-border px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
          >
            <div>
              <Skeleton className="h-2.5 w-24" />
              <Skeleton className="mt-3 h-5 w-36" />
              <Skeleton className="mt-2 h-3 w-56" />
            </div>

            <Skeleton className="h-8 w-20" />
          </div>

          {/* desktop */}
          <div className="hidden md:block">
            <div
              className="grid grid-cols-[minmax(180px,1.4fr)_100px_110px_160px_80px] gap-4 border-b border-border bg-muted/20 px-6 py-3"
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className={`
                    h-2
                    ${index === 0 ? "w-16" : index === 3 ? "w-20" : "w-12"}
                  `}
                />
              ))}
            </div>

            <div className="divide-y divide-border">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[minmax(180px,1.4fr)_100px_110px_160px_80px] items-center gap-4 px-6 py-4"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-9 w-9 shrink-0" />

                    <div>
                      <Skeleton className="h-4 w-36" />
                      <Skeleton className="mt-2 h-2.5 w-20" />
                    </div>
                  </div>

                  <Skeleton className="h-6 w-20" />

                  <Skeleton className="h-5 w-16" />

                  <div className="flex items-center gap-2">
                    <Skeleton className="h-1.5 flex-1" />
                    <Skeleton className="h-3 w-8" />
                  </div>

                  <Skeleton className="ml-auto h-3 w-10" />
                </div>
              ))}
            </div>
          </div>

          {/* mobile */}
          <div className="divide-y divide-border md:hidden">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="px-5 py-5 sm:px-6"
              >
                <div className="flex items-start gap-3">
                  <Skeleton className="h-9 w-9 shrink-0" />

                  <div className="flex-1">
                    <div className="flex justify-between gap-4">
                      <div>
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="mt-2 h-2.5 w-20" />
                      </div>

                      <Skeleton className="h-6 w-20" />
                    </div>

                    <div className="mt-4 flex gap-3">
                      <Skeleton className="h-8 flex-1" />
                      <Skeleton className="h-8 flex-1" />
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-2.5 w-20" />
                        <Skeleton className="h-3 w-8" />
                      </div>

                      <Skeleton className="mt-2 h-1.5 w-full" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* footer */}
          <div
            className="flex items-center justify-between border-t border-border bg-muted/15 px-5 py-3.5 sm:px-6"
          >
            <Skeleton className="h-2 w-28" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>

        {/* ==================================================== */}
        {/* UPCOMING DEADLINES                                   */}
        {/* ==================================================== */}

        <div
          className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
        >
          <div
            className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/20 to-transparent"
          />

          <div
            className="border-b border-border px-5 py-5 sm:px-6"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <Skeleton className="h-2.5 w-24" />
                <Skeleton className="mt-3 h-5 w-40" />
              </div>

              <Skeleton className="h-9 w-9" />
            </div>
          </div>

          <div className="divide-y divide-border">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex items-start gap-3 px-5 py-4 sm:px-6"
              >
                <Skeleton className="h-9 w-9 shrink-0" />

                <div className="min-w-0 flex-1">
                  <Skeleton className="h-4 w-[75%]" />
                  <Skeleton className="mt-2 h-3 w-[55%]" />

                  <div className="mt-3 flex items-center justify-between">
                    <Skeleton className="h-2 w-14" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="flex items-center justify-between border-t border-border bg-muted/15 px-5 py-3.5 sm:px-6"
          >
            <Skeleton className="h-2 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* QUICK ACTIONS + RECENT ACTIVITY                        */}
      {/* ====================================================== */}

      <section
        className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(280px,0.38fr)_minmax(0,1.62fr)]"
      >
        {/* ==================================================== */}
        {/* QUICK ACTIONS                                        */}
        {/* ==================================================== */}

        <div
          className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
        >
          <div
            className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/20 to-transparent"
          />

          <div
            className="border-b border-border px-5 py-5 sm:px-6"
          >
            <Skeleton className="h-2.5 w-24" />
            <Skeleton className="mt-3 h-5 w-32" />
            <Skeleton className="mt-2 h-3 w-44" />
          </div>

          <div className="divide-y divide-border">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-5 py-4 sm:px-6"
              >
                <Skeleton className="h-9 w-9 shrink-0" />

                <div className="min-w-0 flex-1">
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
            <Skeleton className="h-2 w-28" />
            <Skeleton className="h-2 w-16" />
          </div>
        </div>

        {/* ==================================================== */}
        {/* RECENT ACTIVITY                                      */}
        {/* ==================================================== */}

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
              <Skeleton className="h-2.5 w-24" />
              <Skeleton className="mt-3 h-5 w-36" />
              <Skeleton className="mt-2 h-3 w-72 max-w-full" />
            </div>

            <Skeleton className="h-9 w-9" />
          </div>

          <div className="divide-y divide-border">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-start gap-4 px-5 py-4 sm:px-6"
              >
                <Skeleton className="h-9 w-9 shrink-0" />

                <div className="min-w-0 flex-1">
                  <div
                    className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"
                  >
                    <div className="flex-1">
                      <Skeleton className="h-4 w-40" />

                      <Skeleton className="mt-2 h-3 w-[85%]" />
                    </div>

                    <Skeleton className="h-2.5 w-16" />
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-10" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="flex items-center justify-between border-t border-border bg-muted/15 px-5 py-3.5 sm:px-6"
          >
            <Skeleton className="h-2 w-32" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>
      </section>
    </div>
  );
}
