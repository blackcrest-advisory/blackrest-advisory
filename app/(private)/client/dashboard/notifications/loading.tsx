function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-muted/60 ${className}`} />;
}

export default function Loading() {
  return (
    <div className="min-w-0 max-w-full space-y-6">
      {/*===== Page header =====*/}
      <div className="grid gap-5 border-b border-border pb-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-2 w-24" />
            <Skeleton className="h-px w-10" />
          </div>

          <Skeleton className="mt-4 h-8 w-44" />
          <Skeleton className="mt-3 h-4 w-full max-w-xl" />
          <Skeleton className="mt-2 h-4 w-full max-w-md" />
        </div>

        <Skeleton className="h-9 w-32 rounded-md" />
      </div>

      {/*===== Summary =====*/}
      <div className="grid border border-border bg-card shadow-[var(--shadow-card)] sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className={`flex items-center justify-between gap-5 px-5 py-5 ${index > 0 ? "border-t border-border sm:border-l sm:border-t-0" : ""}`}
          >
            <div>
              <Skeleton className="h-2 w-20" />
              <Skeleton className="mt-3 h-8 w-10" />
            </div>

            <Skeleton className="h-9 w-9 border border-border" />
          </div>
        ))}
      </div>

      {/*===== Notification inbox =====*/}
      <div className="relative border border-border bg-card shadow-[var(--shadow-card)]">
        <Skeleton className="absolute left-0 top-0 h-[2px] w-28" />

        {/*===== Inbox header =====*/}
        <div className="flex flex-col gap-4 border-b border-border px-4 pb-4 pt-5 sm:flex-row sm:items-end sm:justify-between sm:px-5">
          <div>
            <Skeleton className="h-2 w-24" />
            <Skeleton className="mt-3 h-4 w-32" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-1.5 w-1.5 rounded-full" />
            <Skeleton className="h-2 w-14" />
          </div>
        </div>

        {/*===== Notification rows =====*/}
        <div className="divide-y divide-border">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex items-start gap-4 px-4 py-5 sm:px-5"
            >
              <Skeleton className="h-9 w-9 shrink-0 border border-border" />

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <Skeleton className="h-4 w-44" />
                    <Skeleton className="mt-3 h-3 w-full max-w-xl" />
                    <Skeleton className="mt-2 h-3 w-4/5 max-w-lg" />
                  </div>

                  <Skeleton className="h-2 w-20 shrink-0" />
                </div>

                <div className="mt-4 flex items-center gap-4">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/*===== Inbox footer =====*/}
        <div className="flex items-center justify-between gap-4 border-t border-border bg-muted/10 px-4 py-3 sm:px-5">
          <Skeleton className="h-2 w-24" />
          <Skeleton className="h-2 w-20" />
        </div>
      </div>
    </div>
  );
}
