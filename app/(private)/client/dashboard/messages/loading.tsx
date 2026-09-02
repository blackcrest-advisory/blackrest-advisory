function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-muted/60 ${className}`} />;
}

export default function Loading() {
  return (
    <section className="relative min-w-0 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="absolute left-0 top-0 h-[2px] w-full bg-secondary/45" />

      <div className="flex min-h-[680px] min-w-0 flex-col">
        {/*===== Conversation header =====*/}
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 shrink-0 border border-border" />

            <div>
              <Skeleton className="h-2 w-28" />
              <Skeleton className="mt-3 h-5 w-48" />
            </div>
          </div>

          <Skeleton className="hidden h-2 w-36 sm:block" />
        </div>

        {/*===== Message history =====*/}
        <div className="flex-1 space-y-5 bg-muted/[0.05] px-5 py-6 sm:px-6">
          <div className="flex justify-end">
            <div className="w-full max-w-[300px] border border-secondary/20 bg-secondary/[0.08] px-4 py-3 sm:max-w-[380px]">
              <div className="flex items-center justify-between gap-5">
                <Skeleton className="h-3 w-9 bg-secondary/30" />
                <Skeleton className="h-2 w-20 bg-secondary/30" />
              </div>
              <Skeleton className="mt-4 h-3 w-full bg-secondary/25" />
              <Skeleton className="mt-2 h-3 w-4/5 bg-secondary/25" />
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Skeleton className="h-9 w-9 shrink-0 rounded-full border border-border" />
            <div className="w-full max-w-[340px] border border-border bg-card px-4 py-3 sm:max-w-[420px]">
              <div className="flex items-center justify-between gap-5">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-2 w-20" />
              </div>
              <Skeleton className="mt-4 h-3 w-full" />
              <Skeleton className="mt-2 h-3 w-3/5" />
            </div>
          </div>

          <div className="flex justify-end">
            <div className="w-full max-w-[250px] border border-secondary/20 bg-secondary/[0.08] px-4 py-3 sm:max-w-[320px]">
              <Skeleton className="h-3 w-full bg-secondary/25" />
              <Skeleton className="mt-2 h-3 w-2/3 bg-secondary/25" />
            </div>
          </div>
        </div>

        {/*===== Composer =====*/}
        <div className="border-t border-border bg-card p-5 sm:p-6">
          <Skeleton className="h-10 w-full max-w-xs rounded-md border border-border" />
          <Skeleton className="mt-3 h-28 w-full rounded-md border border-border" />

          <div className="mt-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-2 w-36" />
            </div>
            <Skeleton className="h-8 w-28 rounded-md" />
          </div>
        </div>
      </div>
    </section>
  );
}
