"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { LeadStats } from "@/components/admin-dashboard/leads/LeadStats";
import { LeadFilters } from "@/components/admin-dashboard/leads/LeadFilters";
import { LeadTable } from "@/components/admin-dashboard/leads/LeadTable";
import { LeadDetailModal } from "@/components/admin-dashboard/leads/LeadDetailModal";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";
import { convertAdminLead, deleteAdminLead, updateAdminLead } from "@/lib/actions/leads/admin-lead.action";
import type { Lead, LeadService } from "@/types/dashboard/admin/leadTypes";

interface LeadFiltersState { status: string; service: string; priority: string; assigned: string; }

export function LeadsClient({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [filters, setFilters] = useState<LeadFiltersState>({ status: "all", service: "all", priority: "all", assigned: "all" });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredLeads = useMemo(() => leads.filter((lead) => {
    const term = searchTerm.toLowerCase();
    if (term && !lead.companyName.toLowerCase().includes(term) && !lead.contactPerson.toLowerCase().includes(term)) return false;
    if (filters.status !== "all" && lead.status !== filters.status) return false;
    if (filters.service !== "all" && !lead.services.includes(filters.service as LeadService)) return false;
    if (filters.priority !== "all" && lead.priority !== filters.priority) return false;
    return filters.assigned === "all" || lead.assignedTo === filters.assigned;
  }), [leads, searchTerm, filters]);

  const closeModal = () => { setIsModalOpen(false); setSelectedLead(null); };
  const openModal = (lead: Lead, mode: "view" | "edit") => { setSelectedLead(lead); setModalMode(mode); setIsModalOpen(true); };

  const handleSaveLead = async (updatedLead: Lead) => {
    try {
      const savedLead = await updateAdminLead(updatedLead.id, updatedLead);
      setLeads((previous) => previous.map((lead) => lead.id === savedLead.id ? savedLead : lead));
      setSelectedLead(savedLead);
      toast.success("Lead updated successfully");
    } catch { toast.error("Failed to update lead"); }
  };

  const handleConvert = async (lead: Lead) => {
    try {
      const convertedLead = await convertAdminLead(lead.id);
      setLeads((previous) => previous.map((item) => item.id === convertedLead.id ? convertedLead : item));
      toast.success(`${lead.companyName} converted to client!`);
    } catch (error) { toast.error(error instanceof Error ? error.message : "Failed to convert lead"); }
  };

  const handleDelete = async (lead: Lead) => {
    if (!window.confirm(`Delete lead "${lead.companyName}"?`)) return;
    try {
      await deleteAdminLead(lead.id);
      setLeads((previous) => previous.filter((item) => item.id !== lead.id));
      toast.success("Lead deleted");
    } catch { toast.error("Failed to delete lead"); }
  };

  return <div className="space-y-6">
    <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl font-bold text-foreground">Leads</h1>
      <Button variant="primary" size="sm">+ Add Lead</Button>
    </motion.div>
    <motion.div variants={staggerContainer} initial="hidden" animate="visible"><LeadStats leads={leads} /></motion.div>
    <LeadFilters onFilterChange={setFilters} onSearch={setSearchTerm} />
    <LeadTable leads={filteredLeads} onView={(lead) => openModal(lead, "view")} onEdit={(lead) => openModal(lead, "edit")} onConvert={handleConvert} onDelete={handleDelete} />
    {selectedLead && <LeadDetailModal lead={selectedLead} isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveLead} mode={modalMode} />}
  </div>;
}
