//===== imports =====//
import { BriefcaseBusiness, Layers3, ShieldCheck } from "lucide-react";

//==============================================================//
// SKELETON
//==============================================================//

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

//==============================================================//
// ADMIN SERVICES LOADING
//==============================================================//

export default function AdminServicesLoading() {
  return (
    <div className="relative space-y-6" aria-label="Loading services">
      {/*===== CAPABILITY HEADER =====*/}

      <header className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
        {/* architectural rail */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 top-0 w-[3px] bg-gradient-to-b from-secondary/40 via-secondary/20 to-transparent"
        />

        {/* ambient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-secondary/[0.04] blur-[110px]"
        />

        <div className="relative grid gap-7 px-6 py-7 sm:px-7 lg:px-9 lg:py-8 xl:grid-cols-[minmax(0,1fr)_310px]">
          {/*===== TITLE AREA =====*/}

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <BriefcaseBusiness className="h-3.5 w-3.5 text-muted-foreground/20" />

              <Skeleton className="h-2.5 w-24" />

              <span className="h-px w-9 bg-border" />

              <Skeleton className="h-2.5 w-24" />
            </div>

            {/* ServicesHeader skeleton */}
            <div className="mt-6">
              <Skeleton className="h-10 w-44 sm:h-11"/>

              <div className="mt-4 space-y-2.5">
                <Skeleton className="h-3.5 w-full max-w-2xl" />

                <Skeleton className="h-3.5 w-[72%] max-w-xl" />
              </div>

              <div className="mt-5 flex items-center gap-3">
                <Skeleton className="h-px w-10" />

                <Skeleton className="h-2.5 w-40" />
              </div>
            </div>
          </div>

          {/*===== PORTFOLIO INDEX =====*/}

          <div className="border-t border-border pt-5 xl:border-l xl:border-t-0 xl:pl-7 xl:pt-0">
            <Skeleton className="h-2.5 w-24" />

            <div className="mt-5 flex items-end gap-3">
              <Layers3 className="mb-1 h-5 w-5 text-muted-foreground/20" />

              <Skeleton className="h-10 w-12" />

              <Skeleton className="mb-1 h-3 w-20" />
            </div>

            {/* state distribution */}
            <div className="mt-6 grid grid-cols-2 divide-x divide-border border-y border-border">
              <div className="py-3 pr-4">
                <Skeleton className="h-2.5 w-12" />

                <Skeleton className="mt-2 h-5 w-7" />
              </div>

              <div className="py-3 pl-4">
                <Skeleton className="h-2.5 w-12" />

                <Skeleton className="mt-2 h-5 w-7" />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground/20" />

              <Skeleton className="h-2.5 w-32" />
            </div>
          </div>
        </div>
      </header>

      {/*===== WORKSPACE =====*/}

      <div className="grid gap-5 xl:grid-cols-[290px_minmax(0,1fr)] xl:items-start">
        {/*===== LEFT CONTROL RAIL =====*/}

        <aside className="space-y-4">
          {/*===== SERVICES STATS =====*/}

          <div className="overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
            {/* header */}
            <div className="border-b border-border px-4 py-4">
              <Skeleton className="h-2.5 w-24" />

              <Skeleton className="mt-2 h-3 w-36" />
            </div>

            {/* metrics */}
            <div className="divide-y divide-border">
              {Array.from({
                length: 3,
              }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between gap-4 px-4 py-4"
                >
                  <div className="min-w-0">
                    <Skeleton className="h-2.5 w-24" />

                    <Skeleton className="mt-2 h-7 w-9" />

                    <Skeleton className="mt-2 h-2.5 w-32" />
                  </div>

                  <Skeleton className="h-9 w-9 shrink-0 rounded-md" />
                </div>
              ))}
            </div>

            {/* footer */}
            <div className="flex items-center justify-between gap-3 border-t border-border bg-muted/10 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <Skeleton className="h-1.5 w-1.5 rounded-full" />

                <Skeleton className="h-2.5 w-24" />
              </div>

              <Skeleton className="h-3 w-12" />
            </div>
          </div>

          {/*===== FILTERS =====*/}

          <div className="relative border border-border bg-card shadow-[var(--shadow-card)]">
            {/* top signal */}
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 h-[2px] w-14 bg-secondary/30"
            />

            {/* header */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-4">
              <Skeleton className="h-8 w-8 shrink-0 rounded-md" />

              <div className="min-w-0">
                <Skeleton className="h-2.5 w-24" />

                <Skeleton className="mt-2 h-3 w-36" />
              </div>
            </div>

            {/* controls */}
            <div className="space-y-4 px-4 py-4">
              <div>
                <Skeleton className="h-2.5 w-24" />

                <Skeleton className="mt-2 h-10 w-full rounded-md" />
              </div>

              <div>
                <Skeleton className="h-2.5 w-20" />

                <Skeleton className="mt-2 h-10 w-full rounded-md" />
              </div>
            </div>

            {/* footer */}
            <div className="flex items-center gap-2 border-t border-border bg-muted/10 px-4 py-2.5">
              <Skeleton className="h-1.5 w-1.5 rounded-full" />

              <Skeleton className="h-2.5 w-24" />
            </div>
          </div>

          {/*===== REGISTRY STATE =====*/}

          <div className="border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="px-4 py-4">
              <Skeleton className="h-2.5 w-20" />

              <div className="mt-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-1.5 w-1.5 rounded-full" />

                  <Skeleton className="h-3 w-28" />
                </div>

                <Skeleton className="h-4 w-6" />
              </div>
            </div>
          </div>
        </aside>

        {/*===== CAPABILITY REGISTER =====*/}

        <main className="min-w-0 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
          {/*===== REGISTER HEADER =====*/}

          <div className="flex flex-col gap-4 border-b border-border px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6">
            <div>
              <Skeleton className="h-2.5 w-28" />

              <Skeleton className="mt-2 h-5 w-40" />

              <Skeleton className="mt-2 h-3 w-72 max-w-full" />
            </div>

            <div className="sm:text-right">
              <Skeleton className="h-2.5 w-20 sm:ml-auto" />

              <Skeleton className="mt-2 h-6 w-8 sm:ml-auto" />
            </div>
          </div>

          {/*===== SERVICE RECORDS =====*/}

          <div className="divide-y divide-border">
            {Array.from({
              length: 4,
            }).map((_, index) => (
              <ServiceRecordSkeleton key={index} index={index} />
            ))}
          </div>

          {/*===== REGISTER FOOTER =====*/}

          <div className="flex items-center justify-between gap-4 bg-muted/10 px-5 py-3 sm:px-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-1.5 w-1.5 rounded-full" />

              <Skeleton className="h-2.5 w-32" />
            </div>

            <Skeleton className="h-3 w-16" />
          </div>
        </main>
      </div>
    </div>
  );
}

//==============================================================//
// SERVICE RECORD SKELETON
//==============================================================//

function ServiceRecordSkeleton({ index }: { index: number }) {
  return (
    <article>
      <div className="grid gap-5 px-5 py-6 sm:px-6 lg:grid-cols-[64px_minmax(0,1fr)_220px] lg:gap-6 lg:py-7">
        {/*===== INDEX =====*/}

        <div className="hidden lg:block">
          <Skeleton className="h-3 w-5" />

          <Skeleton className="mt-3 h-px w-8" />
        </div>

        {/*===== CONTENT =====*/}

        <div className="min-w-0">
          {/* labels */}
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-24" />

            <Skeleton className="h-6 w-16 rounded-md" />
          </div>

          {/* title */}
          <Skeleton
            className={`
              mt-4
              h-5

              ${index % 2 === 0 ? "w-52" : "w-40"}
            `}
          />

          {/* description */}
          <div className="mt-4 space-y-2">
            <Skeleton className="h-3 w-full" />

            <Skeleton className="h-3 w-[92%]" />

            <Skeleton className="h-3 w-[62%]" />
          </div>

          {/* metrics */}
          <div className="mt-5 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
            <ServiceMetricSkeleton />

            <ServiceMetricSkeleton />
          </div>
        </div>

        {/*===== COMMAND =====*/}

        <div className="border-t border-border pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <Skeleton className="h-2.5 w-24" />

          <Skeleton className="mt-3 h-9 w-full rounded-md" />

          <div className="mt-4 border-t border-border pt-4">
            <Skeleton className="h-9 w-full rounded-md" />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Skeleton className="h-1.5 w-1.5 rounded-full" />

            <Skeleton className="h-2.5 w-24" />
          </div>
        </div>
      </div>
    </article>
  );
}

//==============================================================//
// SERVICE METRIC SKELETON
//==============================================================//

function ServiceMetricSkeleton() {
  return (
    <div className="bg-background/45 px-3 py-3">
      <div className="flex items-center gap-2">
        <Skeleton className="h-3.5 w-3.5" />

        <Skeleton className="h-2.5 w-20" />
      </div>

      <Skeleton className="mt-2 h-3.5 w-24" />
    </div>
  );
}
