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
  return (
    <div className="relative space-y-6" aria-label="Loading lead details">
      {/* ====================================================== */}
      {/* BACK NAVIGATION                                        */}
      {/* ====================================================== */}

      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-3 w-16" />
      </div>

      {/* ====================================================== */}
      {/* LEAD HEADER                                            */}
      {/* ====================================================== */}

      <section
        className="
          relative
          overflow-hidden
          border border-border
          bg-card
          shadow-[var(--shadow-card)]
        "
      >
        {/* subtle glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -right-28 -top-32
            h-72 w-72
            rounded-full
            bg-secondary/[0.07]
            blur-[100px]
          "
        />

        {/* top signal */}
        <div
          className="
            absolute left-0 top-0
            h-[2px] w-full
            bg-gradient-to-r
            from-secondary/40
            via-secondary/20
            to-transparent
          "
        />

        <div
          className="
            relative z-10
            grid
            gap-7
            px-5 py-6
            sm:px-6
            lg:grid-cols-[minmax(0,1fr)_auto]
            lg:items-start
            lg:px-8
            lg:py-7
          "
        >
          {/* ================================================== */}
          {/* IDENTITY                                           */}
          {/* ================================================== */}

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <Skeleton className="h-3.5 w-3.5 rounded-full" />
              <Skeleton className="h-2.5 w-20" />

              <span className="h-px w-8 bg-border" />

              <Skeleton className="h-2.5 w-16" />
            </div>

            <div
              className="
                mt-4
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:flex-wrap
                sm:items-center
              "
            >
              <Skeleton
                className="
                  h-9
                  w-[70%]
                  max-w-sm
                  sm:h-10
                "
              />

              <div className="flex gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>

            <div
              className="
                mt-4
                flex
                flex-wrap
                gap-x-5
                gap-y-2
              "
            >
              <div className="flex items-center gap-2">
                <Skeleton className="h-3.5 w-3.5" />
                <Skeleton className="h-3 w-28" />
              </div>

              <div className="flex items-center gap-2">
                <Skeleton className="h-3.5 w-3.5" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          </div>

          {/* ================================================== */}
          {/* ACTIONS                                            */}
          {/* ================================================== */}

          <div
            className="
              flex
              flex-col
              gap-2
              border-t border-border
              pt-5

              sm:flex-row

              lg:border-l
              lg:border-t-0
              lg:pl-6
              lg:pt-0
            "
          >
            <Skeleton className="h-9 w-full sm:w-20" />

            <Skeleton className="h-9 w-full sm:w-36" />

            <Skeleton className="h-9 w-full sm:w-24" />
          </div>
        </div>

        {/* ==================================================== */}
        {/* SUMMARY STRIP                                        */}
        {/* ==================================================== */}

        <div
          className="
            relative z-10
            grid
            border-t border-border
            bg-muted/10
            sm:grid-cols-3
          "
        >
          <SummarySkeleton />

          <SummarySkeleton className="border-t border-border sm:border-l sm:border-t-0" />

          <SummarySkeleton className="border-t border-border sm:border-l sm:border-t-0" />
        </div>
      </section>

      {/* ====================================================== */}
      {/* DETAILS GRID                                           */}
      {/* ====================================================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-6
          xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.45fr)]
        "
      >
        {/* ==================================================== */}
        {/* MAIN COLUMN                                          */}
        {/* ==================================================== */}

        <div className="space-y-6">
          {/* ================================================== */}
          {/* PROJECT INQUIRY                                    */}
          {/* ================================================== */}

          <section
            className="
              relative
              overflow-hidden
              border border-border
              bg-card
              shadow-[var(--shadow-card)]
            "
          >
            <div
              className="
                absolute left-0 top-0
                h-[2px] w-full
                bg-gradient-to-r
                from-secondary/40
                via-secondary/20
                to-transparent
              "
            />

            <div
              className="
                border-b border-border
                px-5 py-5
                sm:px-6
              "
            >
              <div className="flex items-center gap-2">
                <Skeleton className="h-3.5 w-3.5" />
                <Skeleton className="h-2.5 w-24" />
              </div>

              <Skeleton className="mt-3 h-5 w-36" />
            </div>

            <div className="px-5 py-6 sm:px-6">
              <div className="space-y-2.5">
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-[96%]" />
                <Skeleton className="h-3.5 w-[90%]" />
                <Skeleton className="h-3.5 w-[84%]" />
                <Skeleton className="h-3.5 w-[62%]" />
              </div>
            </div>
          </section>

          {/* ================================================== */}
          {/* PROJECT INFORMATION                                */}
          {/* ================================================== */}

          <section
            className="
              relative
              overflow-hidden
              border border-border
              bg-card
              shadow-[var(--shadow-card)]
            "
          >
            <div
              className="
                absolute left-0 top-0
                h-[2px] w-full
                bg-gradient-to-r
                from-secondary/40
                via-secondary/20
                to-transparent
              "
            />

            <div
              className="
                border-b border-border
                px-5 py-5
                sm:px-6
              "
            >
              <div className="flex items-center gap-2">
                <Skeleton className="h-3.5 w-3.5" />
                <Skeleton className="h-2.5 w-28" />
              </div>

              <Skeleton className="mt-3 h-5 w-40" />
            </div>

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-3
              "
            >
              {/* Services */}
              <div
                className="
                  px-5 py-5
                  sm:px-6
                "
              >
                <Skeleton className="h-2 w-14" />

                <div className="mt-3 flex gap-1.5">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>

              {Array.from({ length: 5 }).map((_, index) => (
                <InfoSkeleton key={index} index={index + 1} />
              ))}
            </div>
          </section>
        </div>

        {/* ==================================================== */}
        {/* SIDEBAR                                              */}
        {/* ==================================================== */}

        <aside className="space-y-6">
          {/* ================================================== */}
          {/* CONTACT INFORMATION                                */}
          {/* ================================================== */}

          <section
            className="
              relative
              overflow-hidden
              border border-border
              bg-card
              shadow-[var(--shadow-card)]
            "
          >
            <div
              className="
                absolute left-0 top-0
                h-[2px] w-full
                bg-gradient-to-r
                from-secondary/40
                via-secondary/20
                to-transparent
              "
            />

            <div
              className="
                border-b border-border
                px-5 py-5
                sm:px-6
              "
            >
              <div className="flex items-center gap-2">
                <Skeleton className="h-3.5 w-3.5" />
                <Skeleton className="h-2.5 w-24" />
              </div>

              <Skeleton className="mt-3 h-5 w-40" />
            </div>

            <div className="divide-y divide-border">
              {Array.from({ length: 5 }).map((_, index) => (
                <ContactSkeleton key={index} />
              ))}
            </div>

            <div
              className="
                flex items-center
                gap-2
                border-t border-border
                bg-muted/15
                px-5 py-3.5
                sm:px-6
              "
            >
              <Skeleton className="h-1.5 w-1.5 rounded-full" />
              <Skeleton className="h-2 w-28" />
            </div>
          </section>

          {/* ================================================== */}
          {/* ATTACHMENT                                         */}
          {/* ================================================== */}

          <section
            className="
              relative
              overflow-hidden
              border border-border
              bg-card
              shadow-[var(--shadow-card)]
            "
          >
            <div
              className="
                absolute left-0 top-0
                h-[2px] w-full
                bg-gradient-to-r
                from-secondary/40
                via-secondary/20
                to-transparent
              "
            />

            <div className="px-5 py-5 sm:px-6">
              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-4
                "
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3.5 w-3.5" />
                    <Skeleton className="h-2.5 w-24" />
                  </div>

                  <Skeleton className="mt-3 h-5 w-24" />
                </div>

                <Skeleton className="h-9 w-9" />
              </div>

              <div
                className="
                  mt-5
                  flex
                  items-center
                  justify-between
                  border border-border
                  bg-background/50
                  px-4 py-3
                "
              >
                <Skeleton className="h-3.5 w-32" />
                <Skeleton className="h-4 w-4" />
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

//==============================================================//
// SUMMARY SKELETON
//==============================================================//

function SummarySkeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`
        px-5 py-3.5
        sm:px-6
        ${className}
      `}
    >
      <Skeleton className="h-2 w-20" />
      <Skeleton className="mt-2 h-6 w-24" />
    </div>
  );
}

//==============================================================//
// PROJECT INFO SKELETON
//==============================================================//

function InfoSkeleton({ index }: { index: number }) {
  return (
    <div
      className={`
        border-t border-border
        px-5 py-5
        sm:px-6
        sm:[&:nth-child(2n)]:border-l
        xl:border-t
        xl:[&:nth-child(3n+1)]:border-l-0
        xl:[&:not(:nth-child(3n+1))]:border-l
      `}
    >
      <div className="flex items-start gap-3">
        <Skeleton className="mt-0.5 h-4 w-4 shrink-0" />

        <div className="min-w-0 flex-1">
          <Skeleton
            className={`
              h-2
              ${index % 2 === 0 ? "w-16" : "w-20"}
            `}
          />

          <Skeleton
            className={`
              mt-2
              h-4
              ${index % 3 === 0 ? "w-[65%]" : "w-[80%]"}
            `}
          />
        </div>
      </div>
    </div>
  );
}

//==============================================================//
// CONTACT SKELETON
//==============================================================//

function ContactSkeleton() {
  return (
    <div
      className="
        flex
        items-start
        gap-3
        px-5 py-4
        sm:px-6
      "
    >
      <Skeleton className="mt-0.5 h-4 w-4 shrink-0" />

      <div className="min-w-0 flex-1">
        <Skeleton className="h-2 w-20" />
        <Skeleton className="mt-2 h-4 w-[72%]" />
      </div>
    </div>
  );
}
