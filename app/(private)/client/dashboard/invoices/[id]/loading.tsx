function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-muted/60 ${className}`} />;
}

export default function Loading() {
  return (
    <div className="min-w-0 max-w-full space-y-6">
      {/*===== Back navigation =====*/}
      <div className="border-b border-border pb-5">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>

      {/*===== Invoice header =====*/}
      <div className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
        <Skeleton className="absolute left-0 top-0 h-[2px] w-28" />

        <div className="grid gap-6 border-b border-border px-5 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:px-8 lg:py-8">
          <div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-2 w-24" />
              <Skeleton className="h-px w-10" />
            </div>

            <div className="mt-5 flex items-end gap-4">
              <Skeleton className="h-9 w-28" />
              <Skeleton className="h-4 w-24" />
            </div>

            <Skeleton className="mt-4 h-4 w-64" />
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <Skeleton className="h-6 w-20 rounded-md" />

            <div className="flex items-center gap-2">
              <Skeleton className="h-3.5 w-3.5" />
              <Skeleton className="h-3 w-28" />
            </div>
          </div>
        </div>

        {/*===== Invoice overview =====*/}
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="border-b border-border px-5 py-6 sm:px-6 lg:border-b-0 lg:border-r lg:px-8 lg:py-8">
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-2 w-14" />
            </div>

            <Skeleton className="mt-6 h-5 w-40" />
            <Skeleton className="mt-2 h-4 w-48" />

            <div className="mt-6 border-t border-border pt-4">
              <Skeleton className="h-2 w-12" />
              <Skeleton className="mt-3 h-4 w-44" />
            </div>
          </div>

          <div className="px-5 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-2 w-24" />
            </div>

            <div className="mt-5 divide-y divide-border">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-5 py-3 first:pt-0"
                >
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/*===== Line items =====*/}
      <div className="overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
          <div>
            <Skeleton className="h-2 w-16" />
            <Skeleton className="mt-3 h-4 w-48" />
          </div>

          <Skeleton className="h-2 w-8" />
        </div>

        {/*===== Desktop table =====*/}
        <div className="hidden sm:block">
          <div className="grid grid-cols-[minmax(0,1fr)_180px] border-b border-border bg-muted/10 px-6 py-3">
            <Skeleton className="h-2 w-20" />
            <Skeleton className="ml-auto h-2 w-14" />
          </div>

          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-[minmax(0,1fr)_180px] items-center border-b border-border px-6 py-4 last:border-b-0"
            >
              <Skeleton className="h-4 w-48" />
              <Skeleton className="ml-auto h-4 w-24" />
            </div>
          ))}
        </div>

        {/*===== Mobile rows =====*/}
        <div className="divide-y divide-border sm:hidden">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="px-5 py-4">
              <Skeleton className="h-2 w-16" />
              <Skeleton className="mt-3 h-4 w-full max-w-[220px]" />

              <div className="mt-4 flex items-center justify-between gap-4 border-t border-border pt-3">
                <Skeleton className="h-2 w-12" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          ))}
        </div>

        {/*===== Total =====*/}
        <div className="grid border-t-2 border-secondary bg-secondary/[0.04] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div className="px-5 py-4 sm:px-6">
            <Skeleton className="h-2 w-20" />
          </div>

          <div className="border-t border-border px-5 py-4 sm:border-l sm:border-t-0 sm:px-6">
            <Skeleton className="h-7 w-32" />
          </div>
        </div>
      </div>

      {/*===== Notes =====*/}
      <div className="border border-border bg-muted/15 px-5 py-5 sm:px-6">
        <Skeleton className="h-2 w-12" />
        <Skeleton className="mt-4 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-4/5" />
      </div>

      {/*===== Actions =====*/}
      <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Skeleton className="h-2 w-24" />
          <Skeleton className="mt-3 h-4 w-56" />
        </div>

        <div className="flex gap-3">
          <Skeleton className="h-10 w-36 rounded-md" />
          <Skeleton className="h-10 w-28 rounded-md" />
        </div>
      </div>
    </div>
  );
}
