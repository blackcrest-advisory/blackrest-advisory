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

          <Skeleton className="mt-4 h-8 w-56" />
          <Skeleton className="mt-3 h-4 w-full max-w-xl" />
          <Skeleton className="mt-2 h-4 w-full max-w-lg" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-1.5 w-1.5 rounded-full" />
          <Skeleton className="h-2 w-20" />
        </div>
      </div>

      {/*===== Brief workspace =====*/}
      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-6">
          {/*===== Project overview =====*/}
          <section className="relative border border-border bg-card shadow-[var(--shadow-card)]">
            <Skeleton className="absolute left-0 top-0 h-[2px] w-24" />

            <div className="border-b border-border px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-4" />

                <div>
                  <Skeleton className="h-2 w-28" />
                  <Skeleton className="mt-2 h-3 w-56" />
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index}>
                  <div className="mb-3 flex items-start gap-3">
                    <Skeleton className="h-7 w-7 border border-border" />

                    <div>
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="mt-2 h-2 w-36" />
                    </div>
                  </div>

                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
              ))}
            </div>
          </section>

          {/*===== Requirements =====*/}
          <section className="border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="border-b border-border px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-4" />

                <div>
                  <Skeleton className="h-2 w-24" />
                  <Skeleton className="mt-2 h-3 w-64" />
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="mt-3 h-[200px] w-full rounded-md" />

              <div className="mt-3 flex items-center gap-2">
                <Skeleton className="h-1 w-1 rounded-full" />
                <Skeleton className="h-2 w-80 max-w-full" />
              </div>
            </div>
          </section>

          {/*===== Strategic context =====*/}
          <section className="border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="border-b border-border px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-4" />

                <div>
                  <Skeleton className="h-2 w-28" />
                  <Skeleton className="mt-2 h-3 w-64" />
                </div>
              </div>
            </div>

            <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-2">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index}>
                  <div className="mb-3 flex items-start gap-3">
                    <Skeleton className="h-7 w-7 border border-border" />

                    <div>
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="mt-2 h-2 w-40" />
                    </div>
                  </div>

                  <Skeleton className="h-[130px] w-full rounded-md" />
                </div>
              ))}

              <div className="lg:col-span-2">
                <div className="mb-3 flex items-start gap-3">
                  <Skeleton className="h-7 w-7 border border-border" />

                  <div>
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="mt-2 h-2 w-48" />
                  </div>
                </div>

                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>
          </section>

          {/*===== Attachments =====*/}
          <section className="border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="border-b border-border px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-4" />

                <div>
                  <Skeleton className="h-2 w-24" />
                  <Skeleton className="mt-2 h-3 w-72 max-w-full" />
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex min-h-[150px] items-center justify-center border border-dashed border-border bg-muted/10">
                <div className="flex flex-col items-center">
                  <Skeleton className="h-9 w-9 border border-border" />
                  <Skeleton className="mt-4 h-3 w-36" />
                  <Skeleton className="mt-2 h-2 w-28" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/*===== Submission panel =====*/}
        <aside>
          <div className="space-y-4 xl:sticky xl:top-24">
            <div className="border border-border bg-primary shadow-[var(--shadow-card)]">
              <div className="border-b border-primary-foreground/10 px-5 py-5">
                <Skeleton className="h-2 w-20 bg-primary-foreground/10" />
                <Skeleton className="mt-3 h-5 w-36 bg-primary-foreground/10" />
                <Skeleton className="mt-3 h-3 w-full bg-primary-foreground/10" />
                <Skeleton className="mt-2 h-3 w-4/5 bg-primary-foreground/10" />
              </div>

              <div className="divide-y divide-primary-foreground/10">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 px-5 py-3.5"
                  >
                    <Skeleton className="h-2 w-4 bg-primary-foreground/10" />
                    <Skeleton className="h-3 w-32 bg-primary-foreground/10" />
                  </div>
                ))}
              </div>

              <div className="border-t border-primary-foreground/10 p-5">
                <Skeleton className="h-10 w-full rounded-md bg-primary-foreground/10" />
              </div>
            </div>

            {/*===== Submission note =====*/}
            <div className="border border-border bg-muted/15 px-4 py-4">
              <Skeleton className="h-2 w-24" />
              <Skeleton className="mt-3 h-3 w-full" />
              <Skeleton className="mt-2 h-3 w-11/12" />
              <Skeleton className="mt-2 h-3 w-4/5" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
