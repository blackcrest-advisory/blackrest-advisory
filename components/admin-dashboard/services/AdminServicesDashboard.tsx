"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Container } from "@/components/ui/Container";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
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

export function AdminServicesDashboard({
  initialServices,
}: {
  initialServices: AdminService[];
}) {
  const [services, setServices] = useState(initialServices);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ServiceStatus | "all">("all");

  const filteredServices = useMemo(
    () =>
      services.filter(
        (service) =>
          service.name.toLowerCase().includes(search.toLowerCase()) &&
          (status === "all" || service.status === status),
      ),
    [search, services, status],
  );

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
    <PageWrapper>
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <div className="flex flex-col gap-6">
            <motion.div variants={fadeInUp} initial="hidden" animate="visible">
              <ServicesHeader />
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <ServicesStats services={services} />
            </motion.div>
            <ServicesFilters
              search={search}
              status={status}
              onSearchChange={setSearch}
              onStatusChange={setStatus}
            />
            <ServicesGrid
              services={filteredServices}
              onToggleStatus={toggleStatus}
            />
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
