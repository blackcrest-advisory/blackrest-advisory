//===== imports =====//
import { BellRing, Fingerprint, ShieldCheck, UserRoundCog } from "lucide-react";

//==============================================================//
// SKELETON
//==============================================================//

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

//==============================================================//
// ADMIN SETTINGS LOADING
//==============================================================//

export default function AdminSettingsLoading() {
  return (
    <div
      className="relative min-w-0 max-w-full space-y-6"
      aria-label="Loading admin settings"
    >
      {/*===== SETTINGS HEADER =====*/}

      <header
        className="relative min-w-0 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
      >
        {/* architectural rail */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 top-0 w-[3px] bg-gradient-to-b from-secondary/40 via-secondary/20 to-transparent"
        />

        {/* subtle ambient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-secondary/[0.04] blur-[100px]"
        />

        <div
          className="relative z-10 grid min-w-0 gap-7 px-6 py-7 sm:px-7 lg:px-9 lg:py-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-stretch"
        >
          {/*===== TITLE =====*/}

          <div className="min-w-0">
            <div
              className="flex flex-wrap items-center gap-3"
            >
              <UserRoundCog className="h-3.5 w-3.5 text-muted-foreground/20" />

              <Skeleton className="h-2.5 w-32" />

              <span className="h-px w-9 bg-border" />

              <Skeleton className="h-2.5 w-24" />
            </div>

            <Skeleton
              className="mt-6 h-10 w-56 sm:h-11"
            />

            <div className="mt-4 space-y-2.5">
              <Skeleton className="h-3.5 w-full max-w-2xl" />
              <Skeleton className="h-3.5 w-[70%] max-w-xl" />
            </div>

            <div
              className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3"
            >
              {Array.from({
                length: 3,
              }).map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Skeleton className="h-3.5 w-3.5 rounded-sm" />
                  <Skeleton className="h-2.5 w-16" />
                </div>
              ))}
            </div>
          </div>

          {/*===== SECURE ACCOUNT PANEL =====*/}

          <div
            className="min-w-0 border border-secondary/15 bg-secondary/[0.025] px-5 py-5"
          >
            <div className="flex items-start gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-background"
              >
                <ShieldCheck className="h-4 w-4 text-muted-foreground/15" />
              </div>

              <div className="min-w-0 flex-1">
                <Skeleton className="h-2.5 w-40" />
                <Skeleton className="mt-3 h-4 w-44" />

                <div className="mt-3 space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-[82%]" />
                </div>
              </div>
            </div>

            <div
              className="mt-5 grid grid-cols-3 divide-x divide-border border-t border-border pt-4"
            >
              {Array.from({
                length: 3,
              }).map((_, index) => (
                <div
                  key={index}
                  className="min-w-0 px-3 first:pl-0 last:pr-0"
                >
                  <Skeleton className="h-2 w-12" />
                  <Skeleton className="mt-2 h-3 w-14" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/*===== SETTINGS WORKSPACE =====*/}

      <div
        className="grid min-w-0 max-w-full gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.55fr)] xl:items-start"
      >
        {/*===== MAIN COLUMN =====*/}

        <div className="min-w-0 space-y-6">
          <ProfileSectionSkeleton />
          <NotificationsSectionSkeleton />
        </div>

        {/*===== SECURITY RAIL =====*/}

        <aside
          className="min-w-0 xl:sticky xl:top-4"
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
      className="relative min-w-0 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
    >
      {/* top signal */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-[2px] w-24 bg-secondary/25"
      />

      {/* header */}
      <SectionHeaderSkeleton />

      {/* identity */}
      <div
        className="border-b border-border bg-background/20 px-5 py-5 sm:px-6"
      >
        <div
          className="flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <Skeleton className="h-14 w-14 shrink-0 rounded-full" />

          <div className="min-w-0 flex-1">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="mt-2 h-3 w-44" />
            <Skeleton className="mt-3 h-6 w-24 rounded-md" />
          </div>

          <Skeleton className="h-9 w-32 rounded-md" />
        </div>
      </div>

      {/* fields */}
      <div
        className="grid gap-5 px-5 py-5 sm:grid-cols-2 sm:px-6"
      >
        {Array.from({
          length: 4,
        }).map((_, index) => (
          <FieldSkeleton key={index} helper={index === 1} />
        ))}
      </div>

      {/* footer */}
      <div
        className="flex flex-col gap-3 border-t border-border bg-muted/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
      >
        <div className="flex items-center gap-2">
          <Skeleton className="h-1.5 w-1.5 rounded-full" />
          <Skeleton className="h-2.5 w-28" />
        </div>

        <Skeleton className="h-10 w-32 rounded-md" />
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
      className="relative min-w-0 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
    >
      {/* top signal */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/25 via-secondary/10 to-transparent"
      />

      {/* header */}
      <div
        className="border-b border-border px-5 py-5"
      >
        <div className="flex items-start gap-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background"
          >
            <Fingerprint className="h-4 w-4 text-muted-foreground/15" />
          </div>

          <div className="min-w-0 flex-1">
            <Skeleton className="h-2.5 w-24" />
            <Skeleton className="mt-2 h-4 w-36" />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-[88%]" />
        </div>
      </div>

      {/* security state */}
      <div
        className="flex items-center gap-3 border-b border-border bg-success/[0.02] px-5 py-3"
      >
        <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground/15" />
        <Skeleton className="h-2.5 w-40" />
      </div>

      {/* password fields */}
      <div className="space-y-4 px-5 py-5">
        {Array.from({
          length: 3,
        }).map((_, index) => (
          <FieldSkeleton key={index} />
        ))}

        <div
          className="border-l-2 border-border bg-background/30 px-3 py-3"
        >
          <Skeleton className="h-3 w-full" />
          <Skeleton className="mt-2 h-3 w-[70%]" />
        </div>
      </div>

      {/* footer */}
      <div
        className="border-t border-border bg-muted/10 px-5 py-4"
      >
        <Skeleton className="h-10 w-full rounded-md" />
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
      className="relative min-w-0 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
    >
      {/* top signal */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-[2px] w-28 bg-secondary/25"
      />

      {/* header */}
      <div
        className="flex items-start gap-3 border-b border-border px-5 py-4 sm:px-6"
      >
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background"
        >
          <BellRing className="h-4 w-4 text-muted-foreground/15" />
        </div>

        <div className="min-w-0 flex-1">
          <Skeleton className="h-2.5 w-20" />
          <Skeleton className="mt-2 h-4 w-36" />
          <Skeleton className="mt-2 h-3 w-[70%]" />
        </div>
      </div>

      {/* alert rows */}
      <div className="divide-y divide-border">
        {Array.from({
          length: 5,
        }).map((_, index) => (
          <div
            key={index}
            className="grid min-w-0 gap-4 px-5 py-4 sm:grid-cols-[44px_minmax(0,1fr)_auto] sm:items-center sm:px-6"
          >
            <Skeleton className="h-9 w-9 rounded-md" />

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Skeleton className="h-2.5 w-5" />
                <Skeleton
                  className={`
                    h-3.5
                    ${index % 2 === 0 ? "w-28" : "w-36"}
                  `}
                />
              </div>

              <div className="mt-2 space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-[76%]" />
              </div>
            </div>

            <Skeleton className="h-6 w-11 rounded-full" />
          </div>
        ))}
      </div>

      {/* footer */}
      <div
        className="flex flex-col gap-3 border-t border-border bg-muted/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
      >
        <div className="flex items-center gap-2">
          <Skeleton className="h-1.5 w-1.5 rounded-full" />
          <Skeleton className="h-2.5 w-36" />
        </div>

        <Skeleton className="h-10 w-36 rounded-md" />
      </div>
    </section>
  );
}

//==============================================================//
// SECTION HEADER SKELETON
//==============================================================//

function SectionHeaderSkeleton() {
  return (
    <div
      className="flex items-start gap-3 border-b border-border px-5 py-4 sm:px-6"
    >
      <Skeleton className="h-9 w-9 shrink-0 rounded-md" />

      <div className="min-w-0 flex-1">
        <Skeleton className="h-2.5 w-24" />
        <Skeleton className="mt-2 h-4 w-40" />
        <Skeleton className="mt-2 h-3 w-[72%]" />
      </div>
    </div>
  );
}

//==============================================================//
// FIELD SKELETON
//==============================================================//

function FieldSkeleton({ helper = false }: { helper?: boolean }) {
  return (
    <div className="min-w-0">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="mt-2 h-10 w-full rounded-md" />

      {helper && <Skeleton className="mt-2 h-2.5 w-[82%]" />}
    </div>
  );
}
