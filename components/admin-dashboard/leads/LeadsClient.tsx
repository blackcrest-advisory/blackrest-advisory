"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import { LeadStats } from "@/components/admin-dashboard/leads/LeadStats";
import { LeadFilters } from "@/components/admin-dashboard/leads/LeadFilters";
import { LeadTable } from "@/components/admin-dashboard/leads/LeadTable";
import { Pagination } from "@/components/shared/Pagination";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";
import {
  convertAdminLead,
  deleteAdminLead,
} from "@/lib/actions/leads/admin-lead.action";
import type { Lead, LeadService } from "@/types/dashboard/admin/leadTypes";

interface LeadFiltersState {
  status: string;
  service: string;
  priority: string;
  assigned: string;
}

const LEADS_PER_PAGE = 10;

export function LeadsClient({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [filters, setFilters] = useState<LeadFiltersState>({
    status: "all",
    service: "all",
    priority: "all",
    assigned: "all",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const filteredLeads = useMemo(
    () =>
      leads.filter((lead) => {
        const term = searchTerm.toLowerCase();
        if (
          term &&
          !lead.companyName.toLowerCase().includes(term) &&
          !lead.contactPerson.toLowerCase().includes(term)
        )
          return false;
        if (filters.status !== "all" && lead.status !== filters.status)
          return false;
        if (
          filters.service !== "all" &&
          !lead.services.includes(filters.service as LeadService)
        )
          return false;
        if (filters.priority !== "all" && lead.priority !== filters.priority)
          return false;
        return (
          filters.assigned === "all" || lead.assignedTo === filters.assigned
        );
      }),
    [leads, searchTerm, filters],
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredLeads.length / LEADS_PER_PAGE),
  );
  const activePage = Math.min(currentPage, totalPages);
  const paginatedLeads = useMemo(() => {
    const startIndex = (activePage - 1) * LEADS_PER_PAGE;
    return filteredLeads.slice(startIndex, startIndex + LEADS_PER_PAGE);
  }, [activePage, filteredLeads]);

  const handleFilterChange = (newFilters: LeadFiltersState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleConvert = async (lead: Lead) => {
    try {
      const convertedLead = await convertAdminLead(lead.id);
      setLeads((previous) =>
        previous.map((item) =>
          item.id === convertedLead.id ? convertedLead : item,
        ),
      );
      toast.success(`${lead.companyName} converted to client!`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to convert lead",
      );
    }
  };

  const handleDelete = async () => {
    if (!leadToDelete) return;

    setIsDeleting(true);
    try {
      await deleteAdminLead(leadToDelete.id);
      setLeads((previous) =>
        previous.filter((item) => item.id !== leadToDelete.id),
      );
      setLeadToDelete(null);
      toast.success("Lead deleted");
    } catch {
      toast.error("Failed to delete lead");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <h1 className="text-2xl font-bold text-foreground">Leads</h1>
        <Button
          variant="primary"
          size="sm"
          onClick={() => router.push("/admin/dashboard/leads/new")}
        >
          + Add Lead
        </Button>
      </motion.div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <LeadStats leads={leads} />
      </motion.div>
      <LeadFilters
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
      />
      <LeadTable
        leads={paginatedLeads}
        onView={(lead) => router.push(`/admin/dashboard/leads/${lead.id}`)}
        onEdit={(lead) =>
          router.push(`/admin/dashboard/leads/${lead.id}?edit=true`)
        }
        onConvert={handleConvert}
        onDelete={setLeadToDelete}
      />
      <Pagination
        currentPage={activePage}
        totalItems={filteredLeads.length}
        pageSize={LEADS_PER_PAGE}
        itemLabel="leads"
        onPageChange={setCurrentPage}
      />
      <ConfirmationModal
        isOpen={Boolean(leadToDelete)}
        onClose={() => setLeadToDelete(null)}
        onConfirm={handleDelete}
        title="Delete Lead"
        description={`Are you sure you want to delete "${leadToDelete?.companyName || leadToDelete?.contactPerson || "this lead"}"? This action cannot be undone.`}
        confirmLabel="Delete"
        isPending={isDeleting}
      />
    </div>
  );
}
