export default function Loading() {
  const rows = Array.from({ length: 5 });

  return (
    <section>
      <div className="w-full">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {/* Title */}
            <div className="h-7 w-52 animate-pulse rounded-md bg-muted" />

            {/* Description */}
            <div className="mt-2 h-4 w-80 animate-pulse rounded-md bg-muted" />
          </div>

          {/* New Request button */}
          <div className="h-10 w-32 animate-pulse rounded-md bg-muted" />
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              {/* Header */}
              <thead className="border-b border-border">
                <tr>
                  <th className="px-4 py-3">
                    <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                  </th>

                  <th className="px-4 py-3">
                    <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                  </th>

                  <th className="px-4 py-3">
                    <div className="h-3 w-14 animate-pulse rounded bg-muted" />
                  </th>

                  <th className="px-4 py-3">
                    <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                  </th>

                  <th className="px-4 py-3">
                    <div className="h-3 w-14 animate-pulse rounded bg-muted" />
                  </th>

                  <th className="px-4 py-3">
                    <div className="ml-auto h-3 w-14 animate-pulse rounded bg-muted" />
                  </th>
                </tr>
              </thead>

              {/* Rows */}
              <tbody className="divide-y divide-border">
                {rows.map((_, index) => (
                  <tr key={index}>
                    {/* Project */}
                    <td className="px-4 py-4">
                      <div className="max-w-[260px]">
                        <div className="h-4 w-40 animate-pulse rounded bg-muted" />
                        <div className="mt-2 h-3 w-28 animate-pulse rounded bg-muted" />
                      </div>
                    </td>

                    {/* Service */}
                    <td className="px-4 py-4">
                      <div className="h-4 w-28 animate-pulse rounded bg-muted" />
                    </td>

                    {/* Budget */}
                    <td className="px-4 py-4">
                      <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                    </td>

                    {/* Submitted */}
                    <td className="px-4 py-4">
                      <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
                    </td>

                    {/* Action */}
                    <td className="px-4 py-4">
                      <div className="ml-auto h-4 w-10 animate-pulse rounded bg-muted" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
