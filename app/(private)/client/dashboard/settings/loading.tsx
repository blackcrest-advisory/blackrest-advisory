function SkeletonLine({ width = "w-full" }: { width?: string }) {
  return (
    <div className={`h-4 rounded-full bg-muted/60 animate-pulse ${width}`} />
  );
}

function SkeletonAvatar() {
  return <div className="h-20 w-20 rounded-full bg-muted/60 animate-pulse" />;
}

function SkeletonInput() {
  return <div className="h-10 w-full rounded-lg bg-muted/60 animate-pulse" />;
}

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-8 w-48 rounded-full bg-muted/60 animate-pulse" />
        <SkeletonLine width="w-64" />
      </div>

      {/* Profile Section */}
      <div className="rounded-3xl border border-border bg-card p-6 space-y-6">
        <div className="flex items-center gap-4">
          <SkeletonAvatar />
          <div className="space-y-2 flex-1">
            <SkeletonLine width="w-32" />
            <SkeletonLine width="w-48" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <SkeletonInput />
          <SkeletonInput />
          <SkeletonInput />
          <SkeletonInput />
        </div>
      </div>

      {/* Security Section */}
      <div className="rounded-3xl border border-border bg-card p-6 space-y-4">
        <SkeletonLine width="w-40" />
        <div className="space-y-3">
          <div className="h-12 w-full rounded-lg bg-muted/60 animate-pulse" />
          <div className="h-12 w-full rounded-lg bg-muted/60 animate-pulse" />
        </div>
      </div>

      {/* Notifications Section */}
      <div className="rounded-3xl border border-border bg-card p-6 space-y-4">
        <SkeletonLine width="w-48" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <SkeletonLine width="w-40" />
              <div className="h-6 w-12 rounded-full bg-muted/60 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
