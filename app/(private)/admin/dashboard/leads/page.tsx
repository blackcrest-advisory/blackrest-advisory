"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import axios from "@/api-client/client";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LeadStats } from "@/components/admin-dashboard/leads/LeadStats";
import { LeadFilters } from "@/components/admin-dashboard/leads/LeadFilters";
import { LeadTable } from "@/components/admin-dashboard/leads/LeadTable";
import { LeadDetailModal } from "@/components/admin-dashboard/leads/LeadDetailModal";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";
import type { Lead, LeadService } from "@/types/dashboard/admin/leadTypes";
import toast from "react-hot-toast";

//===== Filter state type =====//
interface LeadFiltersState {
  status: string;
  service: string;
  priority: string;
  assigned: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<LeadFiltersState>({
    status: "all",
    service: "all",
    priority: "all",
    assigned: "all",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");
  const [isModalOpen, setIsModalOpen] = useState(false);

  //===== Fetch leads =====//
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get<Lead[]>("/api/admin/leads");
        setLeads(response.data);
      } catch {
        toast.error("Failed to load leads");
      } finally {
        setLoading(false);
      }
    };

    void fetchLeads();
  }, []);

  //===== Apply filters and search =====//
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const match =
          lead.companyName.toLowerCase().includes(term) ||
          lead.contactPerson.toLowerCase().includes(term);
        if (!match) return false;
      }
      if (filters.status !== "all" && lead.status !== filters.status)
        return false;
      if (
        filters.service !== "all" &&
        !lead.services.includes(filters.service as LeadService)
      )
        return false;
      if (filters.priority !== "all" && lead.priority !== filters.priority)
        return false;
      if (filters.assigned !== "all" && lead.assignedTo !== filters.assigned)
        return false;
      return true;
    });
  }, [leads, searchTerm, filters]);

  //===== Handlers =====//
  const handleFilterChange = (newFilters: LeadFiltersState) => {
    setFilters(newFilters);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const openModal = (lead: Lead, mode: "view" | "edit") => {
    setSelectedLead(lead);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  const handleSaveLead = async (updatedLead: Lead) => {
    setLeads((previous) =>
      previous.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead)),
    );

    try {
      await axios.patch(`/api/admin/leads/${updatedLead.id}`, {
        ...updatedLead,
        name: updatedLead.contactPerson,
      });
      toast.success("Lead updated successfully");
    } catch {
      toast.error("Failed to update lead");
    }
  };

  const handleConvert = async (lead: Lead) => {
    const updated = { ...lead, status: "won" as const };
    setLeads((previous) =>
      previous.map((item) => (item.id === updated.id ? updated : item)),
    );

    try {
      await axios.patch(`/api/admin/leads/${lead.id}`, { status: "won" });
      toast.success(`${lead.companyName} converted to client!`);
    } catch {
      toast.error("Failed to convert lead");
    }
  };

  const handleDelete = async (lead: Lead) => {
    if (window.confirm(`Delete lead "${lead.companyName}"?`)) {
      setLeads((previous) => previous.filter((item) => item.id !== lead.id));

      try {
        await axios.delete(`/api/admin/leads/${lead.id}`);
        toast.success("Lead deleted");
      } catch {
        toast.error("Failed to delete lead");
      }
    }
  };

  //===== Loading state =====//
  if (loading) {
    return (
      <PageWrapper>
        <Section className="py-2 md:py-2 lg:py-2">
          <Container>
            <div className="py-12 text-center text-muted-foreground">
              Loading leads...
            </div>
          </Container>
        </Section>
      </PageWrapper>
    );
  }

  return (
    //===== Leads Page =====//
    <PageWrapper>
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <div className="space-y-6">
            {/*===== Header =====*/}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <h1 className="text-2xl font-bold text-foreground">Leads</h1>
              <Button variant="primary" size="sm">
                + Add Lead
              </Button>
            </motion.div>

            {/*===== Stats =====*/}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <LeadStats leads={leads} />
            </motion.div>

            {/*===== Filters =====*/}
            <LeadFilters
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
            />

            {/*===== Table =====*/}
            <LeadTable
              leads={filteredLeads}
              onView={(lead) => openModal(lead, "view")}
              onEdit={(lead) => openModal(lead, "edit")}
              onConvert={handleConvert}
              onDelete={handleDelete}
            />

            {/*===== Modal =====*/}
            {selectedLead && (
              <LeadDetailModal
                lead={selectedLead}
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={handleSaveLead}
                mode={modalMode}
              />
            )}
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
