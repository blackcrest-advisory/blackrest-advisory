"use client";

import { motion } from "framer-motion";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ProjectRequestsHeader } from "./ProjectRequestsHeader";
import { ProjectRequestsTable } from "./ProjectRequestsTable";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";
import { useEffect, useState } from "react";
import type { AdminProjectRequest } from "@/types/dashboard/admin/projectRequestsType";
import { fetchAdminProjectRequests } from "@/api-client/admin/projectRequests.api";

export const AdminProjectRequestsDashboard = () => {
  const [requests, setRequests] = useState<AdminProjectRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const data = await fetchAdminProjectRequests();
        setRequests(data);
      } catch {
        // no-op
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <PageWrapper>
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <ProjectRequestsHeader count={requests.length} loading={loading} />
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mt-6"
          >
            <ProjectRequestsTable requests={requests} loading={loading} />
          </motion.div>
        </Container>
      </Section>
    </PageWrapper>
  );
};
