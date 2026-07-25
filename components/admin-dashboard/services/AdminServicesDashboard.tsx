"use client";

import { useMemo, useState } from "react";
import { adminServicesMock } from "@/mock-data/adminServicesMockData";
import type { ServiceStatus } from "@/types/dashboard/admin/servicesType";
import { ServicesFilters } from "./ServicesFilters";
import { ServicesGrid } from "./ServicesGrid";
import { ServicesHeader } from "./ServicesHeader";
import { ServicesStats } from "./ServicesStats";

export const AdminServicesDashboard = () => {
  // TODO: Replace local dummy state with the admin service catalog API.
  const [services, setServices] = useState(adminServicesMock);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ServiceStatus | "all">("all");
  const filteredServices = useMemo(() => services.filter((service) => service.name.toLowerCase().includes(search.toLowerCase()) && (status === "all" || service.status === status)), [search, services, status]);

  const toggleStatus = (id: string) => setServices((current) => current.map((service) => service.id === id ? { ...service, status: service.status === "active" ? "paused" : "active" } : service));

  return <div className="flex flex-col gap-6"><ServicesHeader /><ServicesStats services={services} /><ServicesFilters search={search} status={status} onSearchChange={setSearch} onStatusChange={setStatus} /><ServicesGrid services={filteredServices} onToggleStatus={toggleStatus} /></div>;
};
