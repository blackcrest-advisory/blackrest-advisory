"use client";

//===== imports =====//
import {
  ArrowUpRight,
  Clock3,
  Pause,
  Play,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/Button";

import type { AdminService } from "@/types/dashboard/admin/servicesType";

import { ServiceStatusBadge } from "./ServiceStatusBadge";

//==============================================================//
// SERVICES GRID
//==============================================================//

export function ServicesGrid({
  services,
  onToggleStatus,
}: {
  services: AdminService[];
  onToggleStatus: (id: string) => void;
}) {
  //===== empty state =====//
  if (!services.length) {
    return (
      <div
        className="
          flex
          min-h-[360px]
          items-center
          justify-center
          px-6 py-14
          text-center
        "
      >
        <div className="max-w-sm">
          <div
            className="
              mx-auto
              flex h-11 w-11
              items-center
              justify-center
              rounded-md
              border border-border
              bg-muted/20
              font-mono
              text-[9px]
              font-semibold
              text-muted-foreground/40
            "
          >
            00
          </div>

          <span
            className="
              mt-4
              block
              font-mono
              text-[7px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-secondary
            "
          >
            Capability register
          </span>

          <p
            className="
              mt-1.5
              text-sm
              font-semibold
              text-heading
            "
          >
            No services found
          </p>

          <p
            className="
              mt-1
              text-xs
              leading-5
              text-muted-foreground
            "
          >
            Try a different search or status filter.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      {services.map((service, index) => (
        <article
          key={service.id}
          className="
              group
              relative
              transition-colors
              duration-200
              hover:bg-secondary/[0.018]
            "
        >
          <div
            className="
                grid
                gap-5
                px-5 py-6
                sm:px-6
                lg:grid-cols-[64px_minmax(0,1fr)_220px]
                lg:gap-6
                lg:py-7
              "
          >
            {/* ================================================= */}
            {/* INDEX                                             */}
            {/* ================================================= */}

            <div className="hidden lg:block">
              <span
                className="
                    font-mono
                    text-[10px]
                    font-semibold
                    tracking-[0.12em]
                    text-secondary/45
                  "
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div
                className="
                    mt-3
                    h-px w-8
                    bg-secondary/20
                    transition-all
                    duration-300
                    group-hover:w-11
                    group-hover:bg-secondary/45
                  "
              />
            </div>

            {/* ================================================= */}
            {/* SERVICE CONTENT                                   */}
            {/* ================================================= */}

            <div className="min-w-0">
              <div
                className="
                    flex
                    flex-col
                    gap-3
                    sm:flex-row
                    sm:items-start
                    sm:justify-between
                  "
              >
                <div className="min-w-0">
                  {/* labels */}
                  <div
                    className="
                        flex
                        flex-wrap
                        items-center
                        gap-2
                      "
                  >
                    <span
                      className="
                          inline-flex
                          items-center
                          border-l-2
                          border-secondary
                          bg-secondary/[0.055]
                          px-2.5 py-1
                          font-mono
                          text-[7px]
                          font-semibold
                          uppercase
                          tracking-[0.12em]
                          text-secondary
                        "
                    >
                      {service.pillar.replaceAll("_", " ")}
                    </span>

                    <ServiceStatusBadge status={service.status} />
                  </div>

                  {/* title */}
                  <h2
                    className="
                        mt-3
                        text-lg
                        font-semibold
                        tracking-[-0.025em]
                        text-heading
                        sm:text-xl
                      "
                  >
                    {service.name}
                  </h2>
                </div>

                {/* mobile toggle */}
                <div className="sm:hidden">
                  <ToggleButton
                    service={service}
                    onToggleStatus={onToggleStatus}
                  />
                </div>
              </div>

              {/* description */}
              <p
                className="
                    mt-3
                    max-w-3xl
                    text-sm
                    leading-6
                    text-body
                  "
              >
                {service.description}
              </p>

              {/* service metrics */}
              <div
                className="
                    mt-5
                    grid
                    gap-px
                    overflow-hidden
                    border border-border
                    bg-border
                    sm:grid-cols-2
                  "
              >
                <Metric
                  icon={Clock3}
                  label="Delivery"
                  value={service.deliveryTime}
                />

                <Metric
                  icon={ArrowUpRight}
                  label="Starting price"
                  value={service.startingPrice}
                />
              </div>
            </div>

            {/* ================================================= */}
            {/* SERVICE COMMAND                                   */}
            {/* ================================================= */}

            <div
              className="
                  border-t border-border
                  pt-4
                  lg:border-l
                  lg:border-t-0
                  lg:pl-6
                  lg:pt-0
                "
            >
              <span
                className="
                    font-mono
                    text-[7px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-muted-foreground/40
                  "
              >
                Service command
              </span>

              <div
                className="
                    mt-3
                    hidden
                    sm:block
                  "
              >
                <ToggleButton
                  service={service}
                  onToggleStatus={onToggleStatus}
                />
              </div>

              <div
                className="
                    mt-4
                    border-t border-border
                    pt-4
                  "
              >
                <Button
                  href={`/services/${service.slug}`}
                  variant="outline"
                  size="sm"
                  className="
                      w-full
                      !rounded-md
                      justify-between
                    "
                >
                  View public page
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </div>

              <div
                className="
                    mt-4
                    flex
                    items-center
                    gap-2
                  "
              >
                <span
                  className={`
                      h-1.5 w-1.5
                      rounded-full

                      ${
                        service.status === "active"
                          ? "bg-success"
                          : "bg-warning"
                      }
                    `}
                />

                <span
                  className="
                      font-mono
                      text-[7px]
                      uppercase
                      tracking-[0.12em]
                      text-muted-foreground/40
                    "
                >
                  {service.status === "active"
                    ? "Public availability"
                    : "Service paused"}
                </span>
              </div>
            </div>
          </div>
        </article>
      ))}

      {/* ====================================================== */}
      {/* REGISTER FOOTER                                       */}
      {/* ====================================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
          bg-muted/10
          px-5 py-3
          sm:px-6
        "
      >
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />

          <span
            className="
              font-mono
              text-[7px]
              uppercase
              tracking-[0.14em]
              text-muted-foreground/40
            "
          >
            Capability records indexed
          </span>
        </div>

        <span
          className="
            text-xs
            text-muted-foreground
          "
        >
          <span
            className="
              font-semibold
              text-heading
            "
          >
            {services.length}
          </span>{" "}
          {services.length === 1 ? "service" : "services"}
        </span>
      </div>
    </div>
  );
}

//==============================================================//
// SERVICE TOGGLE
//==============================================================//

function ToggleButton({
  service,
  onToggleStatus,
}: {
  service: AdminService;
  onToggleStatus: (id: string) => void;
}) {
  const isActive = service.status === "active";

  return (
    <button
      type="button"
      onClick={() => onToggleStatus(service.id)}
      aria-label={`${isActive ? "Pause" : "Activate"} ${service.name}`}
      className={`
        inline-flex
        h-9
        w-full
        items-center
        justify-between
        gap-3
        rounded-md
        border
        px-3
        text-xs
        font-medium
        transition-colors

        ${
          isActive
            ? `
                border-warning/20
                bg-warning/[0.035]
                text-heading
                hover:bg-warning/[0.065]
              `
            : `
                border-success/20
                bg-success/[0.035]
                text-heading
                hover:bg-success/[0.065]
              `
        }
      `}
    >
      <span>{isActive ? "Pause service" : "Activate service"}</span>

      {isActive ? (
        <Pause className="h-3.5 w-3.5 text-warning" />
      ) : (
        <Play className="h-3.5 w-3.5 text-success" />
      )}
    </button>
  );
}

//==============================================================//
// SERVICE METRIC
//==============================================================//

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        min-w-0
        bg-background/45
        px-3 py-3
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
        "
      >
        <Icon className="h-3.5 w-3.5 shrink-0 text-secondary" />

        <span
          className="
            font-mono
            text-[7px]
            font-semibold
            uppercase
            tracking-[0.12em]
            text-muted-foreground/40
          "
        >
          {label}
        </span>
      </div>

      <p
        className="
          mt-1.5
          truncate
          text-xs
          font-semibold
          text-heading
        "
        title={value}
      >
        {value}
      </p>
    </div>
  );
}
