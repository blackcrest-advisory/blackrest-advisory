//===== imports =====//
import {
  BriefcaseBusiness,
  Calendar,
  ChevronLeft,
  CircleDollarSign,
  FileText,
  FolderKanban,
  Gauge,
  Layers3,
  Paperclip,
  Tag,
  UserRound,
} from "lucide-react";

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

export default function AdminProjectDetailLoading() {
  return (
    <div className="relative space-y-6" aria-label="Loading project details">
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

          <Skeleton className="h-3 w-20" />
        </div>
      </div>

      {/* ====================================================== */}
      {/* PROJECT DELIVERY HEADER                               */}
      {/* ====================================================== */}

      <header
        className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
      >
        {/* top signal */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/50 via-secondary/20 to-transparent"
        />

        {/* ambient field */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-secondary/[0.05] blur-[110px]"
        />

        <div
          className="relative z-10 grid gap-7 px-5 py-6 sm:px-6 lg:px-8 lg:py-7 xl:grid-cols-[minmax(0,1fr)_300px]"
        >
          {/* ================================================== */}
          {/* PROJECT IDENTITY                                   */}
          {/* ================================================== */}

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <FolderKanban className="h-3.5 w-3.5 text-secondary/30" />

              <Skeleton className="h-2.5 w-24" />

              <span className="h-px w-8 bg-border" />

              <Skeleton className="h-2.5 w-16" />
            </div>

            <div
              className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Skeleton className="h-8 w-[65%] max-w-md" />

              <Skeleton className="h-6 w-20 rounded-md" />
            </div>

            {/* client */}
            <div
              className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              <div className="flex items-center gap-2">
                <UserRound className="h-3.5 w-3.5 text-muted-foreground/20" />
                <Skeleton className="h-3 w-28" />
              </div>

              <Skeleton className="h-3 w-24" />

              <Skeleton className="h-3 w-40" />
            </div>

            {/* metadata */}
            <div
              className="mt-7 grid gap-4 border-t border-border pt-4 sm:grid-cols-3"
            >
              <HeaderMetaSkeleton icon={Calendar} />
              <HeaderMetaSkeleton icon={BriefcaseBusiness} />
              <HeaderMetaSkeleton icon={UserRound} />
            </div>
          </div>

          {/* ================================================== */}
          {/* PROGRESS COMMAND                                   */}
          {/* ================================================== */}

          <div
            className="border-t border-border pt-5 xl:border-l xl:border-t-0 xl:pl-7 xl:pt-0"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <Skeleton className="h-2.5 w-24" />

                <div className="mt-2 flex items-end gap-2">
                  <Skeleton className="h-10 w-14" />
                  <Skeleton className="mb-1 h-3 w-3" />
                </div>
              </div>

              <div
                className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background"
              >
                <Gauge className="h-4 w-4 text-muted-foreground/20" />
              </div>
            </div>

            <Skeleton className="mt-5 h-1.5 w-full" />

            <div
              className="mt-3 flex items-center justify-between gap-3"
            >
              <Skeleton className="h-2.5 w-36" />
              <Skeleton className="h-1.5 w-1.5 rounded-full" />
            </div>

            <div
              className="mt-5 border-t border-border pt-4"
            >
              <Skeleton className="h-9 w-full rounded-md sm:w-36" />
            </div>
          </div>
        </div>
      </header>

      {/* ====================================================== */}
      {/* DELIVERY SNAPSHOT                                     */}
      {/* ====================================================== */}

      <section
        className="overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
      >
        <div
          className="grid sm:grid-cols-2 xl:grid-cols-4"
        >
          <SnapshotSkeleton icon={CircleDollarSign} />
          <SnapshotSkeleton icon={CircleDollarSign} />
          <SnapshotSkeleton icon={Calendar} />
          <SnapshotSkeleton icon={Tag} />
        </div>
      </section>

      {/* ====================================================== */}
      {/* CONTENT GRID                                          */}
      {/* ====================================================== */}

      <div
        className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.45fr)]"
      >
        {/* ==================================================== */}
        {/* MAIN COLUMN                                         */}
        {/* ==================================================== */}

        <div className="space-y-6">
          {/* ================================================== */}
          {/* PROJECT INFORMATION                                */}
          {/* ================================================== */}

          <section
            className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
          >
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 h-[2px] w-24 bg-secondary/30"
            />

            <PanelHeaderSkeleton icon={FileText} />

            <div
              className="grid sm:grid-cols-2"
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="border-b border-border px-5 py-4 sm:border-r sm:px-6"
                >
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3.5 w-3.5" />
                    <Skeleton className="h-2.5 w-16" />
                  </div>

                  <Skeleton className="mt-2 h-4 w-28" />
                </div>
              ))}
            </div>

            <div
              className="flex items-center gap-2 border-t border-border bg-muted/10 px-5 py-3 sm:px-6"
            >
              <Skeleton className="h-1.5 w-1.5 rounded-full" />
              <Skeleton className="h-2.5 w-36" />
            </div>
          </section>

          {/* ================================================== */}
          {/* MILESTONES                                         */}
          {/* ================================================== */}

          <section
            className="overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
          >
            <div
              className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-md" />

                <div>
                  <Skeleton className="h-2.5 w-24" />
                  <Skeleton className="mt-2 h-4 w-20" />
                </div>
              </div>

              <Skeleton className="h-3 w-28" />
            </div>

            <div className="px-5 py-5 sm:px-6">
              {/* milestone register */}
              <div className="divide-y divide-border border border-border">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 px-4 py-4 sm:px-5"
                  >
                    <Skeleton className="hidden h-3 w-5 sm:block" />

                    <Skeleton className="mt-0.5 h-5 w-5 rounded" />

                    <div className="min-w-0 flex-1">
                      <div
                        className="flex items-start justify-between gap-3"
                      >
                        <div className="min-w-0 flex-1">
                          <Skeleton className="h-4 w-36" />
                          <Skeleton className="mt-2 h-3 w-[70%]" />
                        </div>

                        <Skeleton className="h-8 w-8 rounded-md" />
                      </div>

                      <div
                        className="mt-3 flex items-center gap-2 border-t border-border pt-3"
                      >
                        <Skeleton className="h-3.5 w-3.5" />
                        <Skeleton className="h-2.5 w-12" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* add milestone footer */}
              <div
                className="mt-4 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <Skeleton className="h-2.5 w-20" />
                  <Skeleton className="mt-2 h-3 w-44" />
                </div>

                <Skeleton className="h-9 w-full rounded-md sm:w-32" />
              </div>
            </div>
          </section>

          {/* ================================================== */}
          {/* INVOICES                                           */}
          {/* ================================================== */}

          <section
            className="overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
          >
            <div
              className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-md" />

                <div>
                  <Skeleton className="h-2.5 w-28" />
                  <Skeleton className="mt-2 h-4 w-16" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Skeleton className="hidden h-3 w-16 sm:block" />
                <Skeleton className="h-9 w-32 rounded-md" />
              </div>
            </div>

            <div className="px-5 py-5 sm:px-6">
              {/* invoice ledger */}
              <div
                className="overflow-hidden border border-border bg-background/15"
              >
                {/* desktop header */}
                <div
                  className="hidden grid-cols-[minmax(170px,1.4fr)_minmax(120px,0.8fr)_130px_150px_auto] gap-4 border-b border-border bg-muted/10 px-4 py-3 lg:grid"
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className={`
                          h-2.5
                          ${index === 4 ? "ml-auto w-14" : "w-16"}
                        `}
                    />
                  ))}
                </div>

                <div className="divide-y divide-border">
                  {Array.from({ length: 2 }).map((_, index) => (
                    <div
                      key={index}
                      className="hidden min-h-[84px] grid-cols-[minmax(170px,1.4fr)_minmax(120px,0.8fr)_130px_150px_auto] items-center gap-4 px-4 py-4 lg:grid"
                    >
                      <div className="flex items-start gap-3">
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <div>
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="mt-2 h-2.5 w-28" />
                        </div>
                      </div>

                      <div>
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="mt-2 h-3 w-24" />
                      </div>

                      <Skeleton className="h-4 w-20" />

                      <Skeleton className="h-6 w-20 rounded-md" />

                      <div className="flex justify-end gap-1">
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                      </div>
                    </div>
                  ))}

                  {/* mobile invoice records */}
                  {Array.from({ length: 2 }).map((_, index) => (
                    <div
                      key={`mobile-${index}`}
                      className="px-4 py-4 lg:hidden"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <Skeleton className="h-9 w-9 rounded-md" />

                          <div>
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="mt-2 h-2.5 w-28" />
                          </div>
                        </div>

                        <Skeleton className="h-6 w-20 rounded-md" />
                      </div>

                      <div
                        className="mt-4 grid gap-3 sm:grid-cols-2"
                      >
                        <InvoiceRecordSkeleton />
                        <InvoiceRecordSkeleton />
                      </div>

                      <div
                        className="mt-4 flex gap-2 border-t border-border pt-4"
                      >
                        <Skeleton className="h-8 w-16 rounded-md" />
                        <Skeleton className="h-8 w-16 rounded-md" />
                        <Skeleton className="h-8 w-12 rounded-md" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ==================================================== */}
        {/* SIDEBAR                                             */}
        {/* ==================================================== */}

        <aside className="space-y-6">
          {/* ================================================== */}
          {/* CLIENT RECORD                                      */}
          {/* ================================================== */}

          <section
            className="overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
          >
            <div
              className="border-b border-border px-5 py-4"
            >
              <Skeleton className="h-2.5 w-20" />
              <Skeleton className="mt-2 h-4 w-28" />
            </div>

            <div className="px-5 py-5">
              <div className="flex items-start gap-3">
                <Skeleton className="h-10 w-10 shrink-0 rounded-md" />

                <div className="min-w-0 flex-1">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="mt-2 h-3 w-24" />
                  <Skeleton className="mt-3 h-3 w-40 max-w-full" />
                </div>
              </div>

              <div
                className="mt-5 flex items-center justify-between gap-4 border-t border-border pt-4"
              >
                <Skeleton className="h-2.5 w-14" />
                <Skeleton className="h-2.5 w-20" />
              </div>
            </div>
          </section>

          {/* ================================================== */}
          {/* FILES                                              */}
          {/* ================================================== */}

          <section
            className="overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
          >
            <div
              className="flex items-center justify-between gap-4 border-b border-border px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background"
                >
                  <Paperclip className="h-3.5 w-3.5 text-muted-foreground/20" />
                </div>

                <div>
                  <Skeleton className="h-2.5 w-16" />
                  <Skeleton className="mt-2 h-4 w-10" />
                </div>
              </div>

              <Skeleton className="h-3 w-4" />
            </div>

            <div className="px-5 py-5">
              {/* compact document register */}
              <div
                className="overflow-hidden border border-border bg-background/15"
              >
                <div
                  className="max-h-[340px] divide-y divide-border overflow-hidden"
                >
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 px-3 py-3"
                    >
                      <Skeleton className="h-9 w-9 shrink-0 rounded-md" />

                      <div className="min-w-0 flex-1">
                        <Skeleton className="h-3.5 w-[75%]" />

                        <div className="mt-2 flex items-center gap-2">
                          <Skeleton className="h-2.5 w-12" />
                          <Skeleton className="h-1 w-1 rounded-full" />
                          <Skeleton className="h-2.5 w-20" />
                        </div>
                      </div>

                      <div className="flex gap-0.5">
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="flex items-center justify-between gap-3 border-t border-border bg-muted/10 px-3 py-2.5"
                >
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-1.5 w-1.5 rounded-full" />
                    <Skeleton className="h-2.5 w-16" />
                  </div>

                  <Skeleton className="h-3 w-10" />
                </div>
              </div>
            </div>
          </section>

          {/* ================================================== */}
          {/* FILE UPLOADER                                      */}
          {/* ================================================== */}

          <section
            className="border border-border bg-card p-4 shadow-[var(--shadow-card)]"
          >
            <div className="mb-3">
              <Skeleton className="h-2.5 w-20" />
              <Skeleton className="mt-2 h-3 w-44 max-w-full" />
            </div>

            <div
              className="relative border border-dashed border-border bg-background/20 px-4 py-5"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 shrink-0 rounded-md" />

                <div className="min-w-0 flex-1">
                  <Skeleton className="h-2.5 w-24" />
                  <Skeleton className="mt-2 h-4 w-32" />
                  <Skeleton className="mt-2 h-3 w-[90%]" />
                </div>
              </div>
            </div>

            <div
              className="mt-3 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2">
                <Skeleton className="h-1.5 w-1.5 rounded-full" />
                <Skeleton className="h-2.5 w-20" />
              </div>

              <Skeleton className="h-2.5 w-16" />
            </div>
          </section>

          {/* ================================================== */}
          {/* ORIGINAL BRIEF                                     */}
          {/* ================================================== */}

          <section
            className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
          >
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/30 via-secondary/10 to-transparent"
            />

            <div
              className="border-b border-border px-5 py-4"
            >
              <div className="flex items-center gap-2">
                <Layers3 className="h-3.5 w-3.5 text-muted-foreground/20" />
                <Skeleton className="h-2.5 w-20" />
              </div>

              <Skeleton className="mt-2 h-4 w-24" />
            </div>

            <div className="px-5 py-5">
              <Skeleton className="h-4 w-[85%]" />
              <Skeleton className="mt-2 h-4 w-[55%]" />

              <div
                className="mt-4 flex items-center gap-2"
              >
                <Skeleton className="h-3.5 w-3.5" />
                <Skeleton className="h-3 w-32" />
              </div>

              <Skeleton className="mt-5 h-9 w-full rounded-md" />
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

//==============================================================//
// HEADER META
//==============================================================//

function HeaderMetaSkeleton({ icon: Icon }: { icon: typeof Calendar }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-muted-foreground/20" />
        <Skeleton className="h-2.5 w-16" />
      </div>

      <Skeleton className="mt-2 h-3 w-24" />
    </div>
  );
}

//==============================================================//
// SNAPSHOT
//==============================================================//

function SnapshotSkeleton({ icon: Icon }: { icon: typeof CircleDollarSign }) {
  return (
    <div
      className="border-b border-border px-5 py-4 sm:border-r xl:border-b-0 xl:last:border-r-0"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <Skeleton className="h-2.5 w-16" />
          <Skeleton className="mt-2 h-3 w-24" />
          <Skeleton className="mt-3 h-4 w-28" />
        </div>

        <Icon className="h-4 w-4 text-muted-foreground/20" />
      </div>
    </div>
  );
}

//==============================================================//
// PANEL HEADER
//==============================================================//

function PanelHeaderSkeleton({ icon: Icon }: { icon: typeof FileText }) {
  return (
    <div
      className="flex items-start gap-3 border-b border-border px-5 py-4 sm:px-6"
    >
      <Skeleton className="h-9 w-9 shrink-0 rounded-md" />

      <div>
        <Skeleton className="h-2.5 w-24" />
        <Skeleton className="mt-2 h-4 w-32" />
        <Skeleton className="mt-2 h-3 w-56 max-w-full" />
      </div>
    </div>
  );
}

//==============================================================//
// INVOICE MOBILE RECORD
//==============================================================//

function InvoiceRecordSkeleton() {
  return (
    <div
      className="border border-border bg-background/30 p-3"
    >
      <Skeleton className="h-2.5 w-20" />
      <Skeleton className="mt-2 h-3.5 w-24" />
    </div>
  );
}
