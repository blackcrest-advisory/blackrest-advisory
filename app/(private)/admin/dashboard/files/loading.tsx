//===== imports =====//
import { FolderArchive, HardDrive, ShieldCheck } from "lucide-react";

//===== skeleton =====//
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

export default function page() {
  const rows = Array.from({ length: 6 }, (_, index) => index);

  return (
    <div className="relative space-y-6" aria-label="Loading files">
      {/* ====================================================== */}
      {/* ASSET REGISTRY HEADER                                 */}
      {/* ====================================================== */}

      <header
        className="
          relative
          overflow-hidden
          border border-border
          bg-card
          shadow-[var(--shadow-card)]
        "
      >
        <div
          aria-hidden="true"
          className="
            absolute
            left-0 top-0
            h-[2px] w-full
            bg-gradient-to-r
            from-secondary/45
            via-secondary/15
            to-transparent
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -right-24 -top-28
            h-64 w-64
            rounded-full
            bg-secondary/[0.05]
            blur-[100px]
          "
        />

        <div
          className="
            relative z-10
            grid
            gap-7
            px-5 py-6
            sm:px-6
            lg:px-8
            lg:py-7
            xl:grid-cols-[minmax(0,1fr)_280px]
          "
        >
          {/* left */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <FolderArchive className="h-3.5 w-3.5 text-secondary/25" />

              <Skeleton className="h-2.5 w-24" />

              <span className="h-px w-8 bg-border" />

              <Skeleton className="h-2.5 w-20" />
            </div>

            <Skeleton
              className="
                mt-5
                h-10
                w-32
                sm:h-11
              "
            />

            <div className="mt-4 space-y-2.5">
              <Skeleton className="h-3.5 w-full max-w-2xl" />
              <Skeleton className="h-3.5 w-[72%] max-w-xl" />
            </div>

            <div
              className="
                mt-7
                flex
                flex-wrap
                items-center
                gap-x-6
                gap-y-3
                border-t border-border
                pt-4
              "
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground/20" />
                <Skeleton className="h-2.5 w-28" />
              </div>

              <Skeleton className="h-3 w-20" />
            </div>
          </div>

          {/* storage */}
          <div
            className="
              border-t border-border
              pt-5
              xl:border-l
              xl:border-t-0
              xl:pl-7
              xl:pt-0
            "
          >
            <Skeleton className="h-2.5 w-24" />

            <div className="mt-4 flex items-end gap-3">
              <HardDrive className="mb-1 h-5 w-5 text-muted-foreground/20" />

              <Skeleton className="h-8 w-28" />
            </div>

            <Skeleton className="mt-3 h-3 w-full" />
            <Skeleton className="mt-2 h-3 w-[75%]" />

            <div
              className="
                mt-5
                flex
                items-center
                justify-between
                gap-4
                border-t border-border
                pt-4
              "
            >
              <Skeleton className="h-2.5 w-20" />
              <Skeleton className="h-4 w-8" />
            </div>
          </div>
        </div>
      </header>

      {/* ====================================================== */}
      {/* METRICS                                               */}
      {/* ====================================================== */}

      <section
        className="
          overflow-hidden
          border border-border
          bg-card
          shadow-[var(--shadow-card)]
        "
      >
        <div className="grid sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="
                  flex
                  items-start
                  justify-between
                  gap-4
                  border-b border-border
                  px-5 py-5
                  sm:border-b-0
                  sm:border-r
                  sm:last:border-r-0
                "
            >
              <div>
                <Skeleton className="h-2.5 w-16" />
                <Skeleton className="mt-2 h-3 w-20" />
                <Skeleton className="mt-3 h-7 w-16" />
              </div>

              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================== */}
      {/* DIRECTORY                                             */}
      {/* ====================================================== */}

      <section className="relative">
        {/* controls */}
        <div
          className="
            relative
            z-20
            border border-border
            bg-card
            shadow-[var(--shadow-card)]
          "
        >
          <div
            className="
              flex
              flex-col
              gap-3
              border-b border-border
              px-5 py-4
              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:px-6
            "
          >
            <div>
              <Skeleton className="h-2.5 w-20" />
              <Skeleton className="mt-2 h-3 w-40" />
            </div>

            <Skeleton className="h-3 w-24" />
          </div>

          <div
            className="
              flex
              flex-col
              gap-3
              px-5 py-4
              sm:flex-row
              sm:px-6
            "
          >
            <Skeleton className="h-10 min-w-0 flex-1 rounded-md" />
            <Skeleton className="h-10 w-full rounded-md sm:w-48" />
          </div>

          <div
            className="
              flex
              items-center
              gap-2
              border-t border-border
              bg-muted/10
              px-5 py-2.5
              sm:px-6
            "
          >
            <Skeleton className="h-1.5 w-1.5 rounded-full" />
            <Skeleton className="h-2.5 w-32" />
          </div>
        </div>

        {/* ==================================================== */}
        {/* FILE RECORDS                                        */}
        {/* ==================================================== */}

        <div className="relative z-10 mt-3">
          <div
            className="
              relative
              overflow-hidden
              border border-border
              bg-card
              shadow-[var(--shadow-card)]
            "
          >
            {/* top signal */}
            <div
              aria-hidden="true"
              className="
                absolute
                left-0 top-0
                z-10
                h-[2px] w-full
                bg-gradient-to-r
                from-secondary/30
                via-secondary/10
                to-transparent
              "
            />

            {/* ================================================= */}
            {/* DESKTOP TABLE                                    */}
            {/* ================================================= */}

            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full border-collapse">
                <thead
                  className="
                    border-b border-border
                    bg-muted/15
                  "
                >
                  <tr>
                    {[
                      "File",
                      "Project",
                      "Uploaded by",
                      "Size",
                      "Uploaded",
                      "Actions",
                    ].map((heading, index) => (
                      <th
                        key={heading}
                        className={`
                            h-11
                            px-4 py-3
                            ${index === 0 ? "pl-5" : ""}
                            ${index === 5 ? "pr-5" : ""}
                          `}
                      >
                        <Skeleton
                          className={`
                              h-2.5
                              ${index === 5 ? "ml-auto w-12" : "w-16"}
                            `}
                        />
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {rows.map((row) => (
                    <tr key={row}>
                      {/* file */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-9 w-9 shrink-0 rounded-md" />

                          <div>
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="mt-2 h-2.5 w-20" />
                          </div>
                        </div>
                      </td>

                      {/* project */}
                      <td className="px-4 py-4">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="mt-2 h-2.5 w-20" />
                      </td>

                      {/* uploaded */}
                      <td className="px-4 py-4">
                        <Skeleton className="h-6 w-16 rounded-md" />
                      </td>

                      {/* size */}
                      <td className="px-4 py-4">
                        <Skeleton className="h-4 w-16" />
                      </td>

                      {/* date */}
                      <td className="px-4 py-4">
                        <Skeleton className="h-3.5 w-24" />
                      </td>

                      {/* action */}
                      <td className="px-5 py-4">
                        <Skeleton className="ml-auto h-8 w-8 rounded-md" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ================================================= */}
            {/* MOBILE + TABLET                                  */}
            {/* ================================================= */}

            <div className="divide-y divide-border lg:hidden">
              {rows.map((row) => (
                <article
                  key={row}
                  className="
                      px-5 py-5
                      sm:px-6
                    "
                >
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-10 w-10 shrink-0 rounded-md" />

                    <div className="min-w-0 flex-1">
                      <div
                        className="
                            flex
                            items-start
                            justify-between
                            gap-3
                          "
                      >
                        <div>
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="mt-2 h-2.5 w-20" />
                        </div>

                        <Skeleton className="h-8 w-8 rounded-md" />
                      </div>

                      <div
                        className="
                            mt-4
                            grid
                            gap-3
                            sm:grid-cols-2
                          "
                      >
                        <RecordSkeleton />
                        <RecordSkeleton />
                        <RecordSkeleton />
                        <RecordSkeleton />
                      </div>

                      <div
                        className="
                            mt-4
                            flex
                            items-center
                            justify-between
                            border-t border-border
                            pt-4
                          "
                      >
                        <Skeleton className="h-2.5 w-28" />
                        <Skeleton className="h-2.5 w-16" />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* footer */}
            <div
              className="
                flex
                items-center
                justify-between
                gap-3
                border-t border-border
                bg-muted/10
                px-5 py-3
                sm:px-6
              "
            >
              <div className="flex items-center gap-2">
                <Skeleton className="h-1.5 w-1.5 rounded-full" />
                <Skeleton className="h-2.5 w-32" />
              </div>

              <Skeleton className="h-3 w-14" />
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* PAGINATION                                          */}
        {/* ==================================================== */}

        <div
          className="
            mt-3
            border border-border
            bg-card
            px-5 py-4
            shadow-[var(--shadow-card)]
            sm:px-6
          "
        >
          <div
            className="
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <Skeleton className="h-3 w-32" />

            <div className="flex items-center gap-1">
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-9 w-9" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

//==============================================================//
// MOBILE RECORD
//==============================================================//

function RecordSkeleton() {
  return (
    <div
      className="
        border border-border
        bg-background/30
        p-3
      "
    >
      <Skeleton className="h-2.5 w-16" />
      <Skeleton className="mt-2 h-3.5 w-[75%]" />
    </div>
  );
}
