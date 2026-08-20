"use client";

//===== imports =====//
import { AlertCircle, CheckCircle, Clock3, FolderKanban } from "lucide-react";

//===== types =====//
interface ProjectStatsProps {
  total: number;
  active: number;
  completed: number;
  onHold: number;
}

export function ProjectStats({
  total,
  active,
  completed,
  onHold,
}: ProjectStatsProps) {
  //===== stats =====//
  const stats = [
    {
      label: "Total Projects",
      value: total,
      eyebrow: "Portfolio",
      icon: FolderKanban,
      tone: "secondary",
    },
    {
      label: "Active",
      value: active,
      eyebrow: "In delivery",
      icon: Clock3,
      tone: "info",
    },
    {
      label: "Completed",
      value: completed,
      eyebrow: "Delivered",
      icon: CheckCircle,
      tone: "success",
    },
    {
      label: "On Hold",
      value: onHold,
      eyebrow: "Attention",
      icon: AlertCircle,
      tone: "warning",
    },
  ] as const;

  return (
    <section
      className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
    >
      {/* subtle top signal */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/70 via-secondary/15 to-transparent"
      />

      <div
        className="grid sm:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map(({ label, value, eyebrow, icon: Icon, tone }) => (
          <div
            key={label}
            className="group relative min-w-0 border-b border-border px-5 py-5 transition-colors duration-200 hover:bg-secondary/[0.02] sm:nth-[2n+1]:border-r xl:border-b-0 xl:border-r xl:last:border-r-0"
          >
            {/* index */}
            <span
              aria-hidden="true"
              className="absolute right-4 top-3 font-mono text-[24px] font-semibold leading-none text-muted-foreground/[0.06]"
            >
              {String(
                stats.findIndex((item) => item.label === label) + 1,
              ).padStart(2, "0")}
            </span>

            <div className="flex items-start justify-between gap-4">
              <div>
                <span
                  className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/40"
                >
                  {eyebrow}
                </span>

                <p
                  className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-heading"
                >
                  {value}
                </p>

                <p
                  className="mt-1 text-xs text-muted-foreground"
                >
                  {label}
                </p>
              </div>

              <div
                className={`
                    flex h-9 w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-md
                    border

                    ${
                      tone === "secondary"
                        ? "border-secondary/20 bg-secondary/[0.06] text-secondary"
                        : ""
                    }

                    ${
                      tone === "info"
                        ? "border-info/20 bg-info/[0.06] text-info"
                        : ""
                    }

                    ${
                      tone === "success"
                        ? "border-success/20 bg-success/[0.06] text-success"
                        : ""
                    }

                    ${
                      tone === "warning"
                        ? "border-warning/20 bg-warning/[0.06] text-warning"
                        : ""
                    }
                  `}
              >
                <Icon className="h-4 w-4" />
              </div>
            </div>

            <div
              className="mt-5 h-px overflow-hidden bg-border"
            >
              <div
                className={`
                    h-full
                    transition-[width]
                    duration-500

                    ${tone === "secondary" ? "w-3/4 bg-secondary" : ""}

                    ${tone === "info" ? "w-2/3 bg-info" : ""}

                    ${tone === "success" ? "w-1/2 bg-success" : ""}

                    ${tone === "warning" ? "w-1/3 bg-warning" : ""}
                  `}
              />
            </div>
          </div>
        ))}
      </div>

      {/* footer */}
      <div
        className="flex items-center gap-2 border-t border-border bg-muted/10 px-5 py-3"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-success" />

        <span
          className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40"
        >
          Delivery portfolio metrics
        </span>
      </div>
    </section>
  );
}
