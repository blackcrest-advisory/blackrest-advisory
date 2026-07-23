"use client";

import { useState, useMemo } from "react";
import { leadsMockData } from "@/mock-data/leadsMockData";
import { Lead } from "@/types/dashboard/admin/leadTypes";
import { LeadStats } from "@/components/admin-dashboard/leads/LeadStats";
import { LeadFilters } from "@/components/admin-dashboard/leads/LeadFilters";
import { LeadTable } from "@/components/admin-dashboard/leads/LeadTable";
import { LeadDetailModal } from "@/components/admin-dashboard/leads/LeadDetailModal";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(leadsMockData);
  const [filters, setFilters] = useState({
    status: "all",
    service: "all",
    priority: "all",
    assigned: "all",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");
  const [isModalOpen, setIsModalOpen] = useState(false);

  //===== Filter and search =====//
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Search
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const match =
          lead.companyName.toLowerCase().includes(term) ||
          lead.contactPerson.toLowerCase().includes(term);
        if (!match) return false;
      }
      // Status
      if (filters.status !== "all" && lead.status !== filters.status)
        return false;
      // Service
      if (
        filters.service !== "all" &&
        !lead.services.includes(filters.service as any)
      )
        return false;
      // Priority
      if (filters.priority !== "all" && lead.priority !== filters.priority)
        return false;
      // Assigned
      if (filters.assigned !== "all" && lead.assignedTo !== filters.assigned)
        return false;
      return true;
    });
  }, [leads, searchTerm, filters]);

  //===== Handlers =====//
  const handleFilterChange = (newFilters: any) => {
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

  const handleSaveLead = (updatedLead: Lead) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === updatedLead.id ? updatedLead : l)),
    );
    toast.success("Lead updated successfully");
  };

  const handleConvert = (lead: Lead) => {
    // Change status to 'won' and update
    const updated = { ...lead, status: "won" as const };
    setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    toast.success(`${lead.companyName} converted to client!`);
  };

  const handleDelete = (lead: Lead) => {
    if (window.confirm(`Delete lead "${lead.companyName}"?`)) {
      setLeads((prev) => prev.filter((l) => l.id !== lead.id));
      toast.success("Lead deleted");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-heading">Leads</h1>
        <Button variant="primary" size="sm">
          + Add Lead
        </Button>
      </div>

      <LeadStats leads={leads} />

      <LeadFilters
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
      />

      <LeadTable
        leads={filteredLeads}
        onView={(lead) => openModal(lead, "view")}
        onEdit={(lead) => openModal(lead, "edit")}
        onConvert={handleConvert}
        onDelete={handleDelete}
      />

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
  );
}
