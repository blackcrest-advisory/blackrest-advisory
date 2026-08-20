//===== imports =====//
import type { LucideIcon } from "lucide-react";

//===== props =====//
interface FileStatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subLabel?: string;
  progressPercent?: number;
}

//==============================================================//
// FILE STAT CARD
//==============================================================//

export const FileStatCard = ({
  icon: Icon,
  label,
  value,
  subLabel,
  progressPercent,
}: FileStatCardProps) => {
  const safeProgress =
    typeof progressPercent === "number"
      ? Math.min(Math.max(progressPercent, 0), 100)
      : null;

  return (
    <div
      className="group relative h-full min-w-0 px-5 py-5 transition-colors hover:bg-secondary/[0.018] sm:px-6"
    >
      {/* ====================================================== */}
      {/* METRIC                                                */}
      {/* ====================================================== */}

      <div
        className="flex items-start justify-between gap-4"
      >
        <div className="min-w-0">
          <p
            className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/45"
          >
            {label}
          </p>

          <p
            className="mt-2 truncate text-2xl font-semibold tracking-[-0.04em] text-heading"
            title={value}
          >
            {value}
          </p>

          {subLabel && (
            <p
              className="mt-1.5 text-[11px] leading-4 text-body"
            >
              {subLabel}
            </p>
          )}
        </div>

        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-secondary/15 bg-secondary/[0.045] text-secondary transition-colors group-hover:border-secondary/25 group-hover:bg-secondary/[0.07]"
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>

      {/* ====================================================== */}
      {/* STORAGE PROGRESS                                     */}
      {/* ====================================================== */}

      {safeProgress !== null && (
        <div className="mt-5">
          <div
            className="mb-2 flex items-center justify-between gap-3"
          >
            <span
              className="font-mono text-[7px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/35"
            >
              Capacity
            </span>

            <span
              className="font-mono text-[8px] font-semibold text-secondary"
            >
              {Math.round(safeProgress)}%
            </span>
          </div>

          <div
            className="relative h-1 w-full overflow-hidden bg-muted"
          >
            <div
              className="h-full bg-secondary transition-[width] duration-500"
              style={{
                width: `${safeProgress}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* ====================================================== */}
      {/* DECORATIVE DETAIL                                    */}
      {/* ====================================================== */}

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-5 h-px w-0 bg-secondary/40 transition-all duration-300 group-hover:w-10 sm:left-6"
      />
    </div>
  );
};
