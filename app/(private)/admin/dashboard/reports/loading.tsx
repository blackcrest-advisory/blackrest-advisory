//===== imports =====//
import {
  BriefcaseBusiness,
  FileBarChart,
  Gauge,
  Target,
  TrendingUp,
} from "lucide-react";

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
// REPORTS LOADING
//==============================================================//

export default function ReportsLoading() {
  return (
    <div
      className="relative min-w-0 max-w-full space-y-6"
      aria-label="Loading reports"
    >
      {/*===== EXECUTIVE INTELLIGENCE HEADER =====*/}

      <header
        className="relative min-w-0 max-w-full border border-border bg-card shadow-[var(--shadow-card)]"
      >
        {/* architectural rail */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 top-0 w-[3px] bg-gradient-to-b from-secondary/40 via-secondary/20 to-transparent"
        />

        {/* ambient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-secondary/[0.04] blur-[100px]"
        />

        <div
          className="relative z-10 grid min-w-0 gap-7 px-6 py-7 sm:px-7 lg:px-9 lg:py-8 xl:grid-cols-[minmax(0,1fr)_330px]"
        >
          {/*===== TITLE =====*/}

          <div className="min-w-0">
            <div
              className="flex flex-wrap items-center gap-3"
            >
              <FileBarChart className="h-3.5 w-3.5 text-muted-foreground/20" />

              <Skeleton className="h-2.5 w-28" />

              <span className="h-px w-9 bg-border" />

              <Skeleton className="h-2.5 w-24" />
            </div>

            <Skeleton
              className="mt-6 h-10 w-40 sm:h-11"
            />

            <div className="mt-4 space-y-2.5">
              <Skeleton className="h-3.5 w-full max-w-2xl" />
              <Skeleton className="h-3.5 w-[72%] max-w-xl" />
            </div>

            <div
              className="mt-6 flex items-center gap-3"
            >
              <Skeleton className="h-px w-10" />
              <Skeleton className="h-2.5 w-40" />
            </div>
          </div>

          {/*===== REPORT CONTROL =====*/}

          <div
            className="min-w-0 border-t border-border pt-5 xl:border-l xl:border-t-0 xl:pl-7 xl:pt-0"
          >
            <Skeleton className="h-2.5 w-24" />

            <div className="mt-3 space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-[82%]" />
            </div>

            <Skeleton className="mt-5 h-10 w-full rounded-md" />
            <Skeleton className="mt-3 h-9 w-full rounded-md" />

            <div
              className="mt-5 flex items-center gap-2 border-t border-border pt-4"
            >
              <Skeleton className="h-1.5 w-1.5 rounded-full" />
              <Skeleton className="h-2.5 w-28" />
            </div>
          </div>
        </div>
      </header>

      {/*===== KPI STRIP =====*/}

      <section
        className="min-w-0 max-w-full overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
      >
        <div
          className="grid min-w-0 sm:grid-cols-2 xl:grid-cols-4"
        >
          {Array.from({
            length: 4,
          }).map((_, index) => (
            <MetricSkeleton key={index} />
          ))}
        </div>
      </section>

      {/*===== ANALYTICAL CANVAS =====*/}

      <section
        className="grid min-w-0 max-w-full gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.45fr)]"
      >
        {/*===== REVENUE TREND =====*/}

        <div
          className="relative min-w-0 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
        >
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 h-[2px] w-28 bg-secondary/25"
          />

          <PanelHeaderSkeleton icon={TrendingUp} />

          <div
            className="min-w-0 px-5 pb-5 pt-3 sm:px-6 sm:pb-6"
          >
            <div
              className="relative h-64 min-w-0 border-b border-l border-border px-3 pt-5 sm:h-72 sm:px-5"
            >
              {/* horizontal guides */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex flex-col justify-between py-5"
              >
                {Array.from({
                  length: 5,
                }).map((_, index) => (
                  <span
                    key={index}
                    className="block h-px w-full bg-border/55"
                  />
                ))}
              </div>

              {/* bars */}
              <div
                className="relative z-10 flex h-full min-w-0 items-end gap-2 sm:gap-3"
              >
                {[
                  "h-[34%]",
                  "h-[53%]",
                  "h-[44%]",
                  "h-[72%]",
                  "h-[58%]",
                  "h-[84%]",
                  "h-[67%]",
                ].map((height, index) => (
                  <div
                    key={index}
                    className="flex h-full min-w-0 flex-1 flex-col justify-end"
                  >
                    <Skeleton
                      className={`
                          w-full
                          min-w-0
                          ${height}
                        `}
                    />

                    <Skeleton
                      className="mx-auto mt-2 h-2 w-[70%] max-w-10"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div
              className="mt-4 flex items-center gap-2"
            >
              <Skeleton className="h-1.5 w-1.5 rounded-full" />
              <Skeleton className="h-2.5 w-28" />
            </div>
          </div>
        </div>

        {/*===== SALES PIPELINE =====*/}

        <div
          className="min-w-0 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
        >
          <PanelHeaderSkeleton icon={Target} />

          <div
            className="space-y-5 px-5 py-5 sm:px-6"
          >
            {["w-[72%]", "w-[56%]", "w-[39%]", "w-[65%]"].map(
              (width, index) => (
                <div
                  key={index}
                  className="border-b border-border pb-4 last:border-b-0 last:pb-0"
                >
                  <div
                    className="flex items-start gap-3"
                  >
                    <Skeleton className="mt-0.5 h-3 w-5 shrink-0" />

                    <div className="min-w-0 flex-1">
                      <div
                        className="flex items-center justify-between gap-3"
                      >
                        <Skeleton className="h-3.5 w-24" />
                        <Skeleton className="h-3 w-14" />
                      </div>

                      <div
                        className="mt-3 h-1.5 overflow-hidden bg-muted"
                      >
                        <Skeleton
                          className={`
                            h-full
                            ${width}
                          `}
                        />
                      </div>

                      <Skeleton className="ml-auto mt-2 h-2 w-7" />
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/*===== BUSINESS INTELLIGENCE =====*/}

      <section
        className="grid min-w-0 max-w-full gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.45fr)]"
      >
        {/*===== SERVICE PERFORMANCE =====*/}

        <div
          className="relative min-w-0 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
        >
          <PanelHeaderSkeleton icon={BriefcaseBusiness} />

          {/*===== DESKTOP TABLE =====*/}

          <div
            className="hidden min-w-0 max-w-full overflow-x-auto lg:block"
          >
            <table
              className="w-full min-w-[620px] border-collapse"
            >
              <thead
                className="border-y border-border bg-muted/15"
              >
                <tr>
                  <th className="px-6 py-3">
                    <Skeleton className="h-2.5 w-16" />
                  </th>

                  <th className="px-4 py-3">
                    <Skeleton className="h-2.5 w-10" />
                  </th>

                  <th className="px-4 py-3">
                    <Skeleton className="h-2.5 w-8" />
                  </th>

                  <th className="px-4 py-3">
                    <Skeleton className="h-2.5 w-16" />
                  </th>

                  <th className="px-6 py-3">
                    <Skeleton className="ml-auto h-2.5 w-20" />
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {Array.from({
                  length: 4,
                }).map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4">
                      <Skeleton className="h-4 w-36" />
                    </td>

                    <td className="px-4 py-4">
                      <Skeleton className="h-3 w-7" />
                    </td>

                    <td className="px-4 py-4">
                      <Skeleton className="h-3 w-7" />
                    </td>

                    <td className="px-4 py-4">
                      <Skeleton className="h-6 w-16" />
                    </td>

                    <td className="px-6 py-4">
                      <Skeleton className="ml-auto h-4 w-20" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/*===== MOBILE / TABLET =====*/}

          <div
            className="divide-y divide-border lg:hidden"
          >
            {Array.from({
              length: 3,
            }).map((_, index) => (
              <article
                key={index}
                className="px-5 py-5 sm:px-6"
              >
                <div className="flex items-start gap-3">
                  <Skeleton className="h-3 w-5 shrink-0" />

                  <div className="min-w-0 flex-1">
                    <Skeleton className="h-4 w-36" />

                    <div
                      className="mt-4 grid grid-cols-2 gap-3"
                    >
                      <RecordSkeleton />
                      <RecordSkeleton />
                      <RecordSkeleton />
                      <RecordSkeleton />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* footer */}
          <div
            className="flex items-center justify-between gap-4 border-t border-border bg-muted/10 px-5 py-3 sm:px-6"
          >
            <Skeleton className="h-2.5 w-32" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>

        {/*===== EXECUTIVE INSIGHTS =====*/}

        <div
          className="min-w-0 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
        >
          <PanelHeaderSkeleton icon={Gauge} />

          <div className="divide-y divide-border">
            {Array.from({
              length: 4,
            }).map((_, index) => (
              <div
                key={index}
                className="px-5 py-5 sm:px-6"
              >
                <div
                  className="border-l-2 border-border pl-4"
                >
                  <div
                    className="flex items-start justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <Skeleton className="h-2.5 w-16" />

                      <Skeleton
                        className={`
                          mt-2
                          h-4
                          ${index % 2 === 0 ? "w-40" : "w-32"}
                        `}
                      />
                    </div>

                    <Skeleton className="mt-1 h-1.5 w-1.5 rounded-full" />
                  </div>

                  <div className="mt-3 space-y-2">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-[78%]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="flex items-center gap-2 border-t border-border bg-muted/10 px-5 py-3 sm:px-6"
          >
            <Skeleton className="h-1.5 w-1.5 rounded-full" />
            <Skeleton className="h-2.5 w-36" />
          </div>
        </div>
      </section>
    </div>
  );
}

//==============================================================//
// KPI METRIC SKELETON
//==============================================================//

function MetricSkeleton() {
  return (
    <div
      className="border-b border-border px-5 py-5 sm:border-r xl:border-b-0 xl:last:border-r-0"
    >
      <div
        className="flex items-start justify-between gap-4"
      >
        <div className="min-w-0">
          <Skeleton className="h-2.5 w-20" />
          <Skeleton className="mt-3 h-7 w-20" />
          <Skeleton className="mt-2 h-2.5 w-28" />
        </div>

        <Skeleton className="h-9 w-9 shrink-0 rounded-md" />
      </div>
    </div>
  );
}

//==============================================================//
// PANEL HEADER SKELETON
//==============================================================//

function PanelHeaderSkeleton({ icon: Icon }: { icon: typeof TrendingUp }) {
  return (
    <div
      className="flex min-w-0 items-start gap-3 border-b border-border px-5 py-4 sm:px-6"
    >
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background"
      >
        <Icon className="h-4 w-4 text-muted-foreground/15" />
      </div>

      <div className="min-w-0 flex-1">
        <Skeleton className="h-2.5 w-24" />
        <Skeleton className="mt-2 h-4 w-32" />
        <Skeleton className="mt-2 h-3 w-[70%]" />
      </div>
    </div>
  );
}

//==============================================================//
// MOBILE SERVICE RECORD
//==============================================================//

function RecordSkeleton() {
  return (
    <div
      className="min-w-0 border border-border bg-background/30 p-3"
    >
      <Skeleton className="h-2.5 w-16" />
      <Skeleton className="mt-2 h-3.5 w-[72%]" />
    </div>
  );
}
