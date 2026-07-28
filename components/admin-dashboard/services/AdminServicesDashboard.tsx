"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { adminServicesMock } from "@/mock-data/adminServicesMockData";
import { fadeInUp, staggerContainer } from "@/utils/animations";
import { ServicesFilters } from "./ServicesFilters";
import { ServicesGrid } from "./ServicesGrid";
import { ServicesHeader } from "./ServicesHeader";
import { ServicesStats } from "./ServicesStats";
import type { ServiceStatus } from "@/types/dashboard/admin/servicesType";

export const AdminServicesDashboard = () => {
  //===== State =====//
  // TODO: Replace local dummy state with the admin service catalog API.
  const [services, setServices] = useState(adminServicesMock);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ServiceStatus | "all">("all");

  //===== Filter services =====//
  const filteredServices = useMemo(
    () =>
      services.filter(
        (service) =>
          service.name.toLowerCase().includes(search.toLowerCase()) &&
          (status === "all" || service.status === status),
      ),
    [search, services, status],
  );

  //===== Toggle service status =====//
  const toggleStatus = (id: string) =>
    setServices((current) =>
      current.map((service) =>
        service.id === id
          ? {
              ...service,
              status: service.status === "active" ? "paused" : "active",
            }
          : service,
      ),
    );

  return (
    //===== Admin Services Dashboard =====//
    <PageWrapper>
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <div className="flex flex-col gap-6">
            {/*===== Header =====*/}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible">
              <ServicesHeader />
            </motion.div>

            {/*===== Stats =====*/}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <ServicesStats services={services} />
            </motion.div>

            {/*===== Filters =====*/}
            <ServicesFilters
              search={search}
              status={status}
              onSearchChange={setSearch}
              onStatusChange={setStatus}
            />

            {/*===== Grid =====*/}
            <ServicesGrid
              services={filteredServices}
              onToggleStatus={toggleStatus}
            />
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
};
