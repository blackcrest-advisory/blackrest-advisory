function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-muted/60 ${className}`} />;
}

export default function Loading() {
  return (
    <section className="relative min-w-0 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="absolute left-0 top-0 h-[2px] w-full bg-secondary/45" />

      <div className="grid min-h-[680px] lg:grid-cols-[280px_minmax(0,1fr)]">
        {/*===== Client inbox rail =====*/}
        <aside className="border-b border-border bg-muted/[0.12] lg:border-b-0 lg:border-r">
          <div className="border-b border-border px-5 py-5">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-2 w-24" />
            </div>
            <Skeleton className="mt-4 h-3 w-full" />
            <Skeleton className="mt-2 h-3 w-4/5" />
          </div>

          <div>
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-3 border-b border-border px-5 py-4"
              >
                <Skeleton className="h-9 w-9 shrink-0 rounded-full border border-border" />
                <div className="min-w-0 flex-1">
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="mt-2 h-2 w-36" />
                </div>
                {index === 0 && <Skeleton className="h-5 w-5 rounded-full" />}
              </div>
            ))}
          </div>
        </aside>

        {/*===== Conversation panel =====*/}
        <div className="flex min-w-0 flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-5 sm:px-6">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 shrink-0 rounded-full border border-border" />
              <div>
                <Skeleton className="h-2 w-28" />
                <Skeleton className="mt-3 h-5 w-40" />
              </div>
            </div>
            <Skeleton className="hidden h-2 w-36 sm:block" />
          </div>

          <div className="flex-1 space-y-5 bg-muted/[0.05] px-5 py-6 sm:px-6">
            <div className="flex items-start gap-3">
              <Skeleton className="h-9 w-9 shrink-0 rounded-full border border-border" />
              <MessageBubbleSkeleton />
            </div>
            <div className="flex justify-end">
              <MessageBubbleSkeleton outgoing />
            </div>
            <div className="flex items-start gap-3">
              <Skeleton className="h-9 w-9 shrink-0 rounded-full border border-border" />
              <MessageBubbleSkeleton />
            </div>
          </div>

          <div className="border-t border-border bg-card p-5 sm:p-6">
            <Skeleton className="h-28 w-full rounded-md border border-border" />
            <div className="mt-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-2 w-36" />
              </div>
              <Skeleton className="h-8 w-28 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MessageBubbleSkeleton({ outgoing = false }: { outgoing?: boolean }) {
  return (
    <div
      className={`w-full border px-4 py-3 ${
        outgoing
          ? "max-w-[300px] border-secondary/20 bg-secondary/[0.08] sm:max-w-[380px]"
          : "max-w-[340px] border-border bg-card sm:max-w-[420px]"
      }`}
    >
      <div className="flex items-center justify-between gap-5">
        <Skeleton className={`h-3 w-16 ${outgoing ? "bg-secondary/25" : ""}`} />
        <Skeleton className={`h-2 w-20 ${outgoing ? "bg-secondary/25" : ""}`} />
      </div>
      <Skeleton className={`mt-4 h-3 w-full ${outgoing ? "bg-secondary/25" : ""}`} />
      <Skeleton className={`mt-2 h-3 w-3/5 ${outgoing ? "bg-secondary/25" : ""}`} />
    </div>
  );
}
