"use client";

//===== imports =====//
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import toast from "react-hot-toast";
import { BriefcaseBusiness, Layers3, ShieldCheck } from "lucide-react";

import { toggleAdminServiceStatus } from "@/lib/actions/services/service.action";

import { fadeInUp, staggerContainer } from "@/lib/utils/animations";

import type {
  AdminService,
  ServiceStatus,
} from "@/types/dashboard/admin/servicesType";

import { ServicesFilters } from "./ServicesFilters";
import { ServicesGrid } from "./ServicesGrid";
import { ServicesHeader } from "./ServicesHeader";
import { ServicesStats } from "./ServicesStats";

//==============================================================//
// ADMIN SERVICES DASHBOARD
//==============================================================//

export function AdminServicesDashboard({
  initialServices,
}: {
  initialServices: AdminService[];
}) {
  //===== state =====//
  const [services, setServices] = useState(initialServices);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<ServiceStatus | "all">("all");

  const shouldReduceMotion = useReducedMotion();

  //===== filtered services =====//
  const filteredServices = useMemo(
    () =>
      services.filter(
        (service) =>
          service.name.toLowerCase().includes(search.toLowerCase()) &&
          (status === "all" || service.status === status),
      ),
    [search, services, status],
  );

  //===== portfolio counts =====//
  const activeServices = services.filter(
    (service) => service.status === "active",
  ).length;

  const pausedServices = services.filter(
    (service) => service.status === "paused",
  ).length;

  //===== toggle status =====//
  const toggleStatus = async (id: string) => {
    try {
      const updatedService = await toggleAdminServiceStatus(id);

      setServices((current) =>
        current.map((service) =>
          service.id === id ? updatedService : service,
        ),
      );

      toast.success(`${updatedService.name} is now ${updatedService.status}.`);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to update service status",
      );
    }
  };

  return (
    <div className="relative space-y-6">
      {/*===== CAPABILITY HEADER =====*/}

      <motion.header
        variants={shouldReduceMotion ? undefined : fadeInUp}
        initial={shouldReduceMotion ? undefined : "hidden"}
        animate={shouldReduceMotion ? undefined : "visible"}
        className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
      >
        {/* architectural rail */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 top-0 w-[3px] bg-gradient-to-b from-secondary via-secondary/55 to-secondary/10"
        />

        {/* grid field */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px)] [background-size:72px_100%] [mask-image:linear-gradient(to_right,transparent_25%,black)]"
        />

        {/* ambient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-secondary/[0.055] blur-[110px]"
        />

        <div className="relative z-10 grid gap-7 px-6 py-7 sm:px-7 lg:px-9 lg:py-8 xl:grid-cols-[minmax(0,1fr)_310px]">
          {/*===== TITLE AREA =====*/}

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <BriefcaseBusiness className="h-3.5 w-3.5 text-secondary" />

              <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
                Capability atlas
              </span>

              <span className="h-px w-9 bg-secondary/30" />

              <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground/40">
                Advisory portfolio
              </span>
            </div>

            <div className="mt-5">
              <ServicesHeader />
            </div>
          </div>

          {/*===== PORTFOLIO INDEX =====*/}

          <div className="border-t border-border pt-5 xl:border-l xl:border-t-0 xl:pl-7 xl:pt-0">
            <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/40">
              Portfolio index
            </span>

            <div className="mt-5 flex items-end gap-3">
              <Layers3 className="mb-1 h-5 w-5 text-secondary" />

              <span className="text-4xl font-semibold tracking-[-0.06em] text-heading">
                {services.length}
              </span>

              <span className="pb-1 text-xs text-muted-foreground">
                capabilities
              </span>
            </div>

            {/* state distribution */}
            <div className="mt-6 grid grid-cols-2 divide-x divide-border border-y border-border">
              <div className="py-3 pr-4">
                <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/40">
                  Active
                </span>

                <p className="mt-1 text-lg font-semibold text-heading">
                  {activeServices}
                </p>
              </div>

              <div className="py-3 pl-4">
                <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/40">
                  Paused
                </span>

                <p className="mt-1 text-lg font-semibold text-heading">
                  {pausedServices}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-success" />

              <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/40">
                Portfolio registry online
              </span>
            </div>
          </div>
        </div>
      </motion.header>

      {/*===== WORKSPACE =====*/}

      <div className="grid gap-5 xl:grid-cols-[290px_minmax(0,1fr)] xl:items-start">
        {/*===== LEFT CONTROL RAIL =====*/}

        <aside className="space-y-4 xl:sticky xl:top-4">
          {/* stats */}
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial={shouldReduceMotion ? undefined : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
          >
            <ServicesStats services={services} />
          </motion.div>

          {/* filters */}
          <ServicesFilters
            search={search}
            status={status}
            onSearchChange={setSearch}
            onStatusChange={setStatus}
          />

          {/* registry state */}
          <div className="border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="px-4 py-4">
              <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
                Registry state
              </span>

              <div className="mt-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />

                  <span className="text-xs text-muted-foreground">
                    Services available
                  </span>
                </div>

                <span className="text-sm font-semibold text-heading">
                  {filteredServices.length}
                </span>
              </div>
            </div>

            {(search || status !== "all") && (
              <div className="border-t border-border bg-secondary/[0.035] px-4 py-2.5">
                <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.13em] text-secondary">
                  Filters active
                </span>
              </div>
            )}
          </div>
        </aside>

        {/*===== CAPABILITY REGISTER =====*/}

        <motion.main
          variants={shouldReduceMotion ? undefined : fadeInUp}
          initial={shouldReduceMotion ? undefined : "hidden"}
          animate={shouldReduceMotion ? undefined : "visible"}
          className="min-w-0"
        >
          <div className="border border-border bg-card shadow-[var(--shadow-card)]">
            {/* directory heading */}
            <div className="flex flex-col gap-4 border-b border-border px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6">
              <div>
                <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.17em] text-secondary">
                  Capability register
                </span>

                <h2 className="mt-1.5 text-lg font-semibold tracking-[-0.025em] text-heading">
                  Advisory Services
                </h2>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Review positioning, delivery structure, pricing and public
                  availability.
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="font-mono text-[7px] uppercase tracking-[0.13em] text-muted-foreground/40">
                  Visible records
                </span>

                <p className="mt-1 text-xl font-semibold text-heading">
                  {filteredServices.length}
                </p>
              </div>
            </div>

            <ServicesGrid
              services={filteredServices}
              onToggleStatus={toggleStatus}
            />
          </div>
        </motion.main>
      </div>
    </div>
  );
}
