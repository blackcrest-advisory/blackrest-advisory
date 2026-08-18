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

export default function ClientProjectDetailLoading() {
  return (
    <div className="relative space-y-6">
      {/* ====================================================== */}
      {/* BACK NAVIGATION SKELETON                               */}
      {/* ====================================================== */}

      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-3 w-20" />
      </div>

      {/* ====================================================== */}
      {/* PROJECT HERO SKELETON                                  */}
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
        {/* ambient glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -right-32 -top-36
            h-[360px] w-[360px]
            rounded-full
            bg-secondary/[0.08]
            blur-[110px]
          "
        />

        {/* secondary glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -bottom-40 left-[20%]
            h-[280px] w-[280px]
            rounded-full
            bg-primary/[0.04]
            blur-[100px]
          "
        />

        {/* architectural grid */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0
            hidden opacity-[0.05]
            lg:block
          "
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                var(--color-border) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                var(--color-border) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "110px 110px",
            maskImage:
              "linear-gradient(to right, transparent, black 35%, black)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 35%, black)",
          }}
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
            gap-8
            px-5 py-7
            sm:px-6
            lg:grid-cols-[minmax(0,1fr)_320px]
            lg:items-stretch
            lg:px-8
            lg:py-8
            xl:grid-cols-[minmax(0,1fr)_360px]
          "
        >
          {/* ================================================== */}
          {/* LEFT                                               */}
          {/* ================================================== */}

          <div className="flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3.5 w-3.5 rounded-full" />
                  <Skeleton className="h-2.5 w-28" />
                </div>

                <span className="h-px w-8 bg-border" />

                <Skeleton className="h-2.5 w-20" />
              </div>

              <div
                className="
                  mt-5
                  flex flex-col
                  gap-3
                  sm:flex-row
                  sm:items-center
                "
              >
                <Skeleton
                  className="
                    h-9 w-[75%]
                    max-w-md
                    sm:h-10
                  "
                />

                <Skeleton className="h-6 w-20" />
              </div>

              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-full max-w-2xl" />
                <Skeleton className="h-4 w-[82%] max-w-xl" />
              </div>

              {/* project meta */}
              <div
                className="
                  mt-6
                  grid
                  gap-3
                  sm:grid-cols-2
                  xl:grid-cols-3
                "
              >
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="
                      flex items-center
                      gap-3
                      border-t border-border
                      pt-3
                    "
                  >
                    <Skeleton className="h-3.5 w-3.5 shrink-0" />

                    <div className="min-w-0 flex-1">
                      <Skeleton className="h-2 w-12" />
                      <Skeleton className="mt-2 h-3 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <Skeleton className="h-3.5 w-3.5" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>

          {/* ================================================== */}
          {/* DELIVERY PROGRESS SKELETON                         */}
          {/* ================================================== */}

          <div
            className="
              relative
              overflow-hidden
              border border-secondary/15
              bg-secondary/[0.025]
              p-5
              sm:p-6
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute -right-16 -top-20
                h-40 w-40
                rounded-full
                bg-secondary/[0.08]
                blur-3xl
              "
            />

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3.5 w-3.5" />
                    <Skeleton className="h-2.5 w-28" />
                  </div>

                  <Skeleton className="mt-3 h-3 w-40" />
                </div>

                <Skeleton className="h-2.5 w-10" />
              </div>

              <div className="mt-7">
                <div className="flex items-end justify-between gap-4">
                  <Skeleton className="h-12 w-24" />

                  <div className="text-right">
                    <Skeleton className="ml-auto h-2 w-16" />
                    <Skeleton className="ml-auto mt-2 h-4 w-10" />
                  </div>
                </div>

                <Skeleton className="mt-5 h-2 w-full" />

                <div
                  className="
                    mt-5
                    grid
                    grid-cols-2
                    gap-3
                    border-t border-border
                    pt-4
                  "
                >
                  <div>
                    <Skeleton className="h-2 w-14" />
                    <Skeleton className="mt-2 h-3 w-20" />
                  </div>

                  <div>
                    <Skeleton className="h-2 w-14" />
                    <Skeleton className="mt-2 h-3 w-16" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* PROJECT INFORMATION SKELETON                           */}
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

          <Skeleton className="mt-3 h-5 w-44" />
        </div>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
          "
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className={`
                flex items-start
                gap-4
                px-5 py-5
                sm:px-6

                ${index > 0 ? "border-t border-border sm:border-t-0" : ""}
                ${index % 2 !== 0 ? "sm:border-l" : ""}
                ${index > 1 ? "sm:border-t" : ""}
                ${index % 3 !== 0 ? "xl:border-l" : ""}
                ${index > 2 ? "xl:border-t" : ""}
              `}
            >
              <Skeleton className="h-9 w-9 shrink-0" />

              <div className="flex-1">
                <Skeleton className="h-2 w-16" />
                <Skeleton className="mt-2 h-4 w-24" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================== */}
      {/* CONTENT GRID                                           */}
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
        {/* LEFT COLUMN                                          */}
        {/* ==================================================== */}

        <div className="space-y-6">
          {/* Milestones */}
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
                flex flex-col
                gap-3
                border-b border-border
                px-5 py-5
                sm:flex-row
                sm:items-center
                sm:justify-between
                sm:px-6
              "
            >
              <div>
                <Skeleton className="h-2.5 w-28" />
                <Skeleton className="mt-3 h-5 w-28" />
              </div>

              <div
                className="
                  flex items-center
                  gap-2
                  border border-border
                  bg-background/60
                  px-3 py-2
                "
              >
                <Skeleton className="h-2 w-16" />
                <span className="h-3 w-px bg-border" />
                <Skeleton className="h-3 w-8" />
              </div>
            </div>

            <div className="px-5 py-5 sm:px-6">
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="
                      flex items-start
                      gap-3
                      border border-border
                      p-4
                    "
                  >
                    <Skeleton className="h-5 w-5 shrink-0" />

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <Skeleton className="h-4 w-36" />
                          <Skeleton className="mt-2 h-3 w-[75%]" />
                        </div>

                        <Skeleton className="h-5 w-20" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="
                flex items-center
                justify-between
                border-t border-border
                bg-muted/15
                px-5 py-3.5
                sm:px-6
              "
            >
              <Skeleton className="h-2.5 w-36" />
              <Skeleton className="h-3 w-20" />
            </div>
          </section>

          {/* Invoices */}
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
                flex items-center
                justify-between
                gap-4
                border-b border-border
                px-5 py-5
                sm:px-6
              "
            >
              <div>
                <Skeleton className="h-2.5 w-28" />
                <Skeleton className="mt-3 h-5 w-24" />
              </div>

              <div
                className="
                  flex items-center
                  gap-2
                  border border-border
                  bg-background/60
                  px-3 py-2
                "
              >
                <Skeleton className="h-3.5 w-3.5" />
                <Skeleton className="h-3 w-4" />
              </div>
            </div>

            <div className="px-5 py-5 sm:px-6">
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="
                      flex
                      flex-col
                      gap-3
                      border border-border
                      p-4
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >
                    <div>
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="mt-2 h-3 w-36" />
                    </div>

                    <div className="flex items-center gap-3">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* ==================================================== */}
        {/* RIGHT SIDEBAR                                        */}
        {/* ==================================================== */}

        <aside className="space-y-6">
          {/* Files */}
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
                flex items-center
                justify-between
                gap-4
                border-b border-border
                px-5 py-5
                sm:px-6
              "
            >
              <div>
                <Skeleton className="h-2.5 w-24" />
                <Skeleton className="mt-3 h-5 w-16" />
              </div>

              <Skeleton className="h-9 w-9" />
            </div>

            <div className="px-5 py-5 sm:px-6">
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="
                      flex items-center
                      gap-3
                      border border-border
                      p-3
                    "
                  >
                    <Skeleton className="h-8 w-8 shrink-0" />

                    <div className="flex-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="mt-2 h-3 w-20" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="
                flex items-center
                justify-between
                border-t border-border
                bg-muted/15
                px-5 py-3.5
                sm:px-6
              "
            >
              <Skeleton className="h-2.5 w-20" />
              <Skeleton className="h-3 w-4" />
            </div>
          </section>

          {/* Original Brief */}
          <section
            className="
              relative
              overflow-hidden
              border border-secondary/20
              bg-secondary/[0.025]
              shadow-[var(--shadow-card)]
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute -right-16 -top-20
                h-40 w-40
                rounded-full
                bg-secondary/[0.07]
                blur-3xl
              "
            />

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

            <div className="relative z-10 px-5 py-5 sm:px-6">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3.5 w-3.5" />
                <Skeleton className="h-2.5 w-28" />
              </div>

              <Skeleton className="mt-4 h-5 w-28" />

              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[70%]" />
              </div>

              <div
                className="
                  mt-4
                  flex items-center
                  justify-between
                  border-t border-border
                  pt-4
                "
              >
                <Skeleton className="h-2 w-16" />
                <Skeleton className="h-3 w-24" />
              </div>

              <Skeleton className="mt-5 h-9 w-full" />
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
