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

          <Skeleton className="mt-4 h-8 w-36" />
          <Skeleton className="mt-3 h-4 w-full max-w-xl" />
          <Skeleton className="mt-2 h-4 w-full max-w-md" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-1.5 w-1.5 rounded-full" />
          <Skeleton className="h-2 w-24" />
        </div>
      </div>

      {/*===== Summary =====*/}
      <div className="grid border border-border bg-card shadow-[var(--shadow-card)] sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className={`flex items-center justify-between gap-5 px-5 py-5 ${
              index > 0
                ? "border-t border-border sm:border-l sm:border-t-0"
                : ""
            }`}
          >
            <div>
              <Skeleton className="h-2 w-20" />
              <Skeleton className="mt-3 h-8 w-10" />
            </div>

            <Skeleton className="h-9 w-9 border border-border" />
          </div>
        ))}
      </div>

      {/*===== Payments register =====*/}
      <div className="relative overflow-visible border border-border bg-card shadow-[var(--shadow-card)]">
        <Skeleton className="absolute left-0 top-0 h-[2px] w-28" />

        {/*===== Register header =====*/}
        <div className="relative z-30 border-b border-border px-4 pb-4 pt-5 sm:px-5">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <Skeleton className="h-2 w-24" />
              <Skeleton className="mt-3 h-4 w-32" />
            </div>

            {/*===== Filters =====*/}
            <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center xl:w-auto">
              <Skeleton className="h-10 w-full lg:flex-1 xl:w-[280px] xl:flex-none" />
              <Skeleton className="h-10 w-full lg:w-[160px]" />
              <Skeleton className="h-10 w-full lg:w-[180px]" />

              <div className="flex items-center justify-between gap-3 lg:justify-start">
                <Skeleton className="h-2 w-16" />
                <Skeleton className="h-9 w-9 border border-border" />
              </div>
            </div>
          </div>
        </div>

        {/*===== Desktop table =====*/}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[1000px] border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/10">
                <th className="px-5 py-3 text-left">
                  <Skeleton className="h-2 w-12" />
                </th>

                <th className="px-5 py-3 text-left">
                  <Skeleton className="h-2 w-10" />
                </th>

                <th className="px-5 py-3 text-left">
                  <Skeleton className="h-2 w-12" />
                </th>

                <th className="px-5 py-3 text-left">
                  <Skeleton className="h-2 w-14" />
                </th>

                <th className="px-5 py-3 text-left">
                  <Skeleton className="h-2 w-10" />
                </th>

                <th className="px-5 py-3 text-left">
                  <Skeleton className="h-2 w-12" />
                </th>

                <th className="px-5 py-3 text-left">
                  <Skeleton className="h-2 w-12" />
                </th>
              </tr>
            </thead>

            <tbody>
              {Array.from({ length: 8 }).map((_, index) => (
                <tr
                  key={index}
                  className="border-b border-border last:border-b-0"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-9 w-9 shrink-0 border border-border" />

                      <div>
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="mt-2 h-2 w-16" />
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <Skeleton className="h-4 w-28" />
                  </td>

                  <td className="px-5 py-4">
                    <Skeleton className="h-4 w-40" />
                  </td>

                  <td className="px-5 py-4">
                    <Skeleton className="h-4 w-20" />
                  </td>

                  <td className="px-5 py-4">
                    <Skeleton className="h-4 w-24" />
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-3.5 w-3.5" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <Skeleton className="h-6 w-16 rounded-md" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/*===== Mobile records =====*/}
        <div className="divide-y divide-border lg:hidden">
          {Array.from({ length: 4 }).map((_, index) => (
            <article key={index} className="p-4 sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <Skeleton className="h-9 w-9 shrink-0 border border-border" />

                  <div className="min-w-0">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="mt-2 h-4 w-36" />
                  </div>
                </div>

                <Skeleton className="h-6 w-16 rounded-md" />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4 border-y border-border py-4">
                <div>
                  <Skeleton className="h-2 w-12" />
                  <Skeleton className="mt-2 h-4 w-20" />
                </div>

                <div>
                  <Skeleton className="h-2 w-10" />
                  <Skeleton className="mt-2 h-4 w-24" />
                </div>

                <div>
                  <Skeleton className="h-2 w-12" />
                  <Skeleton className="mt-2 h-4 w-28" />
                </div>

                <div>
                  <Skeleton className="h-2 w-10" />
                  <Skeleton className="mt-2 h-4 w-24" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/*===== Pagination =====*/}
        <div className="border-t border-border bg-muted/10 px-4 py-4 sm:px-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-1.5 w-1.5 rounded-full" />
              <Skeleton className="h-3 w-36" />
            </div>

            <div className="flex items-center gap-1">
              <Skeleton className="h-9 w-9 border border-border" />
              <Skeleton className="h-9 w-9 border border-border" />
              <Skeleton className="h-9 w-9 border border-border" />
              <Skeleton className="h-9 w-9 border border-border" />
              <Skeleton className="h-9 w-9 border border-border" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
