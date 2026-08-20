//===== imports =====//
import {
  Cloud,
  FileStack,
  HardDrive,
  Layers,
  LockKeyhole,
  UploadCloud,
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
// CLIENT FILES LOADING
//==============================================================//

export default function ClientFilesLoading() {
  return (
    <div
      className="relative min-w-0 max-w-full space-y-6"
      aria-label="Loading client files"
    >
      {/*===== FILES HEADER =====*/}

      <header className="relative min-w-0 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
        {/* ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-secondary/[0.04] blur-[110px]"
        />

        {/* architectural rail */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 top-0 w-[3px] bg-gradient-to-b from-secondary/40 via-secondary/20 to-transparent"
        />

        <div className="relative z-10 grid min-w-0 gap-7 px-6 py-7 sm:px-7 lg:px-9 lg:py-8 xl:grid-cols-[minmax(0,1fr)_310px] xl:items-center">
          {/*===== TITLE =====*/}

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <FileStack className="h-3.5 w-3.5 text-muted-foreground/20" />

              <Skeleton className="h-2.5 w-28" />

              <span className="h-px w-9 bg-border" />

              <Skeleton className="h-2.5 w-24" />
            </div>

            <Skeleton className="mt-6 h-10 w-28 sm:h-11"/>

            <div className="mt-4 space-y-2.5">
              <Skeleton className="h-3.5 w-full max-w-2xl" />
              <Skeleton className="h-3.5 w-[70%] max-w-xl" />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <div className="flex items-center gap-2">
                <LockKeyhole className="h-3.5 w-3.5 text-muted-foreground/15" />
                <Skeleton className="h-2.5 w-20" />
              </div>

              <div className="flex items-center gap-2">
                <Cloud className="h-3.5 w-3.5 text-muted-foreground/15" />
                <Skeleton className="h-2.5 w-20" />
              </div>
            </div>
          </div>

          {/*===== UPLOAD PANEL =====*/}

          <div className="min-w-0 border-t border-border pt-5 xl:border-l xl:border-t-0 xl:pl-7 xl:pt-0">
            <Skeleton className="h-2.5 w-24" />

            <div className="mt-3 space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-[82%]" />
            </div>

            <Skeleton className="mt-5 h-10 w-full rounded-md" />

            <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
              <Skeleton className="h-1.5 w-1.5 rounded-full" />
              <Skeleton className="h-2.5 w-28" />
            </div>
          </div>
        </div>
      </header>

      {/*===== FILES OVERVIEW =====*/}

      <section className="relative min-w-0 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
        {/* overview header */}
        <div className="flex flex-col gap-2 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <Skeleton className="h-2.5 w-24" />
            <Skeleton className="mt-2 h-3 w-56 max-w-full" />
          </div>

          <Skeleton className="h-2.5 w-28" />
        </div>

        {/* metrics */}
        <div className="grid min-w-0 sm:grid-cols-2 xl:grid-cols-4">
          <MetricSkeleton icon={FileStack} />

          <MetricSkeleton icon={HardDrive} progress />

          <MetricSkeleton icon={Layers} />

          <MetricSkeleton icon={UploadCloud} />
        </div>

        {/* footer */}
        <div className="flex flex-col gap-2 border-t border-border bg-muted/10 px-5 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-2">
            <Skeleton className="h-1.5 w-1.5 rounded-full" />
            <Skeleton className="h-2.5 w-28" />
          </div>

          <Skeleton className="h-2.5 w-24" />
        </div>
      </section>

      {/*===== DOCUMENT WORKSPACE =====*/}

      <section className="relative min-w-0 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
        {/* top signal */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 h-[2px] w-32 bg-gradient-to-r from-secondary/30 to-transparent"
        />

        {/*===== WORKSPACE HEADER =====*/}

        <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div>
            <Skeleton className="h-2.5 w-24" />
            <Skeleton className="mt-2 h-4 w-28" />
            <Skeleton className="mt-2 h-3 w-64 max-w-full" />
          </div>

          <div>
            <Skeleton className="h-2.5 w-20" />
            <Skeleton className="mt-2 h-4 w-7 sm:ml-auto" />
          </div>
        </div>

        {/*===== FILTER BAR =====*/}

        <div className="border-b border-border bg-background/20 px-5 py-4 sm:px-6">
          <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            {/* search */}
            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-2">
                <Skeleton className="h-3.5 w-3.5 rounded-sm" />
                <Skeleton className="h-2.5 w-20" />
              </div>

              <Skeleton className="h-10 w-full rounded-md lg:max-w-md" />
            </div>

            {/* filters */}
            <div className="grid gap-3 sm:grid-cols-2 lg:flex lg:items-end">
              <FilterControlSkeleton />
              <FilterControlSkeleton />
            </div>
          </div>
        </div>

        {/*===== DESKTOP TABLE =====*/}

        <div className="hidden min-w-0 max-w-full overflow-x-auto md:block">
          <table className="w-full min-w-[860px] border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/15">
                {["w-12", "w-14", "w-10", "w-8", "w-14", "w-16", "w-12"].map(
                  (width, index) => (
                    <th
                      key={index}
                      className="h-11 px-4 text-left first:pl-6 last:pr-6"
                    >
                      <Skeleton
                        className={`
                          h-2.5
                          ${width}
                          ${index === 6 ? "ml-auto" : ""}
                        `}
                      />
                    </th>
                  ),
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {Array.from({
                length: 6,
              }).map((_, index) => (
                <FileRowSkeleton key={index} />
              ))}
            </tbody>
          </table>
        </div>

        {/*===== MOBILE RECORDS =====*/}

        <div className="divide-y divide-border md:hidden">
          {Array.from({
            length: 4,
          }).map((_, index) => (
            <MobileFileSkeleton key={index} />
          ))}
        </div>

        {/*===== WORKSPACE FOOTER =====*/}

        <div className="flex flex-col gap-2 border-t border-border bg-muted/10 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-2">
            <Skeleton className="h-1.5 w-1.5 rounded-full" />
            <Skeleton className="h-2.5 w-28" />
          </div>

          <Skeleton className="h-2.5 w-24" />
        </div>
      </section>
    </div>
  );
}

//==============================================================//
// METRIC SKELETON
//==============================================================//

function MetricSkeleton({
  icon: Icon,
  progress = false,
}: {
  icon: typeof FileStack;
  progress?: boolean;
}) {
  return (
    <div className="min-w-0 border-b border-border px-5 py-5 sm:border-r xl:border-b-0 sm:px-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <Skeleton className="h-2.5 w-20" />
          <Skeleton className="mt-3 h-7 w-16" />
          <Skeleton className="mt-2 h-2.5 w-28" />
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background">
          <Icon className="h-4 w-4 text-muted-foreground/15" />
        </div>
      </div>

      {progress && (
        <div className="mt-5">
          <div className="mb-2 flex justify-between gap-3">
            <Skeleton className="h-2 w-12" />
            <Skeleton className="h-2 w-6" />
          </div>

          <div className="h-1 overflow-hidden bg-muted">
            <Skeleton className="h-full w-[42%]" />
          </div>
        </div>
      )}
    </div>
  );
}

//==============================================================//
// FILTER CONTROL SKELETON
//==============================================================//

function FilterControlSkeleton() {
  return (
    <div className="min-w-0">
      <div className="mb-2 flex items-center gap-2">
        <Skeleton className="h-3.5 w-3.5 rounded-sm" />
        <Skeleton className="h-2.5 w-14" />
      </div>

      <Skeleton className="h-10 w-full rounded-md sm:min-w-44" />
    </div>
  );
}

//==============================================================//
// FILE ROW SKELETON
//==============================================================//

function FileRowSkeleton() {
  return (
    <tr>
      {/* file */}
      <td className="px-4 py-4 pl-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 shrink-0 rounded-md" />

          <div className="min-w-0">
            <Skeleton className="h-3.5 w-36" />
            <Skeleton className="mt-2 h-2 w-20" />
          </div>
        </div>
      </td>

      {/* project */}
      <td className="px-4 py-4">
        <Skeleton className="h-3 w-28" />
      </td>

      {/* type */}
      <td className="px-4 py-4">
        <Skeleton className="h-6 w-16 rounded-md" />
      </td>

      {/* size */}
      <td className="px-4 py-4">
        <Skeleton className="h-3 w-12" />
      </td>

      {/* uploaded by */}
      <td className="px-4 py-4">
        <Skeleton className="h-3 w-24" />
      </td>

      {/* uploaded at */}
      <td className="px-4 py-4">
        <Skeleton className="h-3 w-20" />
      </td>

      {/* actions */}
      <td className="px-4 py-4 pr-6">
        <div className="flex items-center justify-end gap-1">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </td>
    </tr>
  );
}

//==============================================================//
// MOBILE FILE SKELETON
//==============================================================//

function MobileFileSkeleton() {
  return (
    <div className="px-4 py-4 sm:px-5">
      <div className="min-w-0 border border-border bg-background/20 p-4">
        <div className="flex items-start gap-3">
          <Skeleton className="h-10 w-10 shrink-0 rounded-md" />

          <div className="min-w-0 flex-1">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="mt-2 h-3 w-24" />
          </div>

          <Skeleton className="h-6 w-16 rounded-md" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {Array.from({
            length: 4,
          }).map((_, index) => (
            <div
              key={index}
              className="border border-border bg-card p-3"
            >
              <Skeleton className="h-2 w-12" />
              <Skeleton className="mt-2 h-3 w-20" />
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end gap-2 border-t border-border pt-4">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
    </div>
  );
}
