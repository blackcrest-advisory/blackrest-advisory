//==============================================================//
// SKELETON PRIMITIVES
//==============================================================//

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`
        animate-pulse
        bg-muted/60
        ${className}
      `}
    />
  );
}

function SkeletonLine({ width = "w-full" }: { width?: string }) {
  return (
    <Skeleton
      className={`
        h-3
        ${width}
      `}
    />
  );
}

function SkeletonInput() {
  return (
    <Skeleton
      className="
        h-10
        w-full
        rounded-md
      "
    />
  );
}

//==============================================================//
// CLIENT SETTINGS LOADING
//==============================================================//

export default function Loading() {
  return (
    <div
      className="
        relative
        min-w-0
        max-w-full
        space-y-6
      "
      aria-label="Loading client settings"
    >
      {/* ====================================================== */}
      {/* SETTINGS HEADER                                       */}
      {/* ====================================================== */}

      <header
        className="
          relative
          min-w-0
          overflow-hidden
          border border-border
          bg-card
          shadow-[var(--shadow-card)]
        "
      >
        {/* ambient backdrop */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            right-0 top-0
            h-full w-[42%]
            opacity-[0.14]
            [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px)]
            [background-size:56px_100%]
            [mask-image:linear-gradient(to_left,black,transparent)]
          "
        />

        {/* main title */}
        <div
          className="
            relative z-10
            px-6 py-7
            sm:px-7
            lg:px-9
            lg:py-9
          "
        >
          <div className="max-w-3xl">
            <div
              className="
                flex
                flex-wrap
                items-center
                gap-3
              "
            >
              <Skeleton className="h-7 w-7 rounded-md" />
              <Skeleton className="h-2.5 w-28" />
              <Skeleton className="h-px w-10" />
              <Skeleton className="h-2.5 w-24" />
            </div>

            <Skeleton
              className="
                mt-6
                h-11
                w-72
                max-w-full
                sm:h-12
              "
            />

            <div className="mt-4 space-y-2">
              <SkeletonLine width="w-full max-w-2xl" />
              <SkeletonLine width="w-[72%] max-w-xl" />
            </div>
          </div>
        </div>

        {/* account areas */}
        <div
          className="
            relative z-10
            grid
            border-t border-border
            bg-background/20
            sm:grid-cols-3
          "
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="
                flex
                items-start
                gap-3
                border-b border-border
                px-6 py-4
                sm:border-b-0
                sm:border-r
                sm:last:border-r-0
                lg:px-9
              "
            >
              <Skeleton className="h-8 w-8 shrink-0 rounded-md" />

              <div className="min-w-0 flex-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="mt-2 h-2.5 w-28 max-w-full" />
              </div>
            </div>
          ))}
        </div>

        {/* status footer */}
        <div
          className="
            relative z-10
            flex
            flex-col
            gap-2
            border-t border-border
            bg-muted/10
            px-6 py-3
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-7
            lg:px-9
          "
        >
          <div className="flex items-center gap-2">
            <Skeleton className="h-1.5 w-1.5 rounded-full" />
            <Skeleton className="h-2.5 w-28" />
          </div>

          <Skeleton className="h-2.5 w-24" />
        </div>
      </header>

      {/* ====================================================== */}
      {/* SETTINGS WORKSPACE                                    */}
      {/* ====================================================== */}

      <div
        className="
          grid
          min-w-0
          max-w-full
          gap-6
          xl:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.6fr)]
          xl:items-start
        "
      >
        {/* ==================================================== */}
        {/* MAIN COLUMN                                         */}
        {/* ==================================================== */}

        <div className="min-w-0 space-y-6">
          <ProfileSectionSkeleton />
          <NotificationsSectionSkeleton />
        </div>

        {/* ==================================================== */}
        {/* SECURITY RAIL                                       */}
        {/* ==================================================== */}

        <aside
          className="
            min-w-0
            xl:sticky
            xl:top-4
          "
        >
          <SecuritySectionSkeleton />
        </aside>
      </div>
    </div>
  );
}

//==============================================================//
// PROFILE SECTION SKELETON
//==============================================================//

function ProfileSectionSkeleton() {
  return (
    <section
      className="
        relative
        min-w-0
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
          h-[2px] w-28
          bg-secondary/25
        "
      />

      {/* header */}
      <div
        className="
          flex
          items-start
          gap-3
          border-b border-border
          px-5 py-4
          sm:px-6
        "
      >
        <Skeleton className="h-9 w-9 shrink-0 rounded-md" />

        <div className="min-w-0 flex-1">
          <Skeleton className="h-2.5 w-24" />
          <Skeleton className="mt-2 h-4 w-36" />
          <Skeleton className="mt-2 h-3 w-48 max-w-full" />
        </div>
      </div>

      {/* identity */}
      <div
        className="
          border-b border-border
          bg-background/20
          px-5 py-5
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
          "
        >
          <Skeleton className="h-14 w-14 shrink-0 rounded-full" />

          <div className="min-w-0 flex-1">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="mt-2 h-3 w-44 max-w-full" />
            <Skeleton className="mt-3 h-6 w-28 rounded-md" />
          </div>

          <Skeleton className="h-9 w-32 rounded-md" />
        </div>
      </div>

      {/* fields */}
      <div
        className="
          grid
          min-w-0
          gap-5
          px-5 py-5
          sm:grid-cols-2
          sm:px-6
        "
      >
        <FieldSkeleton />
        <FieldSkeleton />
        <FieldSkeleton />
        <FieldSkeleton />

        <div className="sm:col-span-2">
          <FieldSkeleton />
        </div>
      </div>

      {/* footer */}
      <div
        className="
          flex
          flex-col
          gap-3
          border-t border-border
          bg-muted/10
          px-5 py-4
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-6
        "
      >
        <div className="flex items-center gap-2">
          <Skeleton className="h-1.5 w-1.5 rounded-full" />
          <Skeleton className="h-2.5 w-24" />
        </div>

        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    </section>
  );
}

//==============================================================//
// NOTIFICATIONS SECTION SKELETON
//==============================================================//

function NotificationsSectionSkeleton() {
  return (
    <section
      className="
        relative
        min-w-0
        overflow-hidden
        border border-border
        bg-card
        shadow-[var(--shadow-card)]
      "
    >
      {/* header */}
      <div
        className="
          grid
          gap-5
          border-b border-border
          px-5 py-5
          sm:px-6
          lg:grid-cols-[minmax(0,1fr)_220px]
          lg:items-end
        "
      >
        <div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-3.5 w-3.5 rounded-sm" />
            <Skeleton className="h-2.5 w-36" />
          </div>

          <Skeleton className="mt-3 h-5 w-56 max-w-full" />

          <div className="mt-3 space-y-2">
            <SkeletonLine width="w-full max-w-xl" />
            <SkeletonLine width="w-[74%]" />
          </div>
        </div>

        <div
          className="
            border-t border-border
            pt-4
            lg:border-l
            lg:border-t-0
            lg:pl-5
            lg:pt-0
          "
        >
          <Skeleton className="h-2.5 w-24" />
          <Skeleton className="mt-2 h-7 w-12" />
        </div>
      </div>

      {/* preferences */}
      <div
        className="
          grid
          min-w-0
          md:grid-cols-2
        "
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`
              relative
              min-w-0
              border-b border-border
              px-5 py-5
              sm:px-6
              ${index % 2 === 0 ? "md:border-r" : ""}
            `}
          >
            <div className="flex items-start gap-3">
              <Skeleton className="h-9 w-9 shrink-0 rounded-md" />

              <div className="min-w-0 flex-1">
                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-4
                  "
                >
                  <div className="min-w-0 flex-1">
                    <Skeleton className="h-2.5 w-20" />
                    <Skeleton className="mt-2 h-4 w-32" />
                  </div>

                  <Skeleton className="h-6 w-11 shrink-0 rounded-full" />
                </div>

                <div className="mt-3 space-y-2">
                  <SkeletonLine />
                  <SkeletonLine width="w-[72%]" />
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <Skeleton className="h-1.5 w-1.5 rounded-full" />
                  <Skeleton className="h-2.5 w-14" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* footer */}
      <div
        className="
          flex
          flex-col
          gap-3
          border-t border-border
          bg-muted/10
          px-5 py-4
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-6
        "
      >
        <div className="min-w-0">
          <Skeleton className="h-3 w-48 max-w-full" />
          <Skeleton className="mt-2 h-2.5 w-64 max-w-full" />
        </div>

        <Skeleton className="h-10 w-40 rounded-md" />
      </div>
    </section>
  );
}

//==============================================================//
// SECURITY SECTION SKELETON
//==============================================================//

function SecuritySectionSkeleton() {
  return (
    <section
      className="
        relative
        min-w-0
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
          h-[2px] w-full
          bg-gradient-to-r
          from-secondary/25
          via-secondary/10
          to-transparent
        "
      />

      {/* header */}
      <div
        className="
          border-b border-border
          px-5 py-5
        "
      >
        <div className="flex items-start gap-3">
          <Skeleton className="h-10 w-10 shrink-0 rounded-md" />

          <div className="min-w-0 flex-1">
            <Skeleton className="h-2.5 w-20" />
            <Skeleton className="mt-2 h-4 w-20" />
            <Skeleton className="mt-2 h-3 w-44 max-w-full" />
          </div>
        </div>
      </div>

      {/* status */}
      <div
        className="
          border-b border-border
          bg-background/20
          px-5 py-4
        "
      >
        <div className="flex items-start gap-3">
          <Skeleton className="h-8 w-8 shrink-0 rounded-md" />

          <div className="min-w-0 flex-1">
            <Skeleton className="h-3 w-28" />

            <div className="mt-2 space-y-2">
              <SkeletonLine />
              <SkeletonLine width="w-[78%]" />
            </div>
          </div>
        </div>
      </div>

      {/* fields */}
      <div className="space-y-5 px-5 py-5">
        <FieldSkeleton />
        <FieldSkeleton />
        <FieldSkeleton />

        <div
          className="
            border-l-2
            border-border
            bg-background/30
            px-3 py-3
          "
        >
          <Skeleton className="h-2.5 w-28" />
          <Skeleton className="mt-2 h-3 w-full" />
          <Skeleton className="mt-2 h-3 w-[72%]" />
        </div>
      </div>

      {/* footer */}
      <div
        className="
          border-t border-border
          bg-muted/10
          px-5 py-4
        "
      >
        <Skeleton className="h-10 w-full rounded-md" />

        <div
          className="
            mt-3
            flex
            items-center
            justify-center
            gap-2
          "
        >
          <Skeleton className="h-1.5 w-1.5 rounded-full" />
          <Skeleton className="h-2.5 w-28" />
        </div>
      </div>
    </section>
  );
}

//==============================================================//
// FIELD SKELETON
//==============================================================//

function FieldSkeleton() {
  return (
    <div className="min-w-0">
      <Skeleton className="h-3 w-24" />
      <SkeletonInput />
    </div>
  );
}
