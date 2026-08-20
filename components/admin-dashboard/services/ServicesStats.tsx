//===== imports =====//
import { CheckCircle2, CirclePause, Layers3 } from "lucide-react";

import type { AdminService } from "@/types/dashboard/admin/servicesType";

//==============================================================//
// SERVICES STATS
//==============================================================//

export function ServicesStats({ services }: { services: AdminService[] }) {
  const activeServices = services.filter(
    (service) => service.status === "active",
  ).length;

  const stats = [
    {
      label: "Catalog services",
      value: services.length,
      note: "Blackcrest core offerings",
      icon: Layers3,
      tone: "default" as const,
    },
    {
      label: "Active",
      value: activeServices,
      note: "Enabled catalog services",
      icon: CheckCircle2,
      tone: "success" as const,
    },
    {
      label: "Paused",
      value: services.length - activeServices,
      note: "Disabled in the catalog",
      icon: CirclePause,
      tone: "warning" as const,
    },
  ];

  return (
    <div
      className="overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
    >
      {/* ====================================================== */}
      {/* HEADER                                                 */}
      {/* ====================================================== */}

      <div
        className="border-b border-border px-4 py-4"
      >
        <span
          className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary"
        >
          Portfolio measure
        </span>

        <p
          className="mt-1 text-xs leading-5 text-muted-foreground"
        >
          Current service catalog state.
        </p>
      </div>

      {/* ====================================================== */}
      {/* STATS                                                 */}
      {/* ====================================================== */}

      <div className="divide-y divide-border">
        {stats.map((stat) => {
          const Icon = stat.icon;

          const iconStyles = {
            default: "border-secondary/15 bg-secondary/[0.05] text-secondary",

            success: "border-success/20 bg-success/[0.05] text-success",

            warning: "border-warning/20 bg-warning/[0.05] text-warning",
          };

          return (
            <div
              key={stat.label}
              className="group flex items-start justify-between gap-4 px-4 py-4 transition-colors hover:bg-secondary/[0.018]"
            >
              <div className="min-w-0">
                <span
                  className="font-mono text-[7px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/40"
                >
                  {stat.label}
                </span>

                <p
                  className="mt-1.5 text-2xl font-semibold tracking-[-0.04em] text-heading"
                >
                  {stat.value}
                </p>

                <p
                  className="mt-1 text-[11px] leading-4 text-muted-foreground"
                >
                  {stat.note}
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
                  ${iconStyles[stat.tone]}
                `}
              >
                <Icon className="h-4 w-4" />
              </div>
            </div>
          );
        })}
      </div>

      {/* ====================================================== */}
      {/* FOOTER                                                */}
      {/* ====================================================== */}

      <div
        className="flex items-center justify-between gap-3 border-t border-border bg-muted/10 px-4 py-2.5"
      >
        <div className="flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 rounded-full bg-success"
          />

          <span
            className="font-mono text-[7px] uppercase tracking-[0.13em] text-muted-foreground/40"
          >
            Catalog indexed
          </span>
        </div>

        <span
          className="text-[11px] font-medium text-muted-foreground"
        >
          {services.length} total
        </span>
      </div>
    </div>
  );
}
