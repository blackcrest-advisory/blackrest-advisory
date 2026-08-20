import { ChevronLeft } from "lucide-react";

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

export default function AdminProjectRequestDetailLoading() {
  return (
    <div
      className="relative space-y-6"
      aria-label="Loading project request details"
    >
      {/* ====================================================== */}
      {/* BACK NAVIGATION                                       */}
      {/* ====================================================== */}

      <div>
        <div
          className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground"
        >
          <span
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </span>
          Project requests
        </div>
      </div>

      {/* ====================================================== */}
      {/* REQUEST COMMAND HEADER                                */}
      {/* ====================================================== */}

      <section
        className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
      >
        {/* ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-36 h-80 w-80 rounded-full bg-secondary/[0.07] blur-[110px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 bottom-0 h-52 w-52 rounded-full bg-primary/[0.04] blur-[90px] dark:bg-secondary/[0.025]"
        />

        {/* grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden opacity-[0.035] lg:block"
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
            backgroundSize: "88px 88px",
            maskImage:
              "linear-gradient(to right, transparent 8%, black 56%, black)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 8%, black 56%, black)",
          }}
        />

        {/* top signal */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/20 to-transparent"
        />

        <div
          className="relative z-10 grid gap-7 px-5 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:px-8 lg:py-7"
        >
          {/* ================================================== */}
          {/* IDENTITY                                           */}
          {/* ================================================== */}

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <Skeleton className="h-3.5 w-3.5 rounded-full" />
              <Skeleton className="h-2.5 w-24" />

              <span className="h-px w-7 bg-border" />

              <Skeleton className="h-2.5 w-20" />
            </div>

            <div
              className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Skeleton className="h-9 w-[68%] max-w-md" />

              <Skeleton className="h-6 w-24 rounded-md" />
            </div>

            {/* client info */}
            <div
              className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="h-3.5 w-32" />
              <Skeleton className="h-3.5 w-40" />
            </div>

            {/* metadata */}
            <div
              className="mt-7 grid gap-3 border-t border-border pt-4 sm:grid-cols-3"
            >
              <HeaderMetaSkeleton />
              <HeaderMetaSkeleton />
              <HeaderMetaSkeleton />
            </div>
          </div>

          {/* ================================================== */}
          {/* ACTION AREA                                        */}
          {/* ================================================== */}

          <div
            className="flex shrink-0 flex-col gap-3 border-t border-border pt-5 lg:min-w-[220px] lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0"
          >
            <div>
              <Skeleton className="h-2.5 w-24" />
              <Skeleton className="mt-2 h-3 w-40" />
              <Skeleton className="mt-2 h-3 w-32" />
            </div>

            {/* status control */}
            <div
              className="border border-border bg-background/35 p-3"
            >
              <div className="mb-2.5 flex items-center justify-between">
                <div>
                  <Skeleton className="h-2 w-20" />
                  <Skeleton className="mt-2 h-3 w-10" />
                </div>

                <Skeleton className="h-1.5 w-1.5 rounded-full" />
              </div>

              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="mt-2 h-2.5 w-[85%]" />
            </div>

            {/* assignment */}
            <div
              className="flex items-center gap-3 border border-border bg-background/35 px-3 py-3"
            >
              <Skeleton className="h-8 w-8 shrink-0 rounded-md" />

              <div className="min-w-0 flex-1">
                <Skeleton className="h-2 w-16" />
                <Skeleton className="mt-2 h-3 w-24" />
              </div>
            </div>

            {/* delete */}
            <div className="border-t border-border pt-3">
              <Skeleton className="h-9 w-full rounded-md" />
            </div>

            <div
              className="mt-1 flex items-center gap-2 border-t border-border pt-3"
            >
              <Skeleton className="h-1.5 w-1.5 rounded-full" />
              <Skeleton className="h-2.5 w-28" />
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* PROPOSAL WORKSPACE                                    */}
      {/* ====================================================== */}

      <section
        className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
      >
        {/* top signal */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/20 to-transparent"
        />

        {/* header */}
        <div
          className="flex flex-col gap-4 border-b border-border px-5 py-5 sm:flex-row sm:items-start sm:justify-between sm:px-6"
        >
          <div className="flex items-start gap-3">
            <Skeleton className="h-10 w-10 shrink-0 rounded-md" />

            <div>
              <Skeleton className="h-2.5 w-24" />
              <Skeleton className="mt-2 h-5 w-32" />
              <Skeleton className="mt-2 h-3 w-64 max-w-full" />
            </div>
          </div>

          <Skeleton className="h-6 w-24 rounded-md" />
        </div>

        {/* summary strip */}
        <div
          className="grid border-b border-border bg-muted/10 sm:grid-cols-3"
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="border-b border-border px-5 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
            >
              <div className="flex items-center gap-2">
                <Skeleton className="h-3.5 w-3.5" />
                <Skeleton className="h-2.5 w-20" />
              </div>

              <Skeleton className="mt-2 h-3.5 w-28" />
            </div>
          ))}
        </div>

        {/* proposal body */}
        <div
          className="grid gap-6 px-5 py-6 sm:px-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.5fr)]"
        >
          {/* main */}
          <div className="space-y-5">
            <ProposalBlockSkeleton lines={4} />
            <ProposalBlockSkeleton lines={4} />
            <ProposalBlockSkeleton lines={3} />
          </div>

          {/* sidebar */}
          <div className="space-y-5">
            <section
              className="border border-border bg-background/30"
            >
              <div
                className="border-b border-border px-4 py-3.5"
              >
                <Skeleton className="h-2.5 w-20" />
                <Skeleton className="mt-2 h-4 w-28" />
              </div>

              <div className="divide-y divide-border">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-4 px-4 py-3.5"
                  >
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                ))}
              </div>
            </section>

            <div
              className="border border-border bg-secondary/[0.025] p-4"
            >
              <div className="flex items-start gap-3">
                <Skeleton className="mt-0.5 h-4 w-4 shrink-0" />

                <div className="min-w-0 flex-1">
                  <Skeleton className="h-3.5 w-36" />

                  <Skeleton className="mt-2 h-3 w-full" />
                  <Skeleton className="mt-2 h-3 w-[75%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* action footer */}
        <div
          className="flex flex-col gap-3 border-t border-border bg-muted/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
        >
          <div className="flex items-center gap-2">
            <Skeleton className="h-1.5 w-1.5 rounded-full" />
            <Skeleton className="h-2.5 w-32" />
          </div>

          <Skeleton className="h-10 w-full rounded-md sm:w-36" />
        </div>
      </section>

      {/* ====================================================== */}
      {/* REQUEST CONTENT GRID                                  */}
      {/* ====================================================== */}

      <div
        className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.45fr)]"
      >
        {/* ==================================================== */}
        {/* MAIN COLUMN                                         */}
        {/* ==================================================== */}

        <div className="space-y-6">
          {/* project summary */}
          <section
            className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
          >
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 h-[2px] w-24 bg-secondary/40"
            />

            <div
              className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-6"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-md" />

                <div>
                  <Skeleton className="h-2.5 w-20" />
                  <Skeleton className="mt-2 h-4 w-32" />
                </div>
              </div>

              <Skeleton className="hidden h-2.5 w-20 sm:block" />
            </div>

            <div
              className="px-5 py-5 sm:px-6 sm:py-6"
            >
              <div className="space-y-3">
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-[92%]" />
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-[74%]" />
              </div>
            </div>

            <div
              className="border-t border-border bg-muted/10 px-5 py-3 sm:px-6"
            >
              <div className="flex items-center gap-2">
                <Skeleton className="h-1.5 w-1.5 rounded-full" />
                <Skeleton className="h-2.5 w-36" />
              </div>
            </div>
          </section>

          {/* attachments */}
          <section
            className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
          >
            <div
              className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-6"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-md" />

                <div>
                  <Skeleton className="h-2.5 w-24" />
                  <Skeleton className="mt-2 h-4 w-24" />
                </div>
              </div>

              <Skeleton className="h-3 w-6" />
            </div>

            <div className="divide-y divide-border">
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 px-5 py-4 sm:px-6"
                >
                  <Skeleton className="h-9 w-9 shrink-0 rounded-md" />

                  <div className="min-w-0 flex-1">
                    <Skeleton className="h-3.5 w-[60%]" />
                    <Skeleton className="mt-2 h-2.5 w-20" />
                  </div>

                  <Skeleton className="h-2.5 w-8" />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ==================================================== */}
        {/* SIDEBAR                                             */}
        {/* ==================================================== */}

        <aside className="space-y-6">
          {/* request details */}
          <section
            className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
          >
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/20 to-transparent"
            />

            <div
              className="border-b border-border px-5 py-4"
            >
              <Skeleton className="h-2.5 w-24" />
              <Skeleton className="mt-2 h-4 w-16" />
            </div>

            <div className="divide-y divide-border">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-5 px-5 py-4"
                >
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-24" />
                </div>
              ))}
            </div>
          </section>

          {/* client */}
          <section
            className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
          >
            <div
              className="border-b border-border px-5 py-4"
            >
              <Skeleton className="h-2.5 w-20" />
              <Skeleton className="mt-2 h-4 w-16" />
            </div>

            <div className="px-5 py-5">
              <div className="flex items-start gap-3">
                <Skeleton className="h-10 w-10 shrink-0 rounded-md" />

                <div className="min-w-0 flex-1">
                  <Skeleton className="h-3.5 w-28" />
                  <Skeleton className="mt-2 h-3 w-24" />
                  <Skeleton className="mt-3 h-3 w-40 max-w-full" />
                </div>
              </div>

              <div
                className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4"
              >
                <Skeleton className="h-2.5 w-14" />
                <Skeleton className="h-2.5 w-28" />
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

//==============================================================//
// HEADER META SKELETON
//==============================================================//

function HeaderMetaSkeleton() {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-3.5 w-3.5" />
        <Skeleton className="h-2.5 w-16" />
      </div>

      <Skeleton className="mt-2 h-3 w-28" />
    </div>
  );
}

//==============================================================//
// PROPOSAL BLOCK SKELETON
//==============================================================//

function ProposalBlockSkeleton({ lines }: { lines: number }) {
  return (
    <section
      className="border border-border bg-background/20"
    >
      <div
        className="flex items-center gap-3 border-b border-border bg-muted/10 px-4 py-3.5 sm:px-5"
      >
        <Skeleton className="h-8 w-8 rounded-md" />

        <div>
          <Skeleton className="h-2.5 w-20" />
          <Skeleton className="mt-2 h-4 w-28" />
        </div>
      </div>

      <div
        className="space-y-3 px-4 py-4 sm:px-5"
      >
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton
            key={index}
            className={`
                h-3.5
                ${index === lines - 1 ? "w-[72%]" : "w-full"}
              `}
          />
        ))}
      </div>
    </section>
  );
}
