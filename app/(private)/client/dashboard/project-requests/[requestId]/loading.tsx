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

export default function ProjectRequestDetailsLoading() {
  return (
    <div className="relative space-y-6">
      {/*===== BACK NAVIGATION SKELETON =====*/}

      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-3 w-36" />
      </div>

      {/*===== REQUEST HERO SKELETON =====*/}

      <section
        className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
      >
        {/* ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 -top-32 h-72 w-72 rounded-full bg-secondary/[0.08] blur-[100px]"
        />

        {/* soft glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-36 left-[20%] h-64 w-64 rounded-full bg-primary/[0.04] blur-[100px]"
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
          className="relative z-10 grid gap-8 px-5 py-7 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end lg:px-8 lg:py-8"
        >
          {/* left */}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3.5 w-3.5 rounded-full" />
                <Skeleton className="h-2.5 w-24" />
              </div>

              <span className="h-px w-8 bg-border" />

              <Skeleton className="h-2.5 w-28" />
            </div>

            <div
              className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Skeleton
                className="h-9 w-[75%] max-w-lg sm:h-10"
              />

              <Skeleton className="h-6 w-20" />
            </div>

            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-full max-w-2xl" />
              <Skeleton className="h-4 w-[82%] max-w-xl" />
            </div>

            {/* meta */}
            <div
              className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
            >
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="border-t border-border pt-3"
                >
                  <Skeleton className="h-2 w-14" />
                  <Skeleton className="mt-2 h-3 w-24" />
                </div>
              ))}
            </div>
          </div>

          {/* right status */}
          <div
            className="border-t border-border pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0"
          >
            <div className="flex items-center gap-2">
              <Skeleton className="h-3.5 w-3.5" />
              <Skeleton className="h-2.5 w-24" />
            </div>

            <Skeleton className="mt-4 h-6 w-20" />

            <div className="mt-4 space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-[85%]" />
            </div>

            <div
              className="mt-4 flex items-center gap-2 border-t border-border pt-4"
            >
              <Skeleton className="h-1.5 w-1.5 rounded-full" />
              <Skeleton className="h-2 w-28" />
            </div>
          </div>
        </div>
      </section>

      {/*===== PROPOSAL SKELETON =====*/}

      <section
        className="relative overflow-hidden border border-secondary/20 bg-card shadow-[var(--shadow-card)]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-28 h-60 w-60 rounded-full bg-secondary/[0.08] blur-[100px]"
        />

        <div
          className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/20 to-transparent"
        />

        {/* header */}
        <div
          className="relative z-10 flex flex-col gap-4 border-b border-border px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
        >
          <div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-3.5 w-3.5" />
              <Skeleton className="h-2.5 w-28" />
            </div>

            <Skeleton className="mt-3 h-6 w-24" />

            <Skeleton className="mt-2 h-3 w-72 max-w-full" />
          </div>

          <Skeleton className="h-6 w-20" />
        </div>

        {/* summary */}
        <div
          className="grid grid-cols-1 border-b border-border bg-muted/10 sm:grid-cols-2 lg:grid-cols-3"
        >
          <div className="px-5 py-4 sm:px-6">
            <Skeleton className="h-2 w-14" />
            <Skeleton className="mt-2 h-4 w-28" />
          </div>

          <div
            className="border-t border-border px-5 py-4 sm:border-l sm:border-t-0 sm:px-6"
          >
            <Skeleton className="h-2 w-14" />
            <Skeleton className="mt-2 h-4 w-20" />
          </div>

          <div
            className="border-t border-border px-5 py-4 sm:col-span-2 lg:col-span-1 lg:border-l lg:border-t-0 lg:px-6"
          >
            <Skeleton className="h-2 w-20" />
            <Skeleton className="mt-2 h-6 w-20" />
          </div>
        </div>

        {/* scope + deliverables */}
        <div
          className="relative z-10 grid lg:grid-cols-2"
        >
          <div
            className="border-b border-border px-5 py-6 sm:px-6 lg:border-b-0 lg:border-r"
          >
            <Skeleton className="h-2.5 w-12" />

            <div className="mt-4 space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[92%]" />
              <Skeleton className="h-4 w-[82%]" />
              <Skeleton className="h-4 w-[70%]" />
            </div>
          </div>

          <div className="px-5 py-6 sm:px-6">
            <Skeleton className="h-2.5 w-20" />

            <div className="mt-4 space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[78%]" />
              <Skeleton className="h-4 w-[68%]" />
            </div>
          </div>
        </div>

        {/* terms */}
        <div
          className="border-t border-border px-5 py-6 sm:px-6"
        >
          <Skeleton className="h-2.5 w-12" />

          <div className="mt-4 space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[88%]" />
            <Skeleton className="h-4 w-[65%]" />
          </div>
        </div>

        {/* actions */}
        <div
          className="border-t border-border bg-muted/15 px-5 py-5 sm:px-6"
        >
          <div
            className="flex flex-col gap-3 sm:flex-row sm:justify-end"
          >
            <Skeleton className="h-10 w-full sm:w-28" />
            <Skeleton className="h-10 w-full sm:w-28" />
          </div>
        </div>
      </section>

      {/*===== CONTENT GRID =====*/}

      <div
        className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.45fr)]"
      >
        {/*===== LEFT COLUMN =====*/}

        <div className="space-y-6">
          {/* Project Description */}
          <ContentSkeleton eyebrowWidth="w-24" titleWidth="w-40" lines={4} />

          {/* Project Goals */}
          <ContentSkeleton eyebrowWidth="w-24" titleWidth="w-32" lines={3} />

          {/* Target Audience */}
          <ContentSkeleton eyebrowWidth="w-24" titleWidth="w-36" lines={3} />

          {/* Reference Links */}
          <ContentSkeleton eyebrowWidth="w-28" titleWidth="w-36" lines={2} />

          {/* Attachments */}
          <section
            className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
          >
            <div
              className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/20 to-transparent"
            />

            <div
              className="flex items-center justify-between gap-4 border-b border-border px-5 py-5 sm:px-6"
            >
              <div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3.5 w-3.5" />
                  <Skeleton className="h-2.5 w-24" />
                </div>

                <Skeleton className="mt-3 h-5 w-28" />
              </div>

              <Skeleton className="h-8 w-10" />
            </div>

            <div className="divide-y divide-border">
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-5 py-4 sm:px-6"
                >
                  <Skeleton className="h-9 w-9 shrink-0" />

                  <div className="min-w-0 flex-1">
                    <Skeleton className="h-2 w-20" />
                    <Skeleton className="mt-2 h-4 w-44 max-w-full" />
                  </div>

                  <Skeleton className="h-4 w-4 shrink-0" />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/*===== SIDEBAR =====*/}

        <aside className="space-y-6">
          {/* Request Information */}
          <section
            className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
          >
            <div
              className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/20 to-transparent"
            />

            <div
              className="border-b border-border px-5 py-5 sm:px-6"
            >
              <Skeleton className="h-2.5 w-24" />
              <Skeleton className="mt-3 h-5 w-40" />
            </div>

            <div className="divide-y divide-border">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 px-5 py-4 sm:px-6"
                >
                  <Skeleton className="h-4 w-4 shrink-0" />

                  <div className="flex-1">
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="mt-2 h-4 w-28" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Current Status */}
          <section
            className="relative overflow-hidden border border-secondary/20 bg-secondary/[0.025] shadow-[var(--shadow-card)]"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-20 h-40 w-40 rounded-full bg-secondary/[0.07] blur-3xl"
            />

            <div
              className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/20 to-transparent"
            />

            <div className="relative z-10 px-5 py-5 sm:px-6">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3.5 w-3.5" />
                <Skeleton className="h-2.5 w-24" />
              </div>

              <Skeleton className="mt-4 h-5 w-28" />

              <Skeleton className="mt-4 h-6 w-20" />

              <div className="mt-4 space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-[90%]" />
                <Skeleton className="h-3 w-[70%]" />
              </div>

              <div
                className="mt-5 flex items-center gap-2 border-t border-border pt-4"
              >
                <Skeleton className="h-1.5 w-1.5 rounded-full" />
                <Skeleton className="h-2 w-24" />
              </div>
            </div>
          </section>

          {/* Back button */}
          <Skeleton className="h-10 w-full" />
        </aside>
      </div>
    </div>
  );
}

//===== reusable content panel skeleton =====//
function ContentSkeleton({
  eyebrowWidth,
  titleWidth,
  lines,
}: {
  eyebrowWidth: string;
  titleWidth: string;
  lines: number;
}) {
  return (
    <section
      className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
    >
      <div
        className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/20 to-transparent"
      />

      <div
        className="border-b border-border px-5 py-5 sm:px-6"
      >
        <div className="flex items-center gap-2">
          <Skeleton className="h-3.5 w-3.5" />
          <Skeleton className={`h-2.5 ${eyebrowWidth}`} />
        </div>

        <Skeleton className={`mt-3 h-5 ${titleWidth}`} />
      </div>

      <div className="px-5 py-6 sm:px-6">
        <div className="space-y-3">
          {Array.from({ length: lines }).map((_, index) => (
            <Skeleton
              key={index}
              className={`
                h-4
                ${
                  index === lines - 1
                    ? "w-[72%]"
                    : index === lines - 2
                      ? "w-[88%]"
                      : "w-full"
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
